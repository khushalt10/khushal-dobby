import { IMAGE_CREATE_FAIL, IMAGE_CREATE_REQUEST, IMAGE_CREATE_SUCCESS, IMAGE_DETAILS_FAIL, IMAGE_DETAILS_REQUEST, IMAGE_DETAILS_SUCCESS, IMAGE_LIST_FAIL, IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESS, IMAGE_UPDATE_FAIL, IMAGE_UPDATE_REQUEST, IMAGE_UPDATE_SUCCESS } from "../constants/imageConstants"
import axios from 'axios'

export const listImages = (keyword = '') => async (dispatch) => {
    try {
        dispatch({
            type: IMAGE_LIST_REQUEST,
        })

        const { data } = await axios.get(`/api/images?keyword=${keyword}`)

        dispatch({
            type: IMAGE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
} 

export const createImage = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: IMAGE_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } =  await axios.post(`/api/images`, {}, config)
      
        dispatch({
            type: IMAGE_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMAGE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateImage = (image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: IMAGE_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } =  await axios.put(`/api/images/${image._id}`, image, config)

        dispatch({
            type: IMAGE_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMAGE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listImageDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IMAGE_DETAILS_REQUEST,
        })

        const { data } = await axios.get(`/api/images/${id}`)

        dispatch({
            type: IMAGE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}