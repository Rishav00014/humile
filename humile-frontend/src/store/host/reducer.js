import {
  GET_HOST,
  ENABLE_DISABLE_HOST,
  CREATE_NEW_HOST,
  SET_CREATE_HOST_DONE,
  UNSET_CREATE_HOST_DONE,
  DELETE_HOST,
  OPEN_HOST_DIALOG,
  CLOSE_HOST_DIALOG,
  SET_UPDATE_HOST_DONE,
  UNSET_UPDATE_HOST_DONE,
  EDIT_HOST,
  GET_CURRENT_WEEK_ANALYTIC,
  GET_LAST_WEEK_ANALYTIC,
  HOST_RECENT_CALL_HISTORY,
  HOST_INCOMING_CALL_HISTORY,
  EDIT_HOST_COIN,
  GET_TOTAL_RECORD,
  UPDATE_COIN_HISTORY,
} from "./types";

const initialState = {
  host: [],
  createDone: false,
  updateDone: false,
  dialog: false,
  dialogData: null,
  currentWeek: [],
  lastWeek: [],
  recentHistory: [],
  incomingHistory: [],
  total: 0,
  history: [],
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case CREATE_NEW_HOST:
      const data = [...state.host];
      data.unshift(action.payload);
      return {
        ...state,
        host: data,
      };
    case EDIT_HOST:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host._id === action.payload.id) return action.payload.data;
          else return host;
        }),
      };
    case EDIT_HOST_COIN:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host._id === action.payload.id) return action.payload.data;
          else return host;
        }),
      };
    case DELETE_HOST:
      return {
        ...state,
        host: state.host.filter((host) => host._id !== action.payload),
      };
    case SET_CREATE_HOST_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_HOST_DONE:
      return {
        ...state,
        createDone: false,
      };
    case OPEN_HOST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_HOST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case SET_UPDATE_HOST_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_HOST_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case ENABLE_DISABLE_HOST:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host._id === action.payload._id)
            return { ...host, isDisable: action.payload.isDisable };
          else return host;
        }),
      };
    case GET_CURRENT_WEEK_ANALYTIC:
      return {
        ...state,
        currentWeek: action.payload,
      };
    case GET_LAST_WEEK_ANALYTIC:
      return {
        ...state,
        lastWeek: action.payload,
      };

    case HOST_RECENT_CALL_HISTORY:
      return {
        ...state,
        recentHistory: action.payload,
      };

    case HOST_INCOMING_CALL_HISTORY:
      return {
        ...state,
        incomingHistory: action.payload,
      };
    case UPDATE_COIN_HISTORY:
      return {
        ...state,
        history: true,
      };

    case GET_TOTAL_RECORD:
      return {
        ...state,
        total: action.payload,
      };

    default:
      return state;
  }
};

export default hostReducer;
