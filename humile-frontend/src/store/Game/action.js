import axios from "axios";
import {
  CLOSE_DIALOG,
  DELETE_GAME,
  GET_GAME,
  INSERT_GAME,
  SET_CREATE_GAME_DONE,
  SET_UPDATE_GAME_DONE,
  TOP_SWITCH,
  UPDATE_GAME,
} from "./type";
import { apiInstanceFetch } from "../../util/api";

//Get GAME
export const getGame = () => (dispatch) => {
  apiInstanceFetch
    .get(`/game?category_id=ALL`)
    .then((res) => {
      dispatch({ type: GET_GAME, payload: res.game });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Insert GAME
export const insertGame = (content) => (dispatch) => {
  axios
    .post(`game/create`, content)
    .then((res) => {
      dispatch({ type: INSERT_GAME, payload: res.data.game });
      dispatch({ type: CLOSE_DIALOG });
      dispatch({ type: SET_CREATE_GAME_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Update GAME
export const updateGame = (content, mid) => (dispatch) => {
  axios
    .patch(`game/update?game_id=${mid}`, content)
    .then((res) => {
      dispatch({
        type: UPDATE_GAME,
        payload: { data: res.data.game, id: mid },
      });
      dispatch({ type: SET_UPDATE_GAME_DONE });
      dispatch({ type: CLOSE_DIALOG });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Delete GAME
export const deleteGame = (id) => (dispatch) => {
  axios
    .delete(`game/delete?game_id=${id}`)
    .then((res) => {
      dispatch({ type: DELETE_GAME, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};

//top switch
export const top = (id) => (dispatch) => {
  axios
    .put(`/game/top?game_id=${id}`)
    .then((result) => {
      dispatch({ type: TOP_SWITCH, payload: result.data.game });
    })
    .catch((error) => {
      console.log(error);
    });
};
