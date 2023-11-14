import {action} from 'typesafe-actions'
import {User, UsersTypes} from './types'


//All
export const loadUsersRequest = (page: number, take: number) => action(UsersTypes.LOAD_USERS_REQUEST, {page, take})
export const loadUsersSuccess = (data: User[]) => action(UsersTypes.LOAD_USERS_SUCCESS, data)
export const loadUsersFailure = (err: any[]) => action(UsersTypes.LOAD_USERS_FAILURE, err)

//Single
export const loadUserRequest = () => action(UsersTypes.LOAD_USER_REQUEST)
export const loadUserSuccess = (data: User[]) => action(UsersTypes.LOAD_USER_SUCCESS, data)
export const loadUserFailure = (err: any[]) => action(UsersTypes.LOAD_USER_FAILURE, err)

//Search
export const searchUserRequest = (search: string) => action(UsersTypes.SEARCH_USERS_REQUEST, search)
export const searchUserSuccess = (data: User[]) => action(UsersTypes.SEARCH_USERS_SUCCESS, data)
export const searchUserFailure = (err: any[]) => action(UsersTypes.SEARCH_USERS_FAILURE, err)

//Create
export const createUserRequest = (newUser: User) => action(UsersTypes.CREATE_USER_REQUEST, newUser)
export const createUserSuccess = (data: User) => action(UsersTypes.CREATE_USER_SUCCESS, data)
export const createUserFailure = (err: any[]) => action(UsersTypes.CREATE_USER_FAILURE, err)

//Update
export const updateUserRequest = (userToUpdate: User) =>
  action(UsersTypes.UPDATE_USER_REQUEST, userToUpdate)
export const updateUserSuccess = (data: User) => action(UsersTypes.UPDATE_USER_SUCCESS, data)
export const updateUserFailure = (err: any[]) => action(UsersTypes.UPDATE_USER_FAILURE, err)

//Delete
export const deleteUserRequest = (userId: number) => action(UsersTypes.DELETE_USER_REQUEST, userId)
export const deleteUserSuccess = (data: User) => action(UsersTypes.DELETE_USER_SUCCESS, data)
export const deleteUserFailure = (err: any[]) => action(UsersTypes.DELETE_USER_FAILURE, err)
