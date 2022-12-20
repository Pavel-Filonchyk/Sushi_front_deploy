import { all, put, takeEvery, call } from 'redux-saga/effects'

import * as actions from '../actions/getSushiAction'

import { GET_SUSHI } from '../../common/api'
import httpProvider from '../../common/constants/httpProvider'

const HANDLERS = {
  *[actions.getSushi]() {
    try {
      const { data } = yield call(httpProvider.get, GET_SUSHI)
      
      yield put(actions.getSushiSuccess(data))
    } catch (error) {
      console.log(error)
    }
  }
  
}

export default function* sagaReducer() {
  const sagas = Object.keys(HANDLERS)
    .filter((key) => Object.prototype.hasOwnProperty.call(HANDLERS, key)) 
    .map((key) => takeEvery(key, HANDLERS[key]))

  yield all(sagas)
}
