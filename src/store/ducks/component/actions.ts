import {action} from 'typesafe-actions'
import {ComponentTypes} from './types'
import {AulaConcluidaTypes, AulaConcluida} from '../aulaconcluida/types'
import {Component} from './types'
import {Extras} from '../extras/types'

//Load
export const loadComponentRequest = (id: string, sort: string) =>
  action(ComponentTypes.LOAD_COMPONENT_REQUEST, {id, sort})
export const loadComponentSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_SUCCESS, data)
export const loadComponentFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_COMPONENT_FAILURE, err)

//Load Modules
export const loadModulesRequest = (
  id: string,
  userId: number,
  num_turma: number,
  orderby: string
) => action(ComponentTypes.LOAD_MODULES_REQUEST, {id, userId, num_turma, orderby})
export const loadModulesSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_MODULES_SUCCESS, data)
export const loadModulesFailure = (err: any[]) => action(ComponentTypes.LOAD_MODULES_FAILURE, err)

//Load Classes
export const loadClassesRequest = (id: string, userId: number, orderby: string) =>
  action(ComponentTypes.LOAD_CLASSES_REQUEST, {id, userId, orderby})
export const loadClassesSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_CLASSES_SUCCESS, data)
export const loadClassesFailure = (err: any[]) => action(ComponentTypes.LOAD_CLASSES_FAILURE, err)

//Load Last Live Class
export const loadLastLiveClassRequest = () => action(ComponentTypes.LOAD_LASTLIVECLASS_REQUEST)
export const loadLastLiveClassSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_LASTLIVECLASS_SUCCESS, data)
export const loadLastLiveClassFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_LASTLIVECLASS_FAILURE, err)

//Load Last Class
export const loadLastClassRequest = (userId: number) =>
  action(ComponentTypes.LOAD_LASTCLASS_REQUEST, {userId})
export const loadLastClassSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_LASTCLASS_SUCCESS, data)
export const loadLastClassFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_LASTCLASS_FAILURE, err)

//Load Component by Description
export const loadComponentByDescriptionRequest = (id: string) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST, id)
export const loadComponentByDescriptionSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_SUCCESS, data)
export const loadComponentByDescriptionFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_FAILURE, err)

//Create Component
export const createComponentRequest = (newComponent: Component) =>
  action(ComponentTypes.CREATE_COMPONENT_REQUEST, newComponent)
export const createComponentSuccess = (data: Component) =>
  action(ComponentTypes.CREATE_COMPONENT_SUCCESS, data)
export const createComponentFailure = (err: any[]) =>
  action(ComponentTypes.CREATE_COMPONENT_FAILURE, err)

//Update Component
export const updateComponentRequest = (componentToUpdate: Component) =>
  action(ComponentTypes.UPDATE_COMPONENT_REQUEST, componentToUpdate)
export const updateComponentSuccess = (data: Component) =>
  action(ComponentTypes.UPDATE_COMPONENT_SUCCESS, data)
export const updateComponentFailure = (err: any[]) =>
  action(ComponentTypes.UPDATE_COMPONENT_FAILURE, err)

//Delete Component
export const deleteComponentRequest = (id: number) =>
  action(ComponentTypes.DELETE_COMPONENT_REQUEST, id)
export const deleteComponentSuccess = (id: number) =>
  action(ComponentTypes.DELETE_COMPONENT_SUCCESS, id)
export const deleteComponentFailure = (err: any[]) =>
  action(ComponentTypes.DELETE_COMPONENT_FAILURE, err)

//Create Extra
export const createExtraRequest = (newExtra: Extras) =>
  action(ComponentTypes.CREATE_EXTRA_REQUEST, newExtra)
export const createExtraSuccess = (data: Extras) =>
  action(ComponentTypes.CREATE_EXTRA_SUCCESS, data)
export const createExtraFailure = (err: any[]) => action(ComponentTypes.CREATE_EXTRA_FAILURE, err)

export const uploadExtraRequest = (newExtra: Extras, image: FormData) =>
  action(ComponentTypes.UPLOAD_EXTRA_REQUEST, newExtra, image)
// export const uploadExtraSuccess = (data: Extras) => action(ComponentTypes.UPLOAD_EXTRA_SUCCESS, data)
// export const uploadExtraFailure = (err: any[]) => action(ComponentTypes.UPLOAD_EXTRA_FAILURE, err)

//Update Extra
export const updateExtraRequest = (extraToUpdate: Component) =>
  action(ComponentTypes.UPDATE_EXTRA_REQUEST, extraToUpdate)
export const updateExtraSuccess = (data: Extras) =>
  action(ComponentTypes.UPDATE_EXTRA_SUCCESS, data)
export const updateExtraFailure = (err: any[]) => action(ComponentTypes.UPDATE_EXTRA_FAILURE, err)

//Delete Extra
export const deleteExtraRequest = (id: number) => action(ComponentTypes.DELETE_EXTRA_REQUEST, id)
export const deleteExtraSuccess = (id: number) => action(ComponentTypes.DELETE_EXTRA_SUCCESS, id)
export const deleteExtraFailure = (err: any[]) => action(ComponentTypes.DELETE_EXTRA_FAILURE, err)

//Single Aula Concluida
export const createAulaConcluidaRequest = (
  id: number,
  userId: number,
  componentId: number,
  parentId: number,
  status: number
) =>
  action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_REQUEST, {
    id,
    userId,
    componentId,
    parentId,
    status,
  })
export const createAulaConcluidaSuccess = (data: AulaConcluida, parentId: number) =>
  action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_SUCCESS, {data, parentId})
export const createAulaConcluidaFailure = (err: any[]) =>
  action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_FAILURE, err)

//Create Aula Concluida
export const deleteAulaConcluidaRequest = (id: number, aula: Component) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_REQUEST, {id, aula})
export const deleteAulaConcluidaSuccess = (id: number, aula: Component) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_SUCCESS, {id, aula})
export const deleteAulaConcluidaFailure = (err: any[]) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_FAILURE, err)

//Single Aula Concluida
export const createRateRequest = (
  id: number,
  userId: number,
  componentId: number,
  rate: number
) => action(ComponentTypes.CREATE_RATE_REQUEST, {id, userId, componentId, rate})
export const createRateSuccess = (data: AulaConcluida) =>
  action(ComponentTypes.CREATE_RATE_SUCCESS, data)
export const createRateFailure = (err: any[]) => action(ComponentTypes.CREATE_RATE_FAILURE, err)


//Single Aula Concluida
export const createTimeWatchedRequest = (
  id: number,
  userId: number,
  componentId: number,
  timeWatched: number
) => action(ComponentTypes.CREATE_TIMEWATCHED_REQUEST, {id, userId, componentId, timeWatched})
export const createTimeWatchedSuccess = (data: AulaConcluida) =>
  action(ComponentTypes.CREATE_TIMEWATCHED_SUCCESS, data)
export const createTimeWatchedFailure = (err: any[]) => action(ComponentTypes.CREATE_TIMEWATCHED_FAILURE, err)

//Search
export const searchRequest = (search: string) => action(ComponentTypes.SEARCH_REQUEST, search)
export const searchSuccess = (data: Component) => action(ComponentTypes.SEARCH_SUCCESS, data)
export const searchFailure = (err: any[]) => action(ComponentTypes.SEARCH_FAILURE, err)
