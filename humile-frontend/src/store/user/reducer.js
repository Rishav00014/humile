import {
  GET_USER,
  BLOCK_UNBLOCK_USER,
  EDIT_USER_COIN,
  OPEN_USER_DIALOG,
  USER_RECHARGE_HISTORY,
  UPDATE_COIN_HISTORY,
  USER_CALL_HISTORY,
} from "./types";

const initialState = {
  user: [],
  dialog: false,
  dialogData: null,
  recharge: [],
  history: false,
  callHistory: [],
  userTotal: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        userTotal: action.payload.total,
      };
    case BLOCK_UNBLOCK_USER:
      return {
        ...state,
        user: state.user.map((user) => {
          if (user._id === action.payload._id)
            return { ...user, isBlock: action.payload.isBlock };
          else return user;
        }),
      };

    case EDIT_USER_COIN:
      return {
        ...state,
        user: state.user.map((user) => {
          if (user._id === action.payload.id) return action.payload.data;
          else return user;
        }),
      };

    case OPEN_USER_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case USER_RECHARGE_HISTORY:
      return {
        ...state,
        recharge: action.payload,
      };

    case UPDATE_COIN_HISTORY:
      return {
        ...state,
        history: true,
      };

    case USER_CALL_HISTORY:
      return {
        ...state,
        callHistory: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
