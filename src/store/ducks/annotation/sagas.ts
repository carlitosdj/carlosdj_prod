import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Single
  loadAnnotationSingleFailure,
  loadAnnotationSingleRequest,
  loadAnnotationSingleSuccess,
  //Create
  createAnnotationFailure,
  createAnnotationRequest,
  createAnnotationSuccess,
} from './actions'

import {Annotation} from './types'

//Single
export function* loadAnnotationsSingle(payload: ReturnType<typeof loadAnnotationSingleRequest>) {
  try {
    put(loadAnnotationSingleRequest(payload.payload.userId, payload.payload.componentId))
    const response: Annotation = yield call(
      api.get,
      'annotation/' + payload.payload.userId + '/' + payload.payload.componentId
    )
    console.log('response', response)
    yield put(loadAnnotationSingleSuccess(response))
  } catch (error: any) {
    yield put(loadAnnotationSingleFailure(error.response.data))
  }
}

//Create
export function* createAnnotation(payload: ReturnType<typeof createAnnotationRequest>) {
  try {
    put(createAnnotationRequest(payload.payload.annotation, payload.payload.isNew))
    const response: Annotation = yield payload.payload.isNew
      ? call(api.post, 'annotation', payload.payload.annotation)
      : call(api.patch, 'annotation/'+payload.payload.annotation.id, payload.payload.annotation)

    yield put(createAnnotationSuccess(response))
  } catch (error: any) {
    yield put(createAnnotationFailure(error.response.data))
  }
}
