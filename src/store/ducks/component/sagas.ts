import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadComponentRequest,
  loadComponentSuccess,
  loadComponentFailure,
  loadComponentByDescriptionRequest,
  loadComponentByDescriptionSuccess,
  loadComponentByDescriptionFailure,
  createComponentRequest,
  createComponentSuccess,
  createComponentFailure,
  updateComponentRequest,
  updateComponentSuccess,
  updateComponentFailure,
  deleteComponentRequest,
  deleteComponentSuccess,
  deleteComponentFailure,
  createExtraRequest,
  createExtraSuccess,
  createExtraFailure,
  updateExtraRequest,
  updateExtraSuccess,
  updateExtraFailure,
  searchRequest,
  searchSuccess,
  searchFailure,

  // uploadExtraRequest,
  // uploadExtraSuccess,
  // uploadExtraFailure,
  deleteExtraRequest,
  deleteExtraSuccess,
  deleteExtraFailure,
  loadModulesRequest,
  loadModulesSuccess,
  loadModulesFailure,
  loadClassesRequest,
  loadClassesSuccess,
  loadClassesFailure,
  createAulaConcluidaFailure,
  createAulaConcluidaRequest,
  createAulaConcluidaSuccess,
  deleteAulaConcluidaFailure,
  deleteAulaConcluidaRequest,
  deleteAulaConcluidaSuccess,
  createRateRequest,
  createRateSuccess,
  createRateFailure,
  loadLastLiveClassRequest,
  loadLastLiveClassSuccess,
  loadLastLiveClassFailure,
  loadLastClassRequest,
  loadLastClassSuccess,
  loadLastClassFailure,
  createTimeWatchedRequest,
  createTimeWatchedSuccess,
  createTimeWatchedFailure,
  loadComponentWithAccessRequest,
  loadComponentWithAccessSuccess,
  loadComponentWithAccessFailure,
  // loadCourseRequest,
} from './actions'

import {Component} from './types'
import {AulaConcluida} from '../aulaconcluida/types'

// import { loadExtrasSuccess } from '../extras/actions'
import {Extras} from '../extras/types'
// import axios from 'axios';

//Load Component
export function* loadComponent(payload: ReturnType<typeof loadComponentRequest>) {
  try {
    put(loadComponentRequest(payload.payload.id, payload.payload.sort))
    const response: Component = yield call(
      api.get,
      'component/id/' + payload.payload.id + '/' + payload.payload.sort
    )
    yield put(loadComponentSuccess(response))
  } catch (error: any) {
    yield put(loadComponentFailure(error.response.data))
  }
}

export function* loadComponentWithAccess(
  payload: ReturnType<typeof loadComponentWithAccessRequest>
) {
  try {
    put(
      loadComponentWithAccessRequest(
        payload.payload.id,
        payload.payload.userId,
        payload.payload.sort
      )
    )
    const response: Component = yield call(
      api.get,
      'component/mycourses/' +
        payload.payload.id +
        '/' +
        payload.payload.userId +
        '/' +
        payload.payload.sort
    )
    yield put(loadComponentWithAccessSuccess(response))
  } catch (error: any) {
    yield put(loadComponentWithAccessFailure(error.response.data))
  }
}

//Load Modules
export function* loadModules(payload: ReturnType<typeof loadModulesRequest>) {
  try {
    //console.log("loadModules SAGA", [payload.payload.id, payload.payload.userId, payload.payload.numTurma])
    put(
      loadModulesRequest(
        payload.payload.id,
        payload.payload.userId,
        payload.payload.numTurma,
        payload.payload.orderby
      )
    )
    const response: Component = yield call(
      api.get,
      'component/modules/' +
        payload.payload.id +
        '/' +
        payload.payload.userId +
        '/' +
        payload.payload.numTurma +
        '/' +
        payload.payload.orderby
    )
    yield put(loadModulesSuccess(response))
  } catch (error: any) {
    yield put(loadModulesFailure(error.response.data))
  }
}

//Load Classes
export function* loadClasses(payload: ReturnType<typeof loadClassesRequest>) {
  //console.log("loadClasses SAGA", payload)
  console.log("*******payload*******",payload)
  try {
    put(loadClassesRequest(payload.payload.id, payload.payload.userId, payload.payload.orderby))
    const response: Component = yield call(
      api.get,
      `component/classes/${payload.payload.id}/${payload.payload.userId.toString()}/${
        payload.payload.orderby ? payload.payload.orderby : 'asc'
      }`
    )

    console.log('RESPONSE', response)
    yield put(loadClassesSuccess(response))
  } catch (error: any) {
    yield put(loadClassesFailure(error.response.data))
  }
}

export function* loadLastLiveClass(payload: ReturnType<typeof loadLastLiveClassRequest>) {
  //console.log("loadLASTClass SAGA", payload)
  try {
    put(loadLastLiveClassRequest())
    const response: Component = yield call(api.get, 'lastliveclass')
    yield put(loadLastLiveClassSuccess(response))
  } catch (error: any) {
    yield put(loadLastLiveClassFailure(error.response.data))
  }
}

export function* loadLastClass(payload: ReturnType<typeof loadLastClassRequest>) {
  //console.log("loadLASTClass SAGA", payload)
  try {
    put(loadLastClassRequest(payload.payload.userId))
    const response: Component = yield call(
      api.get,
      'component/lastclassattended/' + payload.payload.userId //done
    )
    yield put(loadLastClassSuccess(response))
  } catch (error: any) {
    yield put(loadLastClassFailure(error.response.data))
  }
}

//Load Component by Description
export function* loadComponentByDescription(
  payload: ReturnType<typeof loadComponentByDescriptionRequest>
) {
  try {
    put(loadComponentByDescriptionRequest(payload.payload))
    const response: Component = yield call(api.get, 'componentsbydesc/' + payload.payload)
    yield put(loadComponentByDescriptionSuccess(response))
  } catch (error: any) {
    yield put(loadComponentByDescriptionFailure(error.response.data))
  }
}

//Create Component
export function* createComponent(payload: ReturnType<typeof createComponentRequest>) {
  try {
    const response: Component = yield call(api.post, 'components', payload.payload)
    yield put(createComponentSuccess(response))
  } catch (error: any) {
    yield put(createComponentFailure(error.response.data))
  }
}

//Update Component
export function* updateComponent(payload: ReturnType<typeof updateComponentRequest>) {
  try {
    put(updateComponentRequest(payload.payload))
    const response: Component = yield call(api.post, 'components', payload.payload)
    yield put(updateComponentSuccess(response))
  } catch (error: any) {
    yield put(updateComponentFailure(error.response.data))
  }
}

//Delete Component
export function* deleteComponent(payload: ReturnType<typeof deleteComponentRequest>) {
  try {
    const number: number = yield call(api.delete, 'components/' + payload.payload)
    yield put(deleteComponentSuccess(number))
  } catch (error: any) {
    yield put(deleteComponentFailure(error.response.data))
  }
}

////////////////////////////////////////// EXTRAS //////////////////////////////////////////

//Create Extra
export function* createExtra(payload: ReturnType<typeof createExtraRequest>) {
  try {
    const response: Extras = yield call(api.post, 'extras', payload.payload)
    yield put(createExtraSuccess(response))
  } catch (error: any) {
    yield put(createExtraFailure(error.response.data))
  }
}

//Update Extra
export function* updateExtra(payload: ReturnType<typeof updateExtraRequest>) {
  try {
    put(updateExtraRequest(payload.payload))
    const response: Extras = yield call(api.post, 'extras', payload.payload)
    yield put(updateExtraSuccess(response))
  } catch (error: any) {
    yield put(updateExtraFailure(error.response.data))
  }
}

//Delete Extra
export function* deleteExtra(payload: ReturnType<typeof deleteExtraRequest>) {
  try {
    const number: number = yield call(api.delete, 'extras/' + payload.payload)
    yield put(deleteExtraSuccess(number))
  } catch (error: any) {
    yield put(deleteExtraFailure(error.response.data))
  }
}

//Concluir Aula Concluida
export function* createAulaConcluida(payload: ReturnType<typeof createAulaConcluidaRequest>) {
  console.log('Payload', payload.payload)
  try {
    put(
      createAulaConcluidaRequest(
        payload.payload.id,
        payload.payload.userId,
        payload.payload.componentId,
        payload.payload.parentId,
        payload.payload.status
      )
    )
    const {parentId, ...result} = payload.payload

    const response: AulaConcluida = yield payload.payload.id
      ? call(api.patch, 'completed/' + payload.payload.id, result)
      : call(api.post, 'completed', result)

    //console.log("CREATED AULACONCLUIDA response", response)
    yield put(createAulaConcluidaSuccess(response, parentId))
  } catch (error: any) {
    yield put(createAulaConcluidaFailure(error.response.data))
  }
}

//Delete Aula Concluida
export function* deleteAulaConcluida(payload: ReturnType<typeof deleteAulaConcluidaRequest>) {
  try {
    const number: number = yield call(api.delete, 'completed/' + payload.payload.id)
    yield put(deleteAulaConcluidaSuccess(number, payload.payload.aula))
  } catch (error: any) {
    yield put(deleteAulaConcluidaFailure(error.response.data))
  }
}

//Concluir Aula Concluida
export function* createRate(payload: ReturnType<typeof createRateRequest>) {
  try {
    put(
      createRateRequest(
        payload.payload.id,
        payload.payload.userId,
        payload.payload.componentId,
        payload.payload.rate
      )
    )
    //const response: AulaConcluida = yield call(api.post, 'completed', payload.payload)
    //console.log("CREATED RATE response", response)
    const {...result} = payload.payload

    const response: AulaConcluida = yield payload.payload.id
      ? call(api.patch, 'completed/' + payload.payload.id, result)
      : call(api.post, 'completed', {...result, status: 0})

    yield put(createRateSuccess(response))
  } catch (error: any) {
    //console.log("error", error.resposne)
    yield put(createRateFailure(error.response.data))
  }
}

//Concluir Aula Concluida
export function* createTimeWatched(payload: ReturnType<typeof createTimeWatchedRequest>) {
  try {
    put(
      createTimeWatchedRequest(
        payload.payload.id,
        payload.payload.userId,
        payload.payload.componentId,
        payload.payload.timeWatched
      )
    )
    //const response: AulaConcluida = yield call(api.post, 'completed', payload.payload)
    //console.log("CREATED RATE response", response)
    const {...result} = payload.payload

    const response: AulaConcluida = yield payload.payload.id
      ? call(api.patch, 'completed/' + payload.payload.id, result)
      : call(api.post, 'completed', {...result, status: 0})

    yield put(createTimeWatchedSuccess(response))
  } catch (error: any) {
    //console.log("error", error.resposne)
    yield put(createTimeWatchedFailure(error.response.data))
  }
}

//Load Component
export function* searchComponent(payload: ReturnType<typeof searchRequest>) {
  try {
    put(searchRequest(payload.payload))
    const response: Component = yield call(api.get, 'component/search/' + payload.payload)
    //console.log("RESPONSE SEARCH", response)
    yield put(searchSuccess(response))
  } catch (error: any) {
    yield put(searchFailure(error.response.data))
  }
}
