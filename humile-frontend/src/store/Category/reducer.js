import {
  CLOSE_DIALOG,
  DELETE_CATEGORY,
  GET_CATEGORY,
  INERT_CATEGORY,
  OPEN_DIALOG,
  SET_CREATE_CATEGORY_DONE,
  SET_UPDATE_CATEGORY_DONE,
  UNSET_CREATE_CATEGORY_DONE,
  UNSET_UPDATE_CATEGORY_DONE,
  UPDATE_CATEGORY,
} from "./type";

const initialState = {
  category: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get Category
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    //Insert Category
    case INERT_CATEGORY:
      const data = [...state.category];
      data.unshift(action.payload);
      return {
        ...state,
        category: data,
      };

    //Update Category
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: state.category.map((category) =>
          category._id === action.payload.id ? action.payload.data : category
        ),
      };

    //Delete Category
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter(
          (category) => category._id !== action.payload
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

    case SET_CREATE_CATEGORY_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_CATEGORY_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_CATEGORY_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_CATEGORY_DONE:
      return {
        ...state,
        updateDone: false,
      };

    default:
      return state;
  }
};
