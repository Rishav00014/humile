import axios from "axios";

import {
  GET_HOST,
  ENABLE_DISABLE_HOST,
  CREATE_NEW_HOST,
  SET_CREATE_HOST_DONE,
  DELETE_HOST,
  EDIT_HOST,
  CLOSE_HOST_DIALOG,
  SET_UPDATE_HOST_DONE,
  GET_CURRENT_WEEK_ANALYTIC,
  GET_LAST_WEEK_ANALYTIC,
  HOST_RECENT_CALL_HISTORY,
  HOST_INCOMING_CALL_HISTORY,
  EDIT_HOST_COIN,
  // GET_TOTAL_RECORD,
  UPDATE_COIN_HISTORY,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getHost = () => (dispatch) => {
  apiInstanceFetch
    .get(`/host`)
    .then((res) => {
      dispatch({ type: GET_HOST, payload: res.host });
      // dispatch({ type: GET_TOTAL_RECORD, payload: res.data.total });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNewHost = (formData) => (dispatch) => {
  axios
    .post("/host", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_HOST, payload: res.data.host });
      dispatch({ type: SET_CREATE_HOST_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editHost = (formData, id) => (dispatch) => {
  axios
    .patch("/host/edit/" + id, formData)
    .then((res) => {
      console.log(res.data.host);
      dispatch({ type: EDIT_HOST, payload: { data: res.data.host, id } });
      dispatch({ type: CLOSE_HOST_DIALOG });
      dispatch({ type: SET_UPDATE_HOST_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteHost = (id) => (dispatch) => {
  axios
    .delete(`/host/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_HOST, payload: id });
    })
    .catch((error) => console.log(error));
};

export const enableDisableHost = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/host/enable_disable/${id}`)
    .then((res) => {
      dispatch({ type: ENABLE_DISABLE_HOST, payload: res.host });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const currentWeekAnalytic = (id, day) => (dispatch) => {
  apiInstanceFetch
    .get(`/host/analytic?week=this&host_id=${id}`)
    .then((res) => {
      dispatch({ type: GET_CURRENT_WEEK_ANALYTIC, payload: res.analytic });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const lastWeekAnalytic = (id, day) => (dispatch) => {
  apiInstanceFetch
    .get(`/host/analytic?week=last&host_id=${id}`)
    .then((res) => {
      dispatch({ type: GET_LAST_WEEK_ANALYTIC, payload: res.analytic });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const recentCallHistory = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/call/recent?host_id=${id}`)
    .then((res) => {
      dispatch({
        type: HOST_RECENT_CALL_HISTORY,
        payload: res.callHistory,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const incomeCallHistory = (id, day) => (dispatch) => {
  apiInstanceFetch
    .get(`/call/income?host_id=${id}&day=${day}`)
    .then((res) => {
      dispatch({
        type: HOST_INCOMING_CALL_HISTORY,
        payload: res.callHistory,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editCoin = (data, id) => (dispatch) => {
  axios
    .patch(`/host/${id}`, data)
    .then((res) => {
      dispatch({ type: EDIT_HOST_COIN, payload: { data: res.data.host, id } });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createHostHistory = (data) => (dispatch) => {
  axios
    .post(`/host/coin/admin`, data)
    .then((res) => {
      dispatch({ type: UPDATE_COIN_HISTORY, payload: res.data.status });
    })
    .catch((error) => {
      console.log(error);
    });
};
