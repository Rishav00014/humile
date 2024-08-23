import axios from "axios";
import {
  CLOSE_DIALOG,
  DELETE_CATEGORY,
  GET_CATEGORY,
  INERT_CATEGORY,
  SET_CREATE_CATEGORY_DONE,
  SET_UPDATE_CATEGORY_DONE,
  UPDATE_CATEGORY,
} from "./type";
import { apiInstanceFetch } from "../../util/api";

//Get Category
export const getCategory = () => (dispatch) => {
  apiInstanceFetch
    .get(`/category`)
    .then((res) => {
      dispatch({ type: GET_CATEGORY, payload: res.category });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Insert Category
export const insertCategory = (content) => (dispatch) => {
  axios
    .post(`/category/create`, content)
    .then((res) => {
      dispatch({ type: INERT_CATEGORY, payload: res.data.category });
      dispatch({ type: SET_CREATE_CATEGORY_DONE });
      dispatch({ type: CLOSE_DIALOG });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Update Category
export const updateCategory = (content, mid) => (dispatch) => {
  axios
    .patch(`category/update?category_id=${mid}`, content)
    .then((res) => {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: { data: res.data.category, id: mid },
      });
      dispatch({ type: SET_UPDATE_CATEGORY_DONE });
      dispatch({ type: CLOSE_DIALOG });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Delete Category
export const deleteCategory = (id) => (dispatch) => {
  axios
    .delete(`category/delete?category_id=${id}`)
    .then((res) => {
      dispatch({ type: DELETE_CATEGORY, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};
