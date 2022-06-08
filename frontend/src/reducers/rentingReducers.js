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
    RENTING_CREATE_REVIEW_RESET,
    RENTING_UPDATE_RESET,
    RENTING_CREATE_RESET,

  
  } from '../constants/rentingConstants'
  
  export const rentingListReducer = (state = { rentings: [] }, action) => {
    switch (action.type) {
      case RENTING_LIST_REQUEST:
        return { loading: true, rentings: [] }
      case RENTING_LIST_SUCCESS:
        return {
          loading: false,
          rentings: action.payload.rentings,
          pages: action.payload.pages,
          page: action.payload.page,
        }
      case RENTING_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const rentingDetailsReducer = (
    state = { renting: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case RENTING_DETAILS_REQUEST:
        return { ...state, loading: true }
      case RENTING_DETAILS_SUCCESS:
        return { loading: false, renting: action.payload }
      case RENTING_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const rentingDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case RENTING_DELETE_REQUEST:
        return { loading: true }
      case RENTING_DELETE_SUCCESS:
        return { loading: false, success: true }
      case RENTING_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const rentingCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case RENTING_CREATE_REQUEST:
        return { loading: true }
      case RENTING_CREATE_SUCCESS:
        return { loading: false, success: true, renting: action.payload }
      case RENTING_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case RENTING_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const rentingUpdateReducer = (state = { renting: {} }, action) => {
    switch (action.type) {
      case RENTING_UPDATE_REQUEST:
        return { loading: true }
      case RENTING_UPDATE_SUCCESS:
        return { loading: false, success: true, renting: action.payload }
      case RENTING_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case RENTING_UPDATE_RESET:
        return { rentings: {} }
      default:
        return state
    }
  }
  
  export const rentingReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case RENTING_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case RENTING_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case RENTING_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case RENTING_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const rentingTopRatedReducer = (state = { rentings: [] }, action) => {
    switch (action.type) {
      case RENTING_TOP_REQUEST:
        return { loading: true, rentings: [] }
      case RENTING_TOP_SUCCESS:
        return { loading: false, rentings: action.payload }
      case RENTING_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  