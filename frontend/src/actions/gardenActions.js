import axios from 'axios'
import {
    GARDEN_CREATED, GARDEN_UPDATE_ITEM, GARDEN_DELETE_ITEM, GARDEN_GET_ITEM, GARDEN_GET_SINGLE
} from '../constants/gardenConstants'


export const createGarden = (garden) => async (dispatch, getState) => {
    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.post(`/api/garden`, garden, config)

    dispatch({
        type: GARDEN_CREATED, payload: data,
    })
}

export const getSingleGarden = (id) => async (dispatch, getState) => {
    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.get(`/api/garden/${id}`, config)

    dispatch({
        type: GARDEN_GET_SINGLE, payload: data,
    })
}

export const updateGarden = (garden) => async (dispatch, getState) => {
    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.put(`/api/garden/${garden._id}`, garden, config)

    dispatch({
        type: GARDEN_GET_SINGLE, payload: data,
    })
}

export const getGardens = () => async (dispatch, getState) => {
    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.get(`/api/garden`, config);

    dispatch({
        type: GARDEN_GET_ITEM, payload: data,
    })
}

export const deleteGarden = (id) => async (dispatch, getState) => {
    const {
        userLogin: {userInfo},
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const {data} = await axios.delete(`/api/garden/${id}`, config);

    dispatch({
        type: GARDEN_DELETE_ITEM, payload: data,
    })
}
