import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadWppgroupsRequest,
  loadWppgroupsSuccess,
  loadWppgroupsFailure,

  //Create
  createWppgroupRequest,
  createWppgroupSuccess,
  createWppgroupFailure,

  //Update
  updateWppgroupRequest,
  updateWppgroupSuccess,
  updateWppgroupFailure,

  //Delete
  deleteWppgroupRequest,
  deleteWppgroupSuccess,
  deleteWppgroupFailure,
} from './actions'
import {Wppgroup} from './types'

//Load
export function* loadWppgroups(payload: ReturnType<typeof loadWppgroupsRequest>) {
  try {
    const response: Wppgroup[] = yield call(api.get, 'wppgroup/' + payload.payload)
    yield put(loadWppgroupsSuccess(response))
  } catch (error) {
    yield put(loadWppgroupsFailure())
  }
}

//Create
export function* createWppgroup(payload: ReturnType<typeof createWppgroupRequest>) {
  try {
    put(createWppgroupRequest(payload.payload))
    const response: Wppgroup = yield call(api.post, 'wppgroup', payload.payload)
    yield put(createWppgroupSuccess(response))
  } catch (error: any) {
    yield put(createWppgroupFailure(error.response.message))
  }
}

//Update
export function* updateWppgroup(payload: ReturnType<typeof updateWppgroupRequest>) {
  try {
    put(updateWppgroupRequest(payload.payload))
    const response: Wppgroup = yield call(api.post, 'wppgroup', payload.payload)
    yield put(updateWppgroupSuccess(response))
  } catch (error) {
    yield put(updateWppgroupFailure())
  }
}

//Delete
export function* deleteWppgroup(payload: ReturnType<typeof deleteWppgroupRequest>) {
  try {
    const number: number = yield call(api.delete, 'wppgroup/' + payload.payload)
    yield put(deleteWppgroupSuccess(number))
  } catch (error: any) {
    yield put(deleteWppgroupFailure(error.response.data))
  }
}
