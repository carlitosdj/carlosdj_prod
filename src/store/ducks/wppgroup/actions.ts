import {action} from 'typesafe-actions'
import {WppgroupTypes, Wppgroup} from './types'

//Load groups
export const loadWppgroupsRequest = (id: string) => action(WppgroupTypes.LOAD_WPPGROUPS_REQUEST, id)
export const loadWppgroupsSuccess = (data: Wppgroup[]) =>
  action(WppgroupTypes.LOAD_WPPGROUPS_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadWppgroupsFailure = () => action(WppgroupTypes.LOAD_WPPGROUPS_FAILURE)

//Create
export const createWppgroupRequest = (data: Wppgroup) =>
  action(WppgroupTypes.CREATE_WPPGROUP_REQUEST, data)
export const createWppgroupSuccess = (data: Wppgroup) =>
  action(WppgroupTypes.CREATE_WPPGROUP_SUCCESS, data)
export const createWppgroupFailure = (error: {}) =>
  action(WppgroupTypes.CREATE_WPPGROUP_FAILURE, error)

//Update
export const updateWppgroupRequest = (supportToUpdate: Wppgroup) =>
  action(WppgroupTypes.UPDATE_WPPGROUP_REQUEST, supportToUpdate)
export const updateWppgroupSuccess = (data: Wppgroup) =>
  action(WppgroupTypes.UPDATE_WPPGROUP_SUCCESS, data)
export const updateWppgroupFailure = () => action(WppgroupTypes.UPDATE_WPPGROUP_FAILURE)

//Delete
export const deleteWppgroupRequest = (id: string) =>
  action(WppgroupTypes.DELETE_WPPGROUP_REQUEST, id)
export const deleteWppgroupSuccess = (id: number) =>
  action(WppgroupTypes.DELETE_WPPGROUP_SUCCESS, id)
export const deleteWppgroupFailure = (error: {}) =>
  action(WppgroupTypes.DELETE_WPPGROUP_FAILURE, error)
