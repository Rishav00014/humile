import axios from "axios";

import { GET_REPORTED_USER } from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getReportedUser = () => (dispatch) => {
  apiInstanceFetch
    .get("/report")
    .then((res) => {
      if (res.status) {
        dispatch({ type: GET_REPORTED_USER, payload: res.report });
      }
    })
    .catch((error) => console.log("error", error.message));
};
