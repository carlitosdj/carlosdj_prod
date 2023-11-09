import {Reducer} from 'redux'
import {ComponentState, ComponentTypes} from './types'

const INITIAL_STATE: ComponentState = {
  data: {},
  modules: [],
  classes: [],
  search: [],
  lastliveclass: {},
  lastclass: {},
  error: false,
  loading: false,
  loadingAulaConcluida: false,
  loadingLastLiveClass: false,
  loadingLastClass: false,
}

const reducer: Reducer<ComponentState> = (state = INITIAL_STATE, action) => {
  // console.log('################################Reducer inside Component: ' + action.type + ':', action)
  switch (action.type) {
    //all users:
    case ComponentTypes.LOAD_COMPONENT_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.LOAD_COMPONENT_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ComponentTypes.LOAD_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //load modules
    case ComponentTypes.LOAD_MODULES_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.LOAD_MODULES_SUCCESS:
      return {...state, loading: false, error: false, modules: action.payload.data}
    case ComponentTypes.LOAD_MODULES_FAILURE:
      return {...state, loading: false, error: action.payload, modules: []}

    case ComponentTypes.LOAD_CLASSES_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.LOAD_CLASSES_SUCCESS:
      return {...state, loading: false, error: false, classes: action.payload.data}
    case ComponentTypes.LOAD_CLASSES_FAILURE:
      return {...state, loading: false, error: action.payload, classes: []}

    case ComponentTypes.LOAD_LASTLIVECLASS_REQUEST:
      return {...state, loadingLastLiveClass: true}
    case ComponentTypes.LOAD_LASTLIVECLASS_SUCCESS:
      return {...state, loadingLastLiveClass: false, error: false, lastliveclass: action.payload.data}
      case ComponentTypes.LOAD_LASTLIVECLASS_FAILURE:
        return {...state, loadingLastLiveClass: false, error: action.payload, lastliveclass: {}}

    case ComponentTypes.LOAD_LASTCLASS_REQUEST:
      return {...state, loadingLastClass: true}
    case ComponentTypes.LOAD_LASTCLASS_SUCCESS:
      return {...state, loadingLastClass: false, error: false, lastclass: action.payload.data}
      case ComponentTypes.LOAD_LASTCLASS_FAILURE:
        return {...state, loadingLastClass: false, error: action.payload, lastclass: {}}
    //Course:
    // case ComponentTypes.LOAD_COURSE_REQUEST:
    //     return { ...state, loading: true, }
    // case ComponentTypes.LOAD_COURSE_SUCCESS:
    //     return { ...state, loading: false, error: false, data: action.payload.data }
    // case ComponentTypes.LOAD_COURSE_FAILURE:
    //     return { ...state, loading: false, error:true, data: {} }

    case ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.LOAD_COMPONENT_BY_DESC_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ComponentTypes.LOAD_COMPONENT_BY_DESC_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //Success children:
    case ComponentTypes.LOAD_COMPONENT_CHILDREN_SUCCESS:
      return {...state, data: {...state.data, children: action.payload.data.data}}
    //Success Extras:
    case ComponentTypes.LOAD_COMPONENT_EXTRAS_SUCCESS:
      return {...state, loading: false, data: {...state.data, extras: action.payload.data.data}}

    //create component inside children:
    case ComponentTypes.CREATE_COMPONENT_REQUEST:
      return {...state}
    case ComponentTypes.CREATE_COMPONENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {...state.data, children: state.data.children?.concat(action.payload.data)},
      }
    case ComponentTypes.CREATE_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    //##update component:
    case ComponentTypes.UPDATE_COMPONENT_REQUEST:
      return {...state}
    case ComponentTypes.UPDATE_COMPONENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          children: state.data.children?.map((child) =>
            child.id === action.payload.data.id ? action.payload.data : child
          ),
        },
      } //update data?
    case ComponentTypes.UPDATE_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //delete user:
    case ComponentTypes.DELETE_COMPONENT_REQUEST:
      return {...state}
    case ComponentTypes.DELETE_COMPONENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          children: state.data.children?.filter((item) => item.id !== action.payload.data),
        },
      }
    case ComponentTypes.DELETE_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    //create extra inside component: & Upload
    case ComponentTypes.UPLOAD_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.CREATE_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.CREATE_EXTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {...state.data, extras: state.data.extras?.concat(action.payload.data)},
      }
    case ComponentTypes.CREATE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload}

    //##update extra:
    case ComponentTypes.UPDATE_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.UPDATE_EXTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          extras: state.data.extras?.map((child) =>
            child.id === action.payload.data.id ? action.payload.data : child
          ),
        },
      } //update data?
    case ComponentTypes.UPDATE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //delete extra:
    case ComponentTypes.DELETE_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.DELETE_EXTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          extras: state.data.extras?.filter((item) => item.id !== action.payload.data),
        },
      }
    case ComponentTypes.DELETE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Aula concluida:
    case ComponentTypes.CREATE_AULACONCLUIDA_REQUEST:
      return {
        ...state,
        loadingAulaConcluida: true,
        loadingAulaConcluidaId: action.payload.componentId,
      }
    case ComponentTypes.CREATE_AULACONCLUIDA_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAulaConcluida: false,
        error: {},
        modules: Object.assign([], state.modules, {
          ...state.modules.map((modulo) => {
            // console.log("Payload", action.payload)
            // console.log("Payload", action.payload.parentId)
            // console.log("Modulo", modulo.id)
            if (modulo.id === action.payload.parentId) {
              console.log("Achei", modulo)
              //modulo.completed = [action.payload.data]
              modulo.children?.map((aula) => {
                if (aula.id === action.payload.data.data.componentId) {
                  // console.log("achei de novo", aula)
                  aula.completed = [action.payload.data.data]
                }
                return aula
              })
            }
            return modulo
          }),
        }),
        classes: Object.assign([], state.classes, {
          ...state.classes.map((aula) => {
            // console.log("Payload", action.payload.data.data.componentId)
            // console.log("Aula", aula.id)
            if (aula.id === action.payload.data.data.componentId) {
              // console.log("Achei")
              aula.completed = [action.payload.data.data]
            }
            return aula
          }),
        }),
      }

    case ComponentTypes.CREATE_AULACONCLUIDA_FAILURE:
      return {...state, loading: false, loadingAulaConcluida: false, error: action.payload}
      
    //create user:
    case ComponentTypes.DELETE_AULACONCLUIDA_REQUEST:
      return {...state, loadingAulaConcluida: true, loadingAulaConcluidaId: action.payload.aula.id}
    case ComponentTypes.DELETE_AULACONCLUIDA_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAulaConcluida: false,
        error: {},
        modules: Object.assign([], state.modules, {
          ...state.modules.map((modulo) => {
            // console.log("Payload", action.payload)
            // console.log("Modulo", modulo.id)
            // console.log("Payload", action.payload.data.data.parentId)
            if (modulo.id === action.payload.aula.parent.id) {
              // console.log("Achei", modulo)
              modulo.children?.map((aula) => {
                // console.log('Aula: ', aula.id)
                // console.log('Aulax: ', action.payload)
                if (aula.id === action.payload.aula.id) {
                  // console.log('achei de novo', aula)
                  aula.completed = []
                }
                return aula
              })
            }
            return modulo
          }),
        }),
        classes: Object.assign([], state.classes, {
          ...state.classes.map((aula) => {
            if (aula.completed?.length) {
              // console.log("aulaaa", aula.completed![0].id)
              // console.log("payload", action.payload.id.data)
              if (aula.completed![0].id === action.payload.id.data) {
                // console.log("Achei!", aula)
                aula.completed = []
              }
            }
            return aula
          }),
        }),
      }
    case ComponentTypes.DELETE_AULACONCLUIDA_FAILURE:
      return {...state, loading: false, loadingAulaConcluida: false, error: action.payload}






    //Rate:
    case ComponentTypes.CREATE_RATE_REQUEST:
      return {
        ...state,
        // loadingAulaConcluida: true,
        // loadingAulaConcluidaId: action.payload.componentId,
      }
    case ComponentTypes.CREATE_RATE_SUCCESS:
      //console.log("BATEUU!!", action.payload.data)
      return {
        ...state,
        loading: false,
        loadingAulaConcluida: false,
        error: {},
        classes: Object.assign([], state.classes, {
          ...state.classes.map((aula) => {
            // console.log("Payload New", action.payload.data.componentId)
            // console.log("Aula", aula.id)
            if (aula.id === action.payload.data.componentId) {
              // console.log("Achei XXXXXX")
              aula.completed = [action.payload.data]
            }
            return aula
          }),
        }),
      }

    case ComponentTypes.CREATE_RATE_FAILURE:
      return {...state, loading: false, loadingAulaConcluida: false, error: action.payload}


    //search
    case ComponentTypes.SEARCH_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.SEARCH_SUCCESS:
      return {...state, loading: false, error: false, search: action.payload.data}
    case ComponentTypes.SEARCH_FAILURE:
      return {...state, loading: false, error: action.payload, search: []}



    default:
      return state
  }
}

export default reducer
