import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //All
  loadUsersRequest,
  loadUsersSuccess,
  loadUsersFailure,

  //single
  // loadUserRequest,
  // loadUserSuccess,
  // loadUserFailure,

  //Search
  searchUserRequest,
  searchUserSuccess,
  searchUserFailure,

  //Create
  createUserRequest,
  createUserSuccess,
  createUserFailure,

  //Update
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,

  //Delete
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserRequest,
} from './actions'
import { User } from './types'


//Load all users from api
export function* loadUsers(payload: ReturnType<typeof loadUsersRequest>) {
  try {
    put(loadUsersRequest(payload.payload.page, payload.payload.take))
    const response: User[] = yield call(api.get, `user/${payload.payload.page}/${payload.payload.take}`)
    yield put(loadUsersSuccess(response))
  } catch (error: any) {
    yield put(loadUsersFailure(error.response.data))
  }
}
/* 
//Find one user by id from api:
export function* findUserId(id: number) {
    try {
        put(loadUserRequest())
        const response : User[] = yield call(api.get, 'users/'+id);
        yield put(loadUserSuccess(response));
        yield console.log('response', response)
    } catch (error) {
        yield put(loadUserFailure());
    }
}
*/

//Search many users from search api
export function* searchUser(payload: ReturnType<typeof searchUserRequest>) {
  try {
    put(searchUserRequest(payload.payload))
    const response: User[] = yield call(api.get, 'user/search/' + payload.payload)
    yield put(searchUserSuccess(response))
  } catch (error: any) {
    yield put(searchUserFailure(error.response.data))
  }
}

//Create
export function* createUser(payload: ReturnType<typeof createUserRequest>) {
  try {
    put(createUserRequest(payload.payload))
    const response: User = yield call(api.post, 'user', payload.payload)
    yield put(createUserSuccess(response))
  } catch (error: any) {
    yield put(createUserFailure(error.response.data))
  }
}

//Update
export function* updateUser(payload: ReturnType<typeof updateUserRequest>) {
  try {
    // put(updateUserRequest(payload.payload))
    const response: User = yield call(api.patch, 'user/'+payload.payload.id, payload.payload)
    yield put(updateUserSuccess(response))
  } catch (error: any) {
    yield put(updateUserFailure(error.response.data))
  }
}

//Delete
export function* deleteUser(payload: ReturnType<typeof deleteUserRequest>) {
  try {
    const response: User = yield call(api.delete, 'user/' + payload.payload)
    yield put(deleteUserSuccess(response))
  } catch (error: any) {
    yield put(deleteUserFailure(error.response.data))
  }
}
