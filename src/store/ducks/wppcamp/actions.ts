import {action} from 'typesafe-actions'
import {WppcampTypes, Wppcamp} from './types'

//Load
export const loadAllcampRequest = () => action(WppcampTypes.LOAD_ALLCAMP_REQUEST)
export const loadAllcampSuccess = (data: Wppcamp[]) =>
  action(WppcampTypes.LOAD_ALLCAMP_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadAllcampFailure = () => action(WppcampTypes.LOAD_ALLCAMP_FAILURE)

//Load single
export const loadCampRequest = (slug: string) => action(WppcampTypes.LOAD_CAMP_REQUEST, slug)
export const loadCampSuccess = (camp: Wppcamp) => action(WppcampTypes.LOAD_CAMP_SUCCESS, camp) //payload dps de LOAD_REQUEST
export const loadCampFailure = () => action(WppcampTypes.LOAD_CAMP_FAILURE)

//Create
export const createCampRequest = (data: Wppcamp) => action(WppcampTypes.CREATE_CAMP_REQUEST, data)
export const createCampSuccess = (data: Wppcamp) => action(WppcampTypes.CREATE_CAMP_SUCCESS, data)
export const createCampFailure = (error: {}) => action(WppcampTypes.CREATE_CAMP_FAILURE, error)

//Update
export const updateCampRequest = (supportToUpdate: Wppcamp) =>
  action(WppcampTypes.UPDATE_CAMP_REQUEST, supportToUpdate)
export const updateCampSuccess = (data: Wppcamp) => action(WppcampTypes.UPDATE_CAMP_SUCCESS, data)
export const updateCampFailure = () => action(WppcampTypes.UPDATE_CAMP_FAILURE)

//Delete
export const deleteCampRequest = (id: number) => action(WppcampTypes.DELETE_CAMP_REQUEST, id)
export const deleteCampSuccess = (id: number) => action(WppcampTypes.DELETE_CAMP_SUCCESS, id)
export const deleteCampFailure = (error: {}) => action(WppcampTypes.DELETE_CAMP_FAILURE, error)

//Load available
export const loadWppgroupavailableRequest = (slug: string) =>
  action(WppcampTypes.LOAD_WPPGROUPAVAILABLE_REQUEST, slug)
export const loadWppgroupavailableSuccess = (camp: Wppcamp) =>
  action(WppcampTypes.LOAD_WPPGROUPAVAILABLE_SUCCESS, camp) //payload dps de LOAD_REQUEST
export const loadWppgroupavailableFailure = () =>
  action(WppcampTypes.LOAD_WPPGROUPAVAILABLE_FAILURE)
