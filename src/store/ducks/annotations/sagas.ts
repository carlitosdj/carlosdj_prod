import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  deleteAnnotationFailure,
  deleteAnnotationRequest,
  deleteAnnotationSuccess,
  //All
  loadMyAnnotationsFailure,
  loadMyAnnotationsRequest,
  loadMyAnnotationsSuccess,
} from './actions'

import {Annotation} from '../annotation/types'

//Load
export function* loadMyAnnotations(payload: ReturnType<typeof loadMyAnnotationsRequest>) {
  try {
    put(loadMyAnnotationsRequest(payload.payload))
    const response: Annotation = yield call(api.get, 'annotation/' + payload.payload)
    yield put(loadMyAnnotationsSuccess(response))
  } catch (error: any) {
    yield put(loadMyAnnotationsFailure(error.response.data))
  }
}

//Delete
export function* deleteAnnotation(payload: ReturnType<typeof deleteAnnotationRequest>) {
  try {
    const number: number = yield call(api.delete, 'annotation/' + payload.payload)
    yield put(deleteAnnotationSuccess(number))
  } catch (error: any) {
    yield put(deleteAnnotationFailure(error.response.data))
  }
}