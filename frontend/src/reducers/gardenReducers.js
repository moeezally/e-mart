import {
    GARDEN_CREATED,
    GARDEN_DELETE_ITEM,
    GARDEN_GET_ITEM,
    GARDEN_GET_SINGLE,
    GARDEN_UPDATE_ITEM
} from "../constants/gardenConstants";


export const gardenListReducer = (state, action) => {
    switch (action.type) {
        case GARDEN_GET_ITEM:
            return {
                data: action.payload,
            }
        default:
            return []
    }
}

export const gardenDetailReducer = (state, action) => {
    switch (action.type) {
        case GARDEN_GET_SINGLE:
            return {
                data: action.payload,
            }
        default:
            return []
    }
}

export const gardenDeleteReducer = (state, action) => {
    switch (action.type) {
        case GARDEN_DELETE_ITEM:
            return {
                data: action.payload,
            }
        default:
            return []
    }
}

export const gardenCreateReducer = (state, action) => {
    switch (action.type) {
        case GARDEN_CREATED:
            return {
                data: action.payload,
            }
        default:
            return []
    }
}