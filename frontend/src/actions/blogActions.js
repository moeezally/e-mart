import axios from 'axios'
import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DELETE_SUCCESS,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_CREATE_REVIEW_REQUEST,
  BLOG_CREATE_REVIEW_SUCCESS,
  BLOG_CREATE_REVIEW_FAIL,
  BLOG_TOP_REQUEST,
  BLOG_TOP_SUCCESS,
  BLOG_TOP_FAIL,
} from '../constants/blogConstants'
import { logout } from './userActions'

export const listBlogs = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/blogs?keyword=${keyword}&pageNumber=${pageNumber}`
      
      )
    //   console.log(data)
    

    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    
  }
 
}

export const listBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/blogs/${id}`)

    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/blogs/${id}`, config)

    dispatch({
      type: BLOG_DELETE_SUCCESS,
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
      type: BLOG_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createBlog = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/blogs`, {}, config)

    dispatch({
      type: BLOG_CREATE_SUCCESS,
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
      type: BLOG_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_UPDATE_REQUEST,
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
      `/api/blogs/${blog._id}`,
      blog,
      config
    )

    dispatch({
      type: BLOG_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createBlogReview = (blogId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BLOG_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/blogs/${blogId}/reviews`, review, config)

    dispatch({
      type: BLOG_CREATE_REVIEW_SUCCESS,
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
      type: BLOG_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_TOP_REQUEST })

    const { data } = await axios.get(`/api/blogs/top`)

    dispatch({
      type: BLOG_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BLOG_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
