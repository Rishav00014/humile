import {
  GET_SETTING,
  EDIT_SETTING,
  IS_UNDER_MAINTENANCE,
  IS_WHATSAPP_SUPPORT,
  IS_UPI_ACTIVE,
  IS_PAY_U_MONEY_ACTIVE,
  IS_GOOGLE_PAY_ACTIVE,
  IS_PROFILE_INTERSTITIAL_ACTIVE,
  IS_PROFILE_VIDEO_SHOW,
} from "./types";

import axios from "axios";
import { alert } from "../../util/alert";
import { apiInstanceFetch } from "../../util/api";

export const getSetting = () => (dispatch) => {
  apiInstanceFetch
    .get("/setting")
    .then((res) => {
      dispatch({ type: GET_SETTING, payload: res.setting });
    })
    .catch((error) => console.log(error));
};
export const editSetting = (formData, id) => (dispatch) => {
  axios
    .patch("/setting/" + id, formData)
    .then((res) => {
      dispatch({ type: EDIT_SETTING, payload: { data: res.data.setting, id } });
    })
    .catch((error) => console.log(error));
};

export const isUnderMaintenance = (id) => (dispatch) => {
  axios
    .patch(`/setting/maintenance/${id}`)
    .then((res) => {
      dispatch({
        type: IS_UNDER_MAINTENANCE,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};

export const isWhatsAppSupport = (id) => (dispatch) => {
  axios
    .patch(`/setting/whatsApp/${id}`)
    .then((res) => {
      dispatch({
        type: IS_WHATSAPP_SUPPORT,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};
export const isUpiActive = (id) => (dispatch) => {
  axios
    .patch(`/setting/upi/${id}`)
    .then((res) => {
      dispatch({
        type: IS_UPI_ACTIVE,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};

export const isPayUMoneyActive = (id) => (dispatch) => {
  axios
    .patch(`/setting/payUMoney/${id}`)
    .then((res) => {
      dispatch({
        type: IS_PAY_U_MONEY_ACTIVE,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};

export const isGooglePayActive = (id) => (dispatch) => {
  axios
    .patch(`/setting/googlePayId/${id}`)
    .then((res) => {
      dispatch({
        type: IS_GOOGLE_PAY_ACTIVE,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};

export const isProfileInterstitial = (id) => (dispatch) => {
  axios
    .patch(`/setting/profileInterstitial/${id}`)
    .then((res) => {
      dispatch({
        type: IS_PROFILE_INTERSTITIAL_ACTIVE,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};

export const profileVideoShow = (id) => (dispatch) => {
  axios
    .patch(`/setting/profileVideo/${id}`)
    .then((res) => {
      dispatch({
        type: IS_PROFILE_VIDEO_SHOW,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};
export const favorite = (id) => (dispatch) => {
  axios
    .patch(`/setting/favorite/${id}`)
    .then((res) => {
      dispatch({
        type: IS_PROFILE_VIDEO_SHOW,
        payload: res.data.setting,
      });
    })
    .catch((error) => console.log(error));
};
export const updateAdSetting = (data) => (dispatch) => {
  axios
    .post(`/setting/updateAd`, data)
    .then((res) => {
      if (res.data.status) {
        alert("Success", "Advertisement Setting updated Successfully!!", "success")
      }
    })
    .catch((error) => console.log(error));
};
