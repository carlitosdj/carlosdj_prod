import {action} from 'typesafe-actions'
import {SupportsTypes, Support} from './types'

//Load
export const loadAllsupportsRequest = () => action(SupportsTypes.LOAD_ALLSUPPORT_REQUEST)
export const loadAllsupportsSuccess = (data: Support[]) =>
  action(SupportsTypes.LOAD_ALLSUPPORT_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadAllsupportsFailure = () => action(SupportsTypes.LOAD_ALLSUPPORT_FAILURE)

//Load single
export const loadSupportsRequest = (id: number) => action(SupportsTypes.LOAD_SUPPORT_REQUEST, id)
export const loadSupportsSuccess = (data: Support[]) =>
  action(SupportsTypes.LOAD_SUPPORT_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadSupportsFailure = () => action(SupportsTypes.LOAD_SUPPORT_FAILURE)

//Create
export const createSupportRequest = (newCart: Support) =>
  action(SupportsTypes.CREATE_SUPPORT_REQUEST, newCart)
export const createSupportSuccess = (cart: Support) =>
  action(SupportsTypes.CREATE_SUPPORT_SUCCESS, cart)
export const createSupportFailure = (error: {}) =>
  action(SupportsTypes.CREATE_SUPPORT_FAILURE, error)

//Update
export const updateSupportRequest = (supportToUpdate: Support) =>
  action(SupportsTypes.UPDATE_SUPPORT_REQUEST, supportToUpdate)
export const updateSupportSuccess = (data: Support) =>
  action(SupportsTypes.UPDATE_SUPPORT_SUCCESS, data)
export const updateSupportFailure = () => action(SupportsTypes.UPDATE_SUPPORT_FAILURE)
