import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadLeadsRequest,
  loadLeadsSuccess,
  loadLeadsFailure,

  //Search
  searchLeadsRequest,
  searchLeadsSuccess,
  searchLeadsFailure,
} from './actions'

import {Lead} from '../lead/types'

//Load
export function* loadLeads(payload: ReturnType<typeof loadLeadsRequest>) {
  try {
    put(loadLeadsRequest())
    const response: Lead[] = yield call(api.get, 'leads')
    yield put(loadLeadsSuccess(response))
  } catch (error: any) {
    yield put(loadLeadsFailure(error.response.data))
  }
}

//Search
export function* searchLeads(payload: ReturnType<typeof searchLeadsRequest>) {
  try {
    put(searchLeadsRequest(payload.payload))
    const response: Lead[] = yield call(api.get, 'leadssearch/' + payload.payload)
    yield put(searchLeadsSuccess(response))
  } catch (error) {
    yield put(searchLeadsFailure())
  }
}
