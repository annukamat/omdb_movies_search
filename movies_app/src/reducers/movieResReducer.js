import { MOVIE_REQUEST, MOVIE_SUCCESS, MOVIE_FAIL } from "../actions/types";

const initialState = {
  loading: false,
  movData: [],
  error: "",
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MOVIE_SUCCESS:
      return {
        loading: false,
        movData: action.payload,
        error: "",
      };
    case MOVIE_FAIL:
      return {
        loading: false,
        movData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
