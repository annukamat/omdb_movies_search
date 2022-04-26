import { MOVIE_REQUEST, MOVIE_SUCCESS, MOVIE_FAIL } from "../actions/types";
import axios from "axios";

export const fetchMovieRequest = () => {
  return {
    type: MOVIE_REQUEST,
  };
};
export const fetchMovieSuccess = (data) => {
  return {
    type: MOVIE_SUCCESS,
    payload: data,
  };
};
export const fetchMovieFailure = (error) => {
  return {
    type: MOVIE_FAIL,
    payload: error,
  };
};
export const fetchMovieList = (movIp) => {
  return (dispatch) => {
    dispatch(fetchMovieRequest());
    return axios
      .get(`http://localhost:8080/search/${movIp}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      .then((res) => {
        const movData = res.data;
        dispatch(fetchMovieSuccess(movData));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(fetchMovieFailure(errorMsg));
      });
  };
};
