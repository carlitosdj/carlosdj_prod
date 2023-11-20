import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadCommentsFailure,
  loadCommentsRequest,
  loadCommentsSuccess,

  //Create
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,

  //Update
  updateCommentFailure,
  updateCommentRequest,
  updateCommentSuccess,

  //Delete
  deleteCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  createCommentWithParentRequest,
  createCommentWithParentSuccess,
  createCommentWithParentFailure,
  updateCommentWithParentRequest,
  updateCommentWithParentSuccess,
  updateCommentWithParentFailure,
  deleteCommentWithParentRequest,
  deleteCommentWithParentSuccess,
  deleteCommentWithParentFailure,
} from './actions'
import {Comment} from './types'

//Load
export function* loadComments(payload: ReturnType<typeof loadCommentsRequest>) {
  try {
    const response: Comment[] = yield call(api.get, 'componentcomment/' + payload.payload)
    yield put(loadCommentsSuccess(response))
  } catch (error: any) {
    yield put(loadCommentsFailure(error.response.data))
  }
}

//Create
export function* createComment(payload: ReturnType<typeof createCommentRequest>) {
  try {
    put(createCommentRequest(payload.payload))
    const response: Comment = yield call(api.post, 'componentcomment', payload.payload)
    console.log("CREATE-COMMENT", response)
    yield put(createCommentSuccess(response))
  } catch (error: any) {
    yield put(createCommentFailure(error.response.message))
  }
}

//Create
export function* createCommentWithParent(payload: ReturnType<typeof createCommentWithParentRequest>) {
  try {
    put(createCommentWithParentRequest(payload.payload))
    const response: Comment = yield call(api.post, 'componentcomment', payload.payload)
    console.log("**************CREATE COMMENT WITH PARENT*************", response)
    yield put(createCommentWithParentSuccess(response))
  } catch (error: any) {
    yield put(createCommentWithParentFailure(error.response.message))
  }
}

//Update
export function* updateComment(payload: ReturnType<typeof updateCommentRequest>) {
  try {
    put(updateCommentRequest(payload.payload))
    const response: Comment = yield call(api.patch, 'componentcomment/'+payload.payload.id, payload.payload)
    yield put(updateCommentSuccess(response))
  } catch (error: any) {
    yield put(updateCommentFailure(error.response.data))
  }
}

export function* updateCommentWithParent(payload: ReturnType<typeof updateCommentWithParentRequest>) {
  try {
    console.log("UPDATE WITH PARENT")
    put(updateCommentWithParentRequest(payload.payload))
    const response: Comment = yield call(api.patch, 'componentcomment/'+payload.payload.id, payload.payload)
    yield put(updateCommentWithParentSuccess(response))
  } catch (error: any) {
    yield put(updateCommentWithParentFailure(error.response.data))
  }
}

//Delete
export function* deleteComment(payload: ReturnType<typeof deleteCommentRequest>) {
  try {
    const number: number = yield call(api.delete, 'componentcomment/' + payload.payload)
    yield put(deleteCommentSuccess(number))
  } catch (error: any) {
    yield put(deleteCommentFailure(error.response.data))
  }
}

//Delete
export function* deleteCommentWithParent(payload: ReturnType<typeof deleteCommentWithParentRequest>) {
  try {
    const number: number = yield call(api.delete, 'componentcomment/' + payload.payload)
    yield put(deleteCommentWithParentSuccess(number))
  } catch (error: any) {
    yield put(deleteCommentWithParentFailure(error.response.data))
  }
}
