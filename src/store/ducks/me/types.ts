import { City } from "../city/types"
import { State } from "../state/types"
import { User } from "../users/types"

/**
 * Action types
 */
export enum MeTypes {
  //Login
  LOGIN_USER_REQUEST = '@me/LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS = '@me/LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE = '@me/LOGIN_USER_FAILURE',
  AUTH_FROM_COOKIE = '@me/AUTH_FROM_COOKIE',

  //Recovery
  RECOVERY_USER_REQUEST = '@me/RECOVERY_USER_REQUEST',
  RECOVERY_USER_SUCCESS = '@me/RECOVERY_USER_SUCCESS',
  RECOVERY_USER_FAILURE = '@me/RECOVERY_USER_FAILURE',

  //Load me
  LOAD_ME_REQUEST = '@me/LOAD_ME_REQUEST',
  LOAD_ME_SUCCESS = '@me/LOAD_ME_SUCCESS',
  LOAD_ME_FAILURE = '@me/LOAD_ME_FAILURE',

  //Create
  CREATE_USER_REQUEST = '@me/CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = '@me/CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = '@me/CREATE_USER_FAILURE',

  //Update
  UPDATE_USER_REQUEST = '@me/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@me/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@me/UPDATE_USER_FAILURE',

  //Change pass
  CHANGEPASS_USER_REQUEST = '@me/CHANGEPASS_USER_REQUEST',
  CHANGEPASS_USER_SUCCESS = '@me/CHANGEPASS_USER_SUCCESS',
  CHANGEPASS_USER_FAILURE = '@me/CHANGEPASS_USER_FAILURE',

  //Delete
  DELETE_USER_REQUEST = '@me/DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = '@me/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = '@me/DELETE_USER_FAILURE',

  //Logout
  LOGOUT_USER = '@me/LOGOUT_USER',
}



export interface Login {
  email: string
  password: string
}

/**
 * State type
 */
export interface MeState {
  readonly me: User
  readonly loading: boolean
  error: boolean //Nao pode ser readonly pq na página de login estou setando error..
  readonly logged: boolean
  readonly message?: string
}
