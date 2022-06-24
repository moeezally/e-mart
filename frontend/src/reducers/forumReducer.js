import {
    FORUM_ADD_REPLY,
    FORUM_APPROVE_FAIL,
    FORUM_APPROVE_REQUEST,
    FORUM_APPROVE_SUCCESS,
    FORUM_CREATE,
    FORUM_GET_ALL,
    FORUM_GET_ONE,
    FORUM_GET_TOTAL,
    FORUM_GET_TOTAL_SUCCESS,
    FORUM_TOGGLE_LIKE
} from "../constants/forumConstants";

export const createForumReducer = (state = {}, action) => {
    switch (action.type) {
        case FORUM_CREATE:
            return action.payload
        default:
            return state
    }
}

export const getAllForumsReducer = (state = [], action) => {
    switch (action.type) {
        case FORUM_GET_ALL:
            return action.payload
        default:
            return state
    }
}

export const getTotalForumsReducer = (state = [], action) => {
    switch (action.type) {
        case FORUM_GET_TOTAL:
            return action.payload
        // case FORUM_GET_TOTAL_SUCCESS:
        //     return action.payload
        default:
            return state
    }
}


export const getForumReducer = (state = {}, action) => {
    switch (action.type) {
        case FORUM_GET_ONE:
            return action.payload
        default:
            return state
    }
}

export const addReplyReducer = (state = {}, action) => {
    switch (action.type) {
        case FORUM_ADD_REPLY:
            return action.payload
        default:
            return state
    }
}

export const toggleLikeReducer = (state = {}, action) => {
    switch (action.type) {
        case FORUM_TOGGLE_LIKE:
            return action.payload
        default:
            return state
    }
}


export const forumApproveReducer = (state = {}, action) => {
    switch (action.type) {
      case FORUM_APPROVE_REQUEST:
        return {
          loading: true,
        }
      case FORUM_APPROVE_SUCCESS:
        return {
          loading: false,
          success: true,
        }
      case FORUM_APPROVE_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
     
      default:
        return state
    }
  }
  