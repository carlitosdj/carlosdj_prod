import {Reducer} from 'redux'
import {UsersState, UsersTypes} from './types'

const INITIAL_STATE: UsersState = {
  data: [],
  error: false,
  loading: false,
  page:0
}

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //All
    case UsersTypes.LOAD_USERS_REQUEST:
      return {...state, loading: true}
    case UsersTypes.LOAD_USERS_SUCCESS:
      return {...state, loading: false, error: false, data: state.data.concat(action.payload.data.data), countTotal: action.payload.data.count }
    case UsersTypes.LOAD_USERS_FAILURE:
      return {...state, loading: false, error: true, data: []}

    //User
    case UsersTypes.LOAD_USER_REQUEST:
      return {...state, loading: true}
    case UsersTypes.LOAD_USER_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case UsersTypes.LOAD_USER_FAILURE:
      return {...state, loading: false, error: true, data: []}

    //Search
    case UsersTypes.SEARCH_USERS_REQUEST:
      return {...state, loading: true}
    case UsersTypes.SEARCH_USERS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case UsersTypes.SEARCH_USERS_FAILURE:
      return {...state, loading: false, error: true, data: []}

    //Create
    case UsersTypes.CREATE_USER_REQUEST:
      return {...state}
    case UsersTypes.CREATE_USER_SUCCESS:
      return {...state, loading: false, error: false, data: state.data.concat(action.payload.data)}
    case UsersTypes.CREATE_USER_FAILURE:
      return {...state, loading: false, error: true, data: []}

    //Update
    case UsersTypes.UPDATE_USER_REQUEST:
      return {...state}
    case UsersTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      }
    case UsersTypes.UPDATE_USER_FAILURE:
      return {...state, loading: false, error: true}

    //Delete
    case UsersTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data),
      } //só uma data: pq excluiu o user "Excluido com sucesso."
    case UsersTypes.DELETE_USER_FAILURE:
      return {...state, loading: false, error: true, data: []}
    default:
      return state
  }
}

export default reducer
