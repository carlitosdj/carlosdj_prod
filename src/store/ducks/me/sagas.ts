import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Login
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,

  // authfromcookie,
  // logoutUser,

  //Update
  updateMeRequest,
  updateMeSuccess,
  updateMeFailure,

  //Create
  createMeRequest,
  createMeSuccess,
  createMeFailure,

  //Delete
  deleteMeRequest,
  deleteMeSuccess,
  deleteMeFailure,

  //Recovery
  recoveryUserRequest,
  recoveryUserSuccess,
  recoveryUserFailure,

  //Load me
  loadMeRequest,
  loadMeSuccess,
  loadMeFailure,

  changePassMeRequest,
  changePassMeFailure,
  changePassMeSuccess
} from './actions'
import { User } from '../users/types'


//Login
export function* loginUser(payload: ReturnType<typeof loginUserRequest>) {
  try {
    const response: User = yield call(api.post, 'auth/login', payload.payload) //Payload.payload está ok
    //yield put(loginUserSuccess(response))


    //Guarda o Token na LocalStorage
    localStorage.setItem('TOKEN', response.data.access_token)

    //Get user informations
    const responseB: User = yield call(api.get, 'auth/profile')
    console.log("response B", responseB)
    yield put(loginUserSuccess(responseB))

  } catch (error) {
    yield put(loginUserFailure())
  }
}

//Recovery
export function* recoveryUser(payload: ReturnType<typeof recoveryUserRequest>) {
  try {
    console.log("CHAMOU...")
    const response: string = yield call(api.post, 'user/recovery', {email: payload.payload}) //Payload.payload está ok
    yield put(recoveryUserSuccess(response))
  } catch (error:any) {
    yield put(recoveryUserFailure(error.response.data))
  }
}

//Load me
export function* loadMe(payload: ReturnType<typeof loadMeRequest>) {
  try {
    const response: User = yield call(api.get, 'user/email/'+ payload.payload.email)
    yield put(loadMeSuccess(response))
  } catch (error) {
    yield put(loadMeFailure())
  }
}

//Create
export function* createMe(payload: ReturnType<typeof createMeRequest>) {
  try {
    put(createMeRequest(payload.payload))
    const response: User = yield call(api.post, 'user', payload.payload)
    yield put(createMeSuccess(response))
  } catch (error) {
    yield put(createMeFailure())
  }
}

//Update
export function* updateMe(payload: ReturnType<typeof updateMeRequest>) {
  try {
    const response: User = yield call(api.patch, 'user/'+payload.payload.id, payload.payload)
    yield put(updateMeSuccess(response))
  } catch (error) {
    yield put(updateMeFailure())
  }
}

//Update
export function* changePassMe(payload: ReturnType<typeof changePassMeRequest>) {
  try {
    const response: User = yield call(api.post, 'user', payload.payload)
    yield put(changePassMeSuccess(response))
  } catch (error) {
    yield put(changePassMeFailure())
  }
}

//Delete
export function* deleteMe(payload: ReturnType<typeof deleteMeRequest>) {
  try {
    const response: User = yield call(api.delete, 'user/' + payload.payload)
    yield put(deleteMeSuccess(response))
  } catch (error) {
    yield put(deleteMeFailure())
  }
}
