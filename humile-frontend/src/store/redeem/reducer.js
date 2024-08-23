import {
  GET_ACCEPTED_REDEEM,
  GET_UNACCEPTED_REDEEM,
  ACCEPT_REDEEM_REQUEST,
  GET_PENDING_DATE_LIST,
  GET_ACCEPTED_DATE_LIST,
  DELETE_REDEEM_REQUEST,
} from "./types";

const initialState = {
  acceptedRedeem: [],
  unAcceptedRedeem: [],
  pendingDate: [],
  acceptedDate: [],
};

const redeemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCEPTED_REDEEM:
      return {
        ...state,
        acceptedRedeem: action.payload,
      };
    case GET_UNACCEPTED_REDEEM:
      return {
        ...state,
        unAcceptedRedeem: action.payload,
      };
    case ACCEPT_REDEEM_REQUEST:
      return {
        ...state,
        unAcceptedRedeem: state.unAcceptedRedeem.filter(
          (redeem) => redeem._id !== action.payload._id
        ),
      };
    case GET_PENDING_DATE_LIST:
      return {
        ...state,
        pendingDate: action.payload,
      };
    case GET_ACCEPTED_DATE_LIST:
      return {
        ...state,
        acceptedDate: action.payload,
      };

    case DELETE_REDEEM_REQUEST:
      return {
        ...state,
        unAcceptedRedeem: state.unAcceptedRedeem.filter((redeem) => {
          return redeem._id !== action.payload;
        }),
      };
    default:
      return state;
  }
};

export default redeemReducer;
