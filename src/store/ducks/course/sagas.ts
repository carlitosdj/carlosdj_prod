import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {loadCourseRequest, loadCourseSuccess, loadCourseFailure} from './actions'

import {CourseState} from './types'

//Load Course:
export function* loadCourse(payload: ReturnType<typeof loadCourseRequest>) {
  try {
    const response: CourseState = yield call(api.get, 'readCourse/' + payload.payload)
    yield put(loadCourseSuccess(response))
  } catch (error) {
    yield put(loadCourseFailure())
  }
}
