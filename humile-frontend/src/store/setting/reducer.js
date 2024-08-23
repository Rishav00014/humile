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

const initialState = {
  setting: {},
  updateDone: false,
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTING:
      return {
        ...state,
        setting: action.payload,
      };

    case EDIT_SETTING:
      return {
        ...state,
        setting: state.setting.map((setting) => {
          if (setting._id === action.payload.id) return action.payload.data;
          else return setting;
        }),
      };
    case IS_UNDER_MAINTENANCE:
      return {
        ...state,
        setting: {
          ...state.setting,
          isAppActive: action.payload.isAppActive,
        },
      };

    case IS_WHATSAPP_SUPPORT:
      return {
        ...state,
        setting: {
          ...state.setting,
          isWpSupport: action.payload.isWpSupport,
        },
      };
    case IS_UPI_ACTIVE:
      return {
        ...state,
        setting: {
          ...state.setting,
          isUpi: action.payload.isUpi,
        },
      };
    case IS_GOOGLE_PAY_ACTIVE:
      return {
        ...state,
        setting: {
          ...state.setting,
          isGooglePayId: action.payload.isGooglePayId,
        },
      };
    case IS_PAY_U_MONEY_ACTIVE:
      return {
        ...state,
        setting: {
          ...state.setting,
          isPayUMoneyActive: action.payload.isPayUMoneyActive,
        },
      };
    case IS_PROFILE_INTERSTITIAL_ACTIVE:
      return {
        ...state,
        setting: {
          ...state.setting,
          profileInterstitial: action.payload.profileInterstitial,
        },
      };
    case IS_PROFILE_VIDEO_SHOW:
      return {
        ...state,
        setting: {
          ...state.setting,
          profileVideoShow: action.payload.profileVideoShow,
          isFavorite: action.payload.isFavorite,
        },
      };
    default:
      return state;
  }
};

export default settingReducer;
