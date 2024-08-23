import { apiInstanceFetch } from "../../util/api";
import {
  GET_LANGUAGE,
  CREATE_NEW_LANGUAGE,
  EDIT_LANGUAGE,
  DELETE_LANGUAGE,
  CLOSE_LANGUAGE_DIALOG,
  SET_CREATE_LANGUAGE_DONE,
  SET_UPDATE_LANGUAGE_DONE,
  GET_TOTAL_RECORD,
} from "./types";

import axios from "axios";

export const getLanguage = (start, limit) => (dispatch) => {
  apiInstanceFetch
    .get(`/language?start=${start}&limit=${limit}`)
    .then((res) => {
      dispatch({ type: GET_LANGUAGE, payload: res.language });
      dispatch({ type: GET_TOTAL_RECORD, payload: res.total });
    })
    .catch((error) => console.log(error));
};

export const createNewLanguage = (formData) => (dispatch) => {
  axios
    .post("/language", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_LANGUAGE, payload: res.data.language });
      dispatch({ type: CLOSE_LANGUAGE_DIALOG });
      dispatch({ type: SET_CREATE_LANGUAGE_DONE });
    })
    .catch((error) => console.log(error));
};
export const editLanguage = (formData, id) => (dispatch) => {
  axios
    .patch("/language/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_LANGUAGE,
        payload: { data: res.data.language, id },
      });
      dispatch({ type: CLOSE_LANGUAGE_DIALOG });
      dispatch({ type: SET_UPDATE_LANGUAGE_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteLanguage = (id) => (dispatch) => {
  axios
    .delete(`/language/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_LANGUAGE, payload: id });
    })
    .catch((error) => console.log(error));
};
