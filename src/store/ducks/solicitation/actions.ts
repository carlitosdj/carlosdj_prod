import {action} from 'typesafe-actions'
import {SolicitationTypes, Solicitation} from './types'

//Load
export const loadAllSolicitationsRequest = (user_id: number) => action(SolicitationTypes.LOAD_ALLSOLICITATIONS_REQUEST, user_id)
export const loadAllSolicitationsSuccess = (data: Solicitation[]) =>
  action(SolicitationTypes.LOAD_ALLSOLICITATIONS_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadAllSolicitationsFailure = () => action(SolicitationTypes.LOAD_ALLSOLICITATIONS_FAILURE)

//Create
export const createSolicitationRequest = (data: Solicitation) =>
  action(SolicitationTypes.CREATE_SOLICITATION_REQUEST, data)
export const createSolicitationSuccess = (data: Solicitation) =>
  action(SolicitationTypes.CREATE_SOLICITATION_SUCCESS, data)
export const createSolicitationFailure = (error: {}) =>
  action(SolicitationTypes.CREATE_SOLICITATION_FAILURE, error)


//Update
export const updateSolicitationRequest = (supportToUpdate: Solicitation) =>
  action(SolicitationTypes.UPDATE_SOLICITATION_REQUEST, supportToUpdate)
export const updateSolicitationSuccess = (data: Solicitation) =>
  action(SolicitationTypes.UPDATE_SOLICITATION_SUCCESS, data)
export const updateSolicitationFailure = () => action(SolicitationTypes.UPDATE_SOLICITATION_FAILURE)
