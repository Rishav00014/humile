import axios from "axios";

import {
  GET_COMPLAIN,
  OPEN_CLOSE_COMPLAIN,
  GET_SOLVED_COMPLAIN,
  GET_PENDING_DATE_LIST,
  GET_ACCEPTED_DATE_LIST,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getComplain = (start, end, type) => (dispatch) => {
  apiInstanceFetch
    .get(`/complaint/pending?start=${start}&end=${end}&type=${type}`)
    .then((res) => {
      dispatch({ type: GET_COMPLAIN, payload: res.complain });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getSolvedComplain = (start, end, type) => (dispatch) => {
  apiInstanceFetch
    .get(`/complaint/solved?start=${start}&end=${end}&type=${type}`)
    .then((res) => {
      dispatch({ type: GET_SOLVED_COMPLAIN, payload: res.complain });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const openCloseComplain = (data) => (dispatch) => {
  axios
    .patch(`/complaint/${data._id}`)
    .then((res) => {
      dispatch({ type: OPEN_CLOSE_COMPLAIN, payload: res.data.complaint });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPendingDateList = () => (dispatch) => {
  apiInstanceFetch
    .get("/complaint/pending/date")
    .then((res) => {
      dispatch({
        type: GET_PENDING_DATE_LIST,
        payload: res.date,
      });
    })
    .catch((error) => console.log(error));
};

export const getAcceptedDateList = () => (dispatch) => {
  apiInstanceFetch
    .get("/complaint/solved/date")
    .then((res) => {
      dispatch({
        type: GET_ACCEPTED_DATE_LIST,
        payload: res.date,
      });
    })
    .catch((error) => console.log(error));
};
