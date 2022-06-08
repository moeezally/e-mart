import {
    FORUM_ADD_REPLY,
    FORUM_CREATE,
    FORUM_GET_ALL,
    FORUM_GET_ONE,
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