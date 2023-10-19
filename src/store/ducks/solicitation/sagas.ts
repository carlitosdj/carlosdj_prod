import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadAllSolicitationsRequest,
  loadAllSolicitationsSuccess,
  loadAllSolicitationsFailure,

  createSolicitationRequest,
  createSolicitationSuccess,
  createSolicitationFailure,

  updateSolicitationRequest,
  updateSolicitationSuccess,
  updateSolicitationFailure
} from './actions'
import {Solicitation} from './types'

//Load
//Load single
export function* loadAllSolicitations(payload: ReturnType<typeof loadAllSolicitationsRequest>) {
  put(loadAllSolicitationsRequest(payload.payload))
  //put(loadAllSolicitationsRequest(payload.payload))
  try {
    const response: Solicitation[] = yield call(api.get, 'solicitations/' + payload.payload)
    //const response: Solicitation[] = yield call(api.get, 'solicitations/' + payload.payload)
    yield put(loadAllSolicitationsSuccess(response))
  } catch (error) {
    yield put(loadAllSolicitationsFailure())
  }
}

//Create
export function* createSolicitation(payload: ReturnType<typeof createSolicitationRequest>) {
  try {
    put(createSolicitationRequest(payload.payload))
    const response: Solicitation = yield call(api.post, 'solicitation', payload.payload)
    yield put(createSolicitationSuccess(response))
  } catch (error: any) {
    yield put(createSolicitationFailure(error.response.message))
  }
}

//Update
export function* updateSolicitation(payload: ReturnType<typeof updateSolicitationRequest>) {
  try {
    put(updateSolicitationRequest(payload.payload))
    const response: Solicitation = yield call(api.post, 'solicitation', payload.payload)
    yield put(updateSolicitationSuccess(response))
  } catch (error) {
    yield put(updateSolicitationFailure())
  }
}
