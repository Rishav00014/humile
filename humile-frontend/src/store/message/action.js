import axios from "axios";
import {
  CLOSE_DIALOG,
  DELETE_MESSAGE,
  GET_MESSAGE,
  INERT_MESSAGE,
  SET_CREATE_MESSAGE_DONE,
  SET_UPDATE_MESSAGE_DONE,
  UPDATE_MESSAGE,
} from "./type";
import { apiInstanceFetch } from "../../util/api";

//Get Message
export const getMessage = () => (dispatch) => {
  apiInstanceFetch
    .get(`/message`)
    .then((res) => {
      dispatch({ type: GET_MESSAGE, payload: res.message });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Insert Message
export const insertMessage = (content) => (dispatch) => {
  axios
    .post(`/message`, content)
    .then((res) => {
      dispatch({ type: INERT_MESSAGE, payload: res.data.message });
      dispatch({ type: SET_CREATE_MESSAGE_DONE });
      dispatch({ type: CLOSE_DIALOG });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Update Message
export const updateMessage = (content, id) => (dispatch) => {
  axios
    .patch(`message/${id}`, content)
    .then((res) => {
      dispatch({
        type: UPDATE_MESSAGE,
        payload: { data: res.data.message, id: id },
      });
      dispatch({ type: SET_UPDATE_MESSAGE_DONE });
      dispatch({ type: CLOSE_DIALOG });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Delete Message
export const deleteMessage = (id) => (dispatch) => {
  axios
    .delete(`message/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_MESSAGE, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};
