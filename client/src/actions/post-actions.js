import axios from "axios";
import { setAlert } from "./alert-action";
import {ADD_POST, DELETE_POST, GET_POSTS,GET_POST,POST_ERROR,ADD_COMMENT, DELETE_COMMENT} from "./types";

export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get("/post")
        dispatch({
            type: GET_POSTS,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status: err.response.status}
        })
    }
}

export const deletePost = id => async dispatch => {
    try{
        await axios.delete(`/post/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert("Post deleted", "success"))
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addPost = formData => async dispatch => {
    try{
        const res = await axios.post(`/post`,formData);
        dispatch({
            type: ADD_POST,
            payload: res.data.post
        })

        dispatch(setAlert("Post created", "success"))
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getPost = id => async dispatch => {
    try{
        const res = await axios.get(`/post/${id}`)
        dispatch({
            type: GET_POST,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status: err.response.status}
        })
    }
}

export const addComment = (postId,formData) => async dispatch => {
    try{
        const res = await axios.post(`/post/${postId}/comments`,formData);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert("Comment added", "success"))
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try{
        await axios.delete(`/post/${postId}/comments/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert("Comment deleted", "success"))
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}