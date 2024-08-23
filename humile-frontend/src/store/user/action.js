import axios from "axios";

import { baseURL, key } from "../../util/ServerPath";

import {
  GET_USER,
  BLOCK_UNBLOCK_USER,
  EDIT_USER_COIN,
  USER_RECHARGE_HISTORY,
  UPDATE_COIN_HISTORY,
  USER_CALL_HISTORY,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getUser =
  (startDate, endDate, search, start, limit) => (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: { key: key },
    };
    apiInstanceFetch.get(
      `/user/?sDate=${startDate}&eDate=${endDate}&search=${search}&start=${start}&limit=${limit}`)
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: { user: res.user, total: res.total },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const blockUnblockUser = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/user/block/${id}`)
    .then((res) => {
      dispatch({ type: BLOCK_UNBLOCK_USER, payload: res.user });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editCoin = (data, id) => (dispatch) => {
  axios
    .patch(`/user/${id}`, data)
    .then((res) => {
      dispatch({ type: EDIT_USER_COIN, payload: { data: res.data.user, id } });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const rechargeHistory = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/recharge/history?user_id=${id}`)
    .then((res) => {
      dispatch({ type: USER_RECHARGE_HISTORY, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

//when admin update coin then create recharge history
export const createUserHistory = (data) => (dispatch) => {
  axios
    .post(`/coin/purchase`, data)
    .then((res) => {
      dispatch({ type: UPDATE_COIN_HISTORY, payload: res.data.status });
    })
    .catch((error) => {
      console.log(error);
    });
};

//user call History
export const callHistory = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/coin/outgoing?user_id=${id}`)
    .then((res) => {
      dispatch({ type: USER_CALL_HISTORY, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};
