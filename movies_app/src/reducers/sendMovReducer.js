import { SEND_MOV_DATA } from "../actions/types";

const initialState = {
  movDetail: [],
};

export default function sendMovReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MOV_DATA:
      return {
        ...state,
        movDetail: action.data,
      };
    default:
      return state;
  }
}
