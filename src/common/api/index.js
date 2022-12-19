import { APP_CONFIG } from '../constants/config'


const {
    REACT_APP_SERVER_URL
} = APP_CONFIG

export const GET_SUSHI = `${REACT_APP_SERVER_URL}/list`
export const CREATE_SUSHI = `${REACT_APP_SERVER_URL}/create`
export const BUY_SUSHI = `${REACT_APP_SERVER_URL}/cart`