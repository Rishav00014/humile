import axios from "axios";

import {
  GET_ACCEPTED_REDEEM,
  GET_UNACCEPTED_REDEEM,
  ACCEPT_REDEEM_REQUEST,
  GET_ACCEPTED_DATE_LIST,
  GET_PENDING_DATE_LIST,
  DELETE_REDEEM_REQUEST,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getAcceptedRedeem = (start, end) => (dispatch) => {
  apiInstanceFetch
    .get(`/redeem/accept?start=${start}&end=${end}`)
    .then((res) => {
      dispatch({ type: GET_ACCEPTED_REDEEM, payload: res.redeem });
    })
    .catch((error) => console.log(error));
};

export const getUnacceptedRedeem = (start, end) => (dispatch) => {
  apiInstanceFetch
    .get(`/redeem?start=${start}&end=${end}`)
    .then((res) => {
      dispatch({ type: GET_UNACCEPTED_REDEEM, payload: res.redeem });
    })
    .catch((error) => console.log(error));
};

export const acceptRedeemRequest = (id) => (dispatch) => {
  axios
    .patch(`/redeem/${id}`)
    .then((res) => {
      dispatch({ type: ACCEPT_REDEEM_REQUEST, payload: res.data.redeem });
    })
    .catch((error) => console.log(error));
};

export const getPendingDateList = () => (dispatch) => {
  apiInstanceFetch
    .get("/redeem/pendingDate")
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
    .get("/redeem/acceptedDate")
    .then((res) => {
      dispatch({
        type: GET_ACCEPTED_DATE_LIST,
        payload: res.date,
      });
    })
    .catch((error) => console.log(error));
};

export const deleteRedeemRequest = (id) => (dispatch) => {
  axios
    .delete(`/redeem/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_REDEEM_REQUEST, payload: id });
    })
    .catch((error) => console.log(error));
};
