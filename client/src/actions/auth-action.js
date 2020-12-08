import axios from "axios";
import {setAlert} from "./alert-action";
import {REGISTER_FAILURE,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_FAILURE,LOGIN_SUCCESS,LOGOUT} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("/auth/user");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({name,email,password});

    try {
        const res = await axios.post("/registerUser",body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")))
        }

        dispatch({
            type: REGISTER_FAILURE
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({email,password});

    try {
        const res = await axios.post("/auth/user",body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors,err)
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")))
        }
        dispatch({
            type: LOGIN_FAILURE
        })
    }
}

export const logout = () => dispatch => {
    dispatch({type:LOGOUT})
}