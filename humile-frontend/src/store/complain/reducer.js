import {
  CLOSE_COMPLAIN_DIALOG,
  GET_COMPLAIN,
  OPEN_CLOSE_COMPLAIN,
  OPEN_COMPLAIN_DIALOG,
  GET_SOLVED_COMPLAIN,
  GET_ACCEPTED_DATE_LIST,
  GET_PENDING_DATE_LIST,
} from "./types";

const initialState = {
  complain: [],
  dialog: false,
  dialogData: null,
  solvedComplain: [],
  acceptedDate: [],
  pendingDate: [],
};

const complainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPLAIN:
      return {
        ...state,
        complain: action.payload,
      };
    case GET_SOLVED_COMPLAIN:
      return {
        ...state,
        solvedComplain: action.payload,
      };

    case OPEN_CLOSE_COMPLAIN:
      return {
        ...state,
        complain: state.complain.filter((complain) => {
          return complain._id !== action.payload._id;
        }),
      };
    case OPEN_COMPLAIN_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_COMPLAIN_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
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
    default:
      return state;
  }
};

export default complainReducer;
