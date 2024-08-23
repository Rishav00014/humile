import {
  OPEN_LANGUAGE_DIALOG,
  CLOSE_LANGUAGE_DIALOG,
  GET_LANGUAGE,
  CREATE_NEW_LANGUAGE,
  EDIT_LANGUAGE,
  DELETE_LANGUAGE,
  SET_CREATE_LANGUAGE_DONE,
  UNSET_CREATE_LANGUAGE_DONE,
  SET_UPDATE_LANGUAGE_DONE,
  UNSET_UPDATE_LANGUAGE_DONE,
  GET_TOTAL_RECORD,
} from "./types";

const initialState = {
  language: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  total: 0,
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case CREATE_NEW_LANGUAGE:
      const data = [...state.language];
      data.unshift(action.payload);
      return {
        ...state,
        language: data,
      };
    case EDIT_LANGUAGE:
      return {
        ...state,
        language: state.language.map((language) => {
          if (language._id === action.payload.id) return action.payload.data;
          else return language;
        }),
      };
    case DELETE_LANGUAGE:
      return {
        ...state,
        language: state.language.filter((language) => {
          return language._id !== action.payload;
        }),
      };

    case SET_CREATE_LANGUAGE_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_LANGUAGE_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_LANGUAGE_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_LANGUAGE_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_LANGUAGE_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_LANGUAGE_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
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

export default languageReducer;
