import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productCategoryListReducer,
    productLikeReducer,
    productQuestionReducer,
    productReplyReducer

} from './reducers/productReducers'
import {
    blogListReducer,
    blogDetailsReducer,
    blogDeleteReducer,
    blogCreateReducer,
    blogUpdateReducer,
    blogReviewCreateReducer,
    blogTopRatedReducer
} from './reducers/blogReducers'
import {
    rentingListReducer,
    rentingDetailsReducer,
    rentingCreateReducer,
    rentingDeleteReducer,
    rentingReviewCreateReducer,
    rentingUpdateReducer,
    rentingTopRatedReducer,
   rentingLikeReducer,rentingReplyReducer,rentingQuestionReducer

} from './reducers/rentingReducers'
import {cartReducer} from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import {
    orderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, orderListMyReducer, orderListReducer,
} from './reducers/orderReducers'
import {
    gardenCreateReducer,
    gardenDeleteReducer,
    gardenDetailReducer,
    gardenListReducer
} from "./reducers/gardenReducers";
import {
    addReplyReducer,
    createForumReducer,
    getAllForumsReducer,
    getForumReducer,
    toggleLikeReducer
} from "./reducers/forumReducer";

const reducer = combineReducers({
    productList: productListReducer,
    gardenList: gardenListReducer,
    gardenDetail: gardenDetailReducer,
    gardenDelete: gardenDeleteReducer,
    gardenCreateList: gardenCreateReducer,
    productCategoryList: productCategoryListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productAddReply: productReplyReducer,
    productLike: productLikeReducer,
    productQuestion:productQuestionReducer,
    rentingList: rentingListReducer,
    rentingDetails: rentingDetailsReducer,
    rentingDelete: rentingDeleteReducer,
    rentingCreate: rentingCreateReducer,
    rentingUpdate: rentingUpdateReducer,
    rentingReviewCreate: rentingReviewCreateReducer,
    rentingTopRated: rentingTopRatedReducer,
    rentingAddReply: rentingReplyReducer,
    rentingLike: rentingLikeReducer,
    rentingQuestion:rentingQuestionReducer,
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,
    blogDelete: blogDeleteReducer,
    blogCreate: blogCreateReducer,
    blogUpdate: blogUpdateReducer,
    blogReviewCreate: blogReviewCreateReducer,
    blogTopRated: blogTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    forumList: getAllForumsReducer,
    forumDetails: getForumReducer,
    forumCreate: createForumReducer,
    forumAddReply: addReplyReducer,
    forumLike: toggleLikeReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// const cartItemsFromStorage1 = localStorage.getItem('cartItems1')
// ? JSON.parse(localStorage.getItem('cartItems1'))
// : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage, // cartItems1:cartItemsFromStorage1
    }, userLogin: {userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
