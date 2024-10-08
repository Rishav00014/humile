import { apiInstanceFetch } from "../../util/api";
import {
  GET_PLAN,
  CREATE_NEW_PLAN,
  EDIT_PLAN,
  DELETE_PLAN,
  CLOSE_PLAN_DIALOG,
  SET_CREATE_PLAN_DONE,
  SET_UPDATE_PLAN_DONE,
  GET_TOTAL_RECORD,
} from "./types";

import axios from "axios";

export const getPlan = (start, limit) => (dispatch) => {
  apiInstanceFetch
    .get(`/plan?start=${start}&${limit}`)
    .then((res) => {
      dispatch({ type: GET_PLAN, payload: res.plan });
      dispatch({ type: GET_TOTAL_RECORD, payload: res.total });
    })
    .catch((error) => console.log(error));
};

export const createNewPlan = (formData) => (dispatch) => {
  axios
    .post("/plan", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_PLAN, payload: res.data.plan });
      dispatch({ type: CLOSE_PLAN_DIALOG });
      dispatch({ type: SET_CREATE_PLAN_DONE });
    })
    .catch((error) => console.log(error));
};
export const editPlan = (formData, id) => (dispatch) => {
  axios
    .patch("/plan/" + id, formData)
    .then((res) => {
      dispatch({ type: EDIT_PLAN, payload: { data: res.data.plan, id } });
      dispatch({ type: CLOSE_PLAN_DIALOG });
      dispatch({ type: SET_UPDATE_PLAN_DONE });
    })
    .catch((error) => console.log(error));
};

export const deletePlan = (id) => (dispatch) => {
  axios
    .delete(`/plan/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_PLAN, payload: id });
    })
    .catch((error) => console.log(error));
};
