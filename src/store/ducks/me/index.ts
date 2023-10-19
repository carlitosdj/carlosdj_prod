import {Reducer} from 'redux'
import {MeState, MeTypes} from './types'
const INITIAL_STATE: MeState = {
  me: {},
  error: false,
  loading: false,
  logged: false,
}

const reducer: Reducer<MeState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Login
    case MeTypes.LOGIN_USER_REQUEST:
      return {...state, loading: true, logged: false, me: {}}
    case MeTypes.LOGIN_USER_SUCCESS:
      return {...state, loading: false, logged: true, me: action.payload.data}
    case MeTypes.LOGIN_USER_FAILURE:
      return {...state, loading: false, logged: false, me: {}, error: true}
    case MeTypes.AUTH_FROM_COOKIE:
      return {...state, loading: false, logged: true, me: action.payload}

    //Logout
    case MeTypes.LOGOUT_USER:
      return {...state, error: false, loading: false, logged: false, me: {}}

    //Load me
    case MeTypes.LOAD_ME_REQUEST:
      return {...state}
    case MeTypes.LOAD_ME_SUCCESS:
      return {...state, loading: false, error: false, logged: false, me: action.payload.data}
    case MeTypes.LOAD_ME_FAILURE:
      return {...state, loading: false, error: true, me: {}}

    //Create
    case MeTypes.CREATE_USER_REQUEST:
      return {...state}
    case MeTypes.CREATE_USER_SUCCESS:
      return {...state, loading: false, error: false, me: action.payload.data}
    case MeTypes.CREATE_USER_FAILURE:
      return {...state, loading: false, error: true, me: {}}

    //Recovery
    case MeTypes.RECOVERY_USER_REQUEST:
      return {...state}
    case MeTypes.RECOVERY_USER_SUCCESS:
      return {...state, message: 'sent', loading: false, error: false, msg: action.payload.data}
    case MeTypes.RECOVERY_USER_FAILURE:
      return {...state, loading: false, error: true, me: {}}

    //Update user
    case MeTypes.UPDATE_USER_REQUEST:
      return {...state}
    case MeTypes.UPDATE_USER_SUCCESS:
      return {...state, message: 'updated', loading: false, error: false, me: action.payload.data}
    case MeTypes.UPDATE_USER_FAILURE:
      return {...state, loading: false, error: true}

    //Update user
    case MeTypes.CHANGEPASS_USER_REQUEST:
      return {...state}
    case MeTypes.CHANGEPASS_USER_SUCCESS:
      return {...state, message: 'changed', loading: false, error: false, me: action.payload.data}
    case MeTypes.CHANGEPASS_USER_FAILURE:
      return {...state, loading: false, error: true}

    //Delete user
    case MeTypes.DELETE_USER_SUCCESS:
      return {...state, loading: false, error: false, me: {}}
    case MeTypes.DELETE_USER_FAILURE:
      return {...state, loading: false, error: true, data: {}}
    default:
      return state
  }
}

export default reducer
