import { APP_CONFIG } from '../constants/config'


const {
    REACT_APP_SERVER_URL
} = APP_CONFIG

export const GET_SUSHI = `${REACT_APP_SERVER_URL}/list`
export const CREATE_SUSHI = `${REACT_APP_SERVER_URL}/create`
export const BUY_SUSHI = `${REACT_APP_SERVER_URL}/cart`

export const POST_LOGIN = `${REACT_APP_SERVER_URL}/login`
export const POST_REGISTRATION = `${REACT_APP_SERVER_URL}/registration`

export const POST_EXPO = `${REACT_APP_SERVER_URL}/expo`


export const LOGIN = `${REACT_APP_SERVER_URL}`