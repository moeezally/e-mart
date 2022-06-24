import axios from 'axios'
import {
    FORUM_ADD_REPLY, FORUM_CREATE, FORUM_GET_ALL, FORUM_GET_ONE, FORUM_TOGGLE_LIKE, FORUM_GET_TOTAL,FORUM_GET_TOTAL_SUCCESS, FORUM_APPROVE_REQUEST, FORUM_APPROVE_SUCCESS, FORUM_APPROVE_FAIL
} from "../constants/forumConstants";


export const createForum = ({title, description}) => async (dispatch, getState) => {

    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.post('/api/forum/', {
        title, description
    }, config);

    dispatch({
        type: FORUM_CREATE, payload: data,
    })
}

export const getForum = (id) => async (dispatch, getState) => {

    console.log('====================================');
    console.log(id);
    console.log('====================================');
    const {
        userLogin: {userInfo},
    } = getState()

    const {data} = await axios.post(`/api/forum/${id}`, {user: userInfo._id});

    dispatch({
        type: FORUM_GET_ONE, payload: data,
    })
}

export const getAllForums = (pageNumber) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/forum?pageNumber=${pageNumber}`);
    console.log(data);
    dispatch({
        type: FORUM_GET_ALL, payload: data
    })
}

export const getTotalForums = () => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/forum/all`);
    dispatch({
        type: FORUM_GET_TOTAL, payload: data
    })
}

export const addReply = (id, text) => async (dispatch, getState) => {

    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.post(`/api/forum/${id}/reply`, {text}, config);

    dispatch({
        type: FORUM_ADD_REPLY, payload: data
    })
}

export const toggleLike = (id, rid) => async (dispatch, getState) => {

    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.post(`/api/forum/${id}/reply/${rid}/like`, {}, config);

    dispatch({
        type: FORUM_TOGGLE_LIKE, payload: data
    })
}



export const approveforum = (forum) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FORUM_APPROVE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.put(`/api/forum/${forum._id}/approved`, {}, config)

        dispatch({
            type: FORUM_APPROVE_SUCCESS, payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            // dispatch(logout())
        }
        dispatch({
            type: FORUM_APPROVE_FAIL, payload: message,
        })
    }
}
