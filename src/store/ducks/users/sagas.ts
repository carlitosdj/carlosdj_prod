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
    const response: User[] = yield call(api.get, `users/${payload.payload.page}/${payload.payload.take}`)
    yield put(loadUsersSuccess(response))
  } catch (error) {
    yield put(loadUsersFailure())
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
    const response: User[] = yield call(api.get, 'userssearch/' + payload.payload)
    yield put(searchUserSuccess(response))
  } catch (error) {
    yield put(searchUserFailure())
  }
}

//Create
export function* createUser(payload: ReturnType<typeof createUserRequest>) {
  try {
    put(createUserRequest(payload.payload))
    const response: User = yield call(api.post, 'users', payload.payload)
    yield put(createUserSuccess(response))
  } catch (error) {
    yield put(createUserFailure())
  }
}

//Update
export function* updateUser(payload: ReturnType<typeof updateUserRequest>) {
  try {
    // put(updateUserRequest(payload.payload))
    const response: User = yield call(api.post, 'users', payload.payload)
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFailure())
  }
}

//Delete
export function* deleteUser(payload: ReturnType<typeof deleteUserRequest>) {
  try {
    const response: User = yield call(api.delete, 'users/' + payload.payload)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFailure())
  }
}
