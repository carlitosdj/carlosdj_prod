import {Reducer} from 'redux'
import {SolicitationState, SolicitationTypes} from './types'
const INITIAL_STATE: SolicitationState = {
  all: [],
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<SolicitationState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Load
    case SolicitationTypes.LOAD_ALLSOLICITATIONS_REQUEST:
      return {...state, loading: true}
    case SolicitationTypes.LOAD_ALLSOLICITATIONS_SUCCESS:
      return {...state, loading: false, error: false, all: action.payload.data}
    case SolicitationTypes.LOAD_ALLSOLICITATIONS_FAILURE:
      return {...state, loading: false, error: true, all: []}

    //Create
    case SolicitationTypes.CREATE_SOLICITATION_REQUEST:
      return {...state, loading: true}
    case SolicitationTypes.CREATE_SOLICITATION_SUCCESS:
      return {...state, loading: false, error: false, all: state.data.concat(action.payload.data)}
    case SolicitationTypes.CREATE_SOLICITATION_FAILURE:
      return {...state, loading: false, error: true, all: []}

    //Update
    case SolicitationTypes.UPDATE_SOLICITATION_REQUEST:
      return {
        ...state, 
        //loading: true
      }
    case SolicitationTypes.UPDATE_SOLICITATION_SUCCESS:
      //console.log('ACTION PAYLOAD VER', action.payload)
      return {
        ...state,
        loading: false,
        error: false,
        all: state.all?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      } //update data?
    case SolicitationTypes.UPDATE_SOLICITATION_FAILURE:
      return {...state, loading: false, error: true}

    default:
      return state
  }
}

export default reducer
