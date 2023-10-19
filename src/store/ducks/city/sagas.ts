import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadCityFailure,
  loadCityRequest,
  loadCitySuccess
} from './actions'

import {City} from './types'

//Load
export function* loadCity(payload: ReturnType<typeof loadCityRequest>) {
  try {
    put(loadCityRequest(payload.payload))
    const response: City[] = yield call(api.get, 'cities/' + payload.payload)
    yield put(loadCitySuccess(response))
  } catch (error) {
    yield put(loadCityFailure())
  }
}
