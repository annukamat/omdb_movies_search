import {SEND_MOV_DATA} from "./types";

export const sendMovData = (data) => {
    return {
      type: SEND_MOV_DATA,
      data: data,
    };
  };