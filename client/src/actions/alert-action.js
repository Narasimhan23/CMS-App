import {v4 as uuid} from "uuid"
import {REMOVE_ALERT, SET_ALERT} from "./types";

export const setAlert = (msg, alertType, timeout = 4500) => async dispatch => {
    const id = uuid();

    dispatch({
        type: SET_ALERT,
        payload: {msg,alertType,id}
    })

    setTimeout(()=> dispatch({type: REMOVE_ALERT,payload:id}),timeout);
}