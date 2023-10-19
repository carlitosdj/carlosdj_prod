import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  // loadAllsupportsRequest,
  loadAllsupportsSuccess,
  loadAllsupportsFailure,

  //Load single
  loadSupportsRequest,
  loadSupportsSuccess,
  loadSupportsFailure,

  //Create
  createSupportRequest,
  createSupportSuccess,
  createSupportFailure,

  //Update
  updateSupportRequest,
  updateSupportSuccess,
  updateSupportFailure,
} from './actions'
import {Support} from './types'

//Load
export function* loadAllsupports() {
  try {
    const response: Support[] = yield call(api.get, 'supports')
    yield put(loadAllsupportsSuccess(response))
  } catch (error: any) {
    yield put(loadAllsupportsFailure())
  }
}

//Load single
export function* loadSupports(payload: ReturnType<typeof loadSupportsRequest>) {
  try {
    const response: Support[] = yield call(api.get, 'support/' + payload.payload)
    yield put(loadSupportsSuccess(response))
  } catch (error) {
    yield put(loadSupportsFailure())
  }
}

//Create
export function* createSupport(payload: ReturnType<typeof createSupportRequest>) {
  try {
    put(createSupportRequest(payload.payload))
    const response: Support = yield call(api.post, 'support', payload.payload)
    yield put(createSupportSuccess(response))
  } catch (error: any) {
    yield put(createSupportFailure(error.response.message))
  }
}

//Update
export function* updateSupport(payload: ReturnType<typeof updateSupportRequest>) {
  try {
    put(updateSupportRequest(payload.payload))
    const response: Support = yield call(api.post, 'support', payload.payload)
    yield put(updateSupportSuccess(response))
  } catch (error) {
    yield put(updateSupportFailure())
  }
}
