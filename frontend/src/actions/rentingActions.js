import axios from 'axios'
import {
  RENTING_LIST_REQUEST,
  RENTING_LIST_SUCCESS,
  RENTING_LIST_FAIL,
  RENTING_DETAILS_REQUEST,
  RENTING_DETAILS_SUCCESS,
  RENTING_DETAILS_FAIL,
  RENTING_DELETE_SUCCESS,
  RENTING_DELETE_REQUEST,
  RENTING_DELETE_FAIL,
  RENTING_CREATE_REQUEST,
  RENTING_CREATE_SUCCESS,
  RENTING_CREATE_FAIL,
  RENTING_UPDATE_REQUEST,
  RENTING_UPDATE_SUCCESS,
  RENTING_UPDATE_FAIL,
  RENTING_CREATE_REVIEW_REQUEST,
  RENTING_CREATE_REVIEW_SUCCESS,
  RENTING_CREATE_REVIEW_FAIL,
  RENTING_TOP_REQUEST,
  RENTING_TOP_SUCCESS,
  RENTING_TOP_FAIL,
  RENTING_ADD_REPLY,
  RENTING_TOGGLE_LIKE,
  ASK_QUESTION
} from '../constants/rentingConstants'
import { logout } from './userActions'

export const listRentings = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: RENTING_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/rentings?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: RENTING_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RENTING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listRentingDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RENTING_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/rentings/${id}`)

    dispatch({
      type: RENTING_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RENTING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteRenting = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RENTING_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/rentings/${id}`, config)

    dispatch({
      type: RENTING_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RENTING_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createRenting = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RENTING_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/rentings`, {}, config)

    dispatch({
      type: RENTING_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RENTING_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateRenting = (renting) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RENTING_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/rentings/${renting._id}`,
      renting,
      config
    )

    dispatch({
      type: RENTING_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: RENTING_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RENTING_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createRentingReview = (rentingId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type:RENTING_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/rentings/${rentingId}/reviews`, review, config)

    dispatch({
      type: RENTING_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RENTING_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopRentings = () => async (dispatch) => {
  try {
    dispatch({ type: RENTING_TOP_REQUEST })

    const { data } = await axios.get(`/api/rentings/top`)

    dispatch({
      type: RENTING_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RENTING_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
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

  const {data} = await axios.post(`/api/rentings/${id}/reply`, {text}, config);

  dispatch({
      type: RENTING_ADD_REPLY, payload: data
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

  const {data} = await axios.post(`/api/rentings/${id}/reply/${rid}/like`, {}, config);

  dispatch({
      type: RENTING_TOGGLE_LIKE, payload: data
  })
}


export const askQuestion = ({title, description}) => async (dispatch, getState) => {

  const {
      userLogin: {userInfo},
  } = getState()

  const config = {
      headers: {
          Authorization: `Bearer ${userInfo.token}`,
      },
  }

  const {data} = await axios.post('/api/rentings', {
      title, description
  }, config);

  dispatch({
      type: ASK_QUESTION, payload: data,
  })
}


