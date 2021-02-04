import { IMAGE_CREATE_FAIL, IMAGE_CREATE_REQUEST, IMAGE_CREATE_RESET, IMAGE_CREATE_SUCCESS, IMAGE_DETAILS_FAIL, IMAGE_DETAILS_REQUEST, IMAGE_DETAILS_SUCCESS, IMAGE_LIST_FAIL, IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESS, IMAGE_UPDATE_FAIL, IMAGE_UPDATE_REQUEST, IMAGE_UPDATE_RESET, IMAGE_UPDATE_SUCCESS} from "../constants/imageConstants"

export const imageListReducer = (state = {images: []}, action) => {
    switch(action.type) {

        case IMAGE_LIST_REQUEST:
            return { loading: true, images: [] }

        case IMAGE_LIST_SUCCESS:
            return { loading: false, images: action.payload}
        
        case IMAGE_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
} 

export const imageCreateReducer = (state = {}, action) => {
    switch(action.type) {

        case IMAGE_CREATE_REQUEST:
            return { loading: true}

        case IMAGE_CREATE_SUCCESS:
            return { loading: false, success: true, image: action.payload }

        case IMAGE_CREATE_FAIL:
            return {loading: false, error: action.payload}

        case IMAGE_CREATE_RESET:
            return {}

        default:
            return state
    }
} 

export const imageUpdateReducer = (state = { image: {} }, action) => {
    switch(action.type) {

        case IMAGE_UPDATE_REQUEST:
            return { loading: true}

        case IMAGE_UPDATE_SUCCESS:
            return { loading: false, success: true, image: action.payload }

        case IMAGE_UPDATE_FAIL:
            return {loading: false, error: action.payload}

        case IMAGE_UPDATE_RESET:
            return { image: {}}

        default:
            return state
    }
} 

export const imageDetailsReducer = (state = {image: { } }, action) => {
    switch(action.type) {

        case IMAGE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case IMAGE_DETAILS_SUCCESS:
            return { loading: false, image: action.payload }

        case IMAGE_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
} 