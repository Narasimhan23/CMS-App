/* eslint-disable import/no-anonymous-default-export */
import {POST_ERROR,GET_POSTS,GET_POST, DELETE_POST, ADD_POST, ADD_COMMENT, DELETE_COMMENT} from "../actions/types"

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type,payload} = action;

    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                loading:false
            }
        case GET_POST:
            return{
                ...state,
                post: payload,
                loading:false
            }
        case ADD_POST:
            return{
                ...state,
                posts: [payload,...state.posts],
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case ADD_COMMENT:
            return{
                ...state,
                post: {...state.post, comments: payload}
            }
        case DELETE_COMMENT:
            return{
                ...state,
                post: {
                    ...state.post,comments: state.post.comments.filter(comment => comment._id!==payload)
                }
            }
        default:
            return state
    }
}