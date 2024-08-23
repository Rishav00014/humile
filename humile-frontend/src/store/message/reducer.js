import {
  CLOSE_DIALOG,
  DELETE_MESSAGE,
  GET_MESSAGE,
  INERT_MESSAGE,
  OPEN_DIALOG,
  SET_CREATE_MESSAGE_DONE,
  SET_UPDATE_MESSAGE_DONE,
  UNSET_CREATE_MESSAGE_DONE,
  UNSET_UPDATE_MESSAGE_DONE,
  UPDATE_MESSAGE,
} from "./type";

const initialState = {
  message: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get message
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    //Insert message
    case INERT_MESSAGE:
      const data = [...state.message];
      data.unshift(action.payload);
      return {
        ...state,
        message: data,
      };

    //Update message
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: state.message.map((message) =>
          message._id === action.payload.id ? action.payload.data : message
        ),
      };

    //Delete message
    case DELETE_MESSAGE:
      return {
        ...state,
        message: state.message.filter(
          (message) => message._id !== action.payload
        ),
      };

    //Open Dialog
    case OPEN_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    //Close Dialog
    case CLOSE_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case SET_CREATE_MESSAGE_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_MESSAGE_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_MESSAGE_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_MESSAGE_DONE:
      return {
        ...state,
        updateDone: false,
      };

    default:
      return state;
  }
};

export default messageReducer