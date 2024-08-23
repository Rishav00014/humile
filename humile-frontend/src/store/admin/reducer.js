import setToken from "../../util/SetToken";
import setDevKey from "../../util/SetDevKey";
import jwt_decode from "jwt-decode";
import { key } from "../../util/ServerPath";

import {
  SET_ADMIN,
  UNSET_ADMIN,
  SET_LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  UPDATE_PROFILE,
} from "./types";

const initialState = {
  isAuth: false,
  user: {},
  loginError: [],
};

const adminReducer = (state = initialState, action) => {
  let decoded;

  switch (action.type) {
    case SET_ADMIN:
      if (action.payload) {
        decoded = jwt_decode(action.payload);
      }
      setToken(action.payload);
      setDevKey(key);
      localStorage.setItem("token", action.payload);
      localStorage.setItem("key", key);
      return {
        ...state,
        isAuth: true,
        user: decoded,
      };
    case UNSET_ADMIN:
      localStorage.removeItem("token");
      localStorage.removeItem("key");
      setDevKey(null);
      setToken(null);
      return {
        ...state,
        isAuth: false,
        user: {},
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };

    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: [],
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          image: action.payload.image,
          flag: action.payload.flag,
        },
      };

    default:
      return state;
  }
};

export default adminReducer;
