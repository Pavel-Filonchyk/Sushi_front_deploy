import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import * as actions from '../actions/registrationAction'

import { POST_LOGIN, POST_REGISTRATION } from '../../common/api'
import httpProvider from '../../common/httpProvider'

const HANDLERS = {
  *[actions.postLogin]({ payload: elems }) {
    try {
      const { data } = yield call(httpProvider.post, POST_LOGIN, {
        data: elems
      })
      yield put(actions.postLoginSuccess(data))
    } catch (error) {
      console.log(error)
    }
  },
  *[actions.postRegistration]({ payload: elems }) {
    console.log(elems)
    try {
      const { data } = yield call(httpProvider.post, POST_REGISTRATION, {
        data: elems
      })
      yield put(actions.postRegistrationSuccess(data))
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