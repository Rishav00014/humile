import {
  CLOSE_DIALOG,
  DELETE_GAME,
  GET_GAME,
  INSERT_GAME,
  OPEN_DIALOG,
  SET_CREATE_GAME_DONE,
  SET_UPDATE_GAME_DONE,
  TOP_SWITCH,
  UNSET_CREATE_GAME_DONE,
  UNSET_UPDATE_GAME_DONE,
  UPDATE_GAME,
} from "./type";

const initialState = {
  game: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get game
    case GET_GAME:
      return {
        ...state,
        game: action.payload,
      };

    //Insert game
    case INSERT_GAME:
      const data = [...state.game];
      data.unshift(action.payload);
      return {
        ...state,
        game: data,
      };

    //Update game
    case UPDATE_GAME:
      return {
        ...state,
        game: state.game.map((game) =>
          game._id === action.payload.id ? action.payload.data : game
        ),
      };

    //Delete game
    case DELETE_GAME:
      return {
        ...state,
        game: state.game.filter((game) => game._id !== action.payload),
      };

    case TOP_SWITCH:
      return {
        ...state,
        game: state.game.map((game) => {
          if (game._id === action.payload._id) {
            return {
              ...game,
              isTop: action.payload.isTop,
            };
          } else {
            return game;
          }
        }),
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

    case SET_CREATE_GAME_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_GAME_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_GAME_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_GAME_DONE:
      return {
        ...state,
        updateDone: false,
      };

    default:
      return state;
  }
};
