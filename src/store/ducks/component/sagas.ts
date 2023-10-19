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
    const response: Component = yield call(api.get, 'components/' + payload.payload.id + '/' + payload.payload.sort)
    yield put(loadComponentSuccess(response))
  } catch (error) {
    yield put(loadComponentFailure())
  }
}

//Load Modules
export function* loadModules(payload: ReturnType<typeof loadModulesRequest>) {
  try {
    //console.log("loadModules SAGA", [payload.payload.id, payload.payload.user_id, payload.payload.num_turma])
    put(loadModulesRequest(payload.payload.id, payload.payload.user_id, payload.payload.num_turma, payload.payload.orderby))
    const response: Component = yield call(
      api.get,
      'components/modules/' +
        payload.payload.id +
        '/' +
        payload.payload.user_id +
        '/' +
        payload.payload.num_turma +
        '/' + 
        payload.payload.orderby
    )
    yield put(loadModulesSuccess(response))
  } catch (error) {
    yield put(loadModulesFailure())
  }
}

//Load Classes
export function* loadClasses(payload: ReturnType<typeof loadClassesRequest>) {
  //console.log("loadClasses SAGA", payload)
  try {
    put(loadClassesRequest(payload.payload.id, payload.payload.user_id, payload.payload.orderby))
    const response: Component = yield call(
      api.get,
      'components/classes/' + payload.payload.id + '/' + payload.payload.user_id + '/' + payload.payload.orderby
    )
    yield put(loadClassesSuccess(response))
  } catch (error) {
    yield put(loadClassesFailure())
  }
}

export function* loadLastLiveClass(payload: ReturnType<typeof loadLastLiveClassRequest>) {
  //console.log("loadLASTClass SAGA", payload)
  try {
    put(loadLastLiveClassRequest())
    const response: Component = yield call(
      api.get,
      'lastliveclass'
    )
    yield put(loadLastLiveClassSuccess(response))
  } catch (error) {
    yield put(loadLastLiveClassFailure())
  }
}

export function* loadLastClass(payload: ReturnType<typeof loadLastClassRequest>) {
  //console.log("loadLASTClass SAGA", payload)
  try {
    put(loadLastClassRequest(payload.payload.user_id))
    const response: Component = yield call(
      api.get,
      'lastclass/'+payload.payload.user_id //done
    )
    yield put(loadLastClassSuccess(response))
  } catch (error) {
    yield put(loadLastClassFailure())
  }
}

//Load Course:
// export function* loadCourse(payload:ReturnType<typeof loadCourseRequest>) {
//     // console.log("loadComponent SAGA", payload)
//     try {

//         put(loadComponentRequest(payload.payload))
//         const response : Component = yield call(api.get, 'readCourse/'+payload.payload);
//         yield put(loadComponentSuccess(response));

//     } catch (error) {
//         yield put(loadComponentFailure());
//     }
// }

//Load Component by Description
export function* loadComponentByDescription(
  payload: ReturnType<typeof loadComponentByDescriptionRequest>
) {
  try {
    put(loadComponentByDescriptionRequest(payload.payload))
    const response: Component = yield call(api.get, 'componentsbydesc/' + payload.payload)
    yield put(loadComponentByDescriptionSuccess(response))
  } catch (error) {
    yield put(loadComponentByDescriptionFailure())
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
  } catch (error) {
    yield put(updateComponentFailure())
  }
}

//Delete Component
export function* deleteComponent(payload: ReturnType<typeof deleteComponentRequest>) {
  try {
    const number: number = yield call(api.delete, 'components/' + payload.payload)
    yield put(deleteComponentSuccess(number))
  } catch (error) {
    yield put(deleteComponentFailure())
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

// export function* uploadExtra(payload:ReturnType<typeof uploadExtraRequest>) {
//     try {
//         console.log("--------UPLOAD EXTRA------ ################PAYLOOOOOOOOOAD", payload)

//         // put(updateExtraRequest(payload.payload))
//         // const response : Extras = yield call(api.post, 'upload', payload.payload, { });
//         const response : Extras = yield axios.post("http://localhost:8887/upload", payload, { });
//         yield put(createExtraSuccess(response));
//         yield console.log('response', response)
//     } catch (error) {
//         yield put(createExtraFailure(error));
//     }
// }

//Update Extra
export function* updateExtra(payload: ReturnType<typeof updateExtraRequest>) {
  try {
    put(updateExtraRequest(payload.payload))
    const response: Extras = yield call(api.post, 'extras', payload.payload)
    yield put(updateExtraSuccess(response))
  } catch (error) {
    yield put(updateExtraFailure())
  }
}

//Delete Extra
export function* deleteExtra(payload: ReturnType<typeof deleteExtraRequest>) {
  try {
    const number: number = yield call(api.delete, 'extras/' + payload.payload)
    yield put(deleteExtraSuccess(number))
  } catch (error) {
    yield put(deleteExtraFailure())
  }
}

//Concluir Aula Concluida
export function* createAulaConcluida(payload: ReturnType<typeof createAulaConcluidaRequest>) {
  try {
    put(
      createAulaConcluidaRequest(
        payload.payload.id,
        payload.payload.user_id,
        payload.payload.component_id,
        payload.payload.parent_id,
        payload.payload.status
      )
    )
    const response: AulaConcluida = yield call(api.post, 'aulaconcluida', payload.payload)
    //console.log("CREATED AULACONCLUIDA response", response)
    yield put(createAulaConcluidaSuccess(response, payload.payload.parent_id))
  } catch (error: any) {
    yield put(createAulaConcluidaFailure(error.response.data))
  }
}

//Delete Aula Concluida
export function* deleteAulaConcluida(payload: ReturnType<typeof deleteAulaConcluidaRequest>) {
  try {
    const number: number = yield call(api.delete, 'aulaconcluida/' + payload.payload.id)
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
        payload.payload.user_id,
        payload.payload.component_id,
        payload.payload.rate
      )
    )
    const response: AulaConcluida = yield call(api.post, 'aulaconcluida', payload.payload)
    //console.log("CREATED RATE response", response)
    yield put(createRateSuccess(response))
  } catch (error: any) {
    //console.log("error", error.resposne)
    yield put(createRateFailure(error.response))
  }
}


//Load Component
export function* searchComponent(payload: ReturnType<typeof searchRequest>) {
  try {
    put(searchRequest(payload.payload))
    const response: Component = yield call(api.get, 'search/' + payload.payload)
    //console.log("RESPONSE SEARCH", response)
    yield put(searchSuccess(response))
  } catch (error:any) {
    yield put(searchFailure(error.response))
  }
}