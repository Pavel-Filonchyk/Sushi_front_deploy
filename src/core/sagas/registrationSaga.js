import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import * as actions from '../actions/registrationAction'
import { error } from '../actions/errorAction'
import { POST_LOGIN, POST_REGISTRATION } from '../../common/api'
import httpProvider from '../../common/httpProvider'

const HANDLERS = {
  *[actions.postLogin]({ payload: elems }) {
    try {
      const { data } = yield call(httpProvider.post, POST_LOGIN, {
        data: elems
      })
      document.cookie = data.token
      yield put(actions.postLoginSuccess(data.userName))
    } catch (err) {
      yield put(error(err.response.data))
    }
  },
  *[actions.postRegistration]({ payload: elems }) {
    try {
      const { data } = yield call(httpProvider.post, POST_REGISTRATION, {
        data: elems
      })
      document.cookie = data.token
      yield put(actions.postRegistrationSuccess(data.userName))
    } catch (err) {
      yield put(error(err.response.data))
    }
  }
}

export default function* sagaReducer() {
  const sagas = Object.keys(HANDLERS)
    .filter((key) => Object.prototype.hasOwnProperty.call(HANDLERS, key)) 
    .map((key) => takeEvery(key, HANDLERS[key]))

  yield all(sagas)
}