/**
 * Action types
 */

import { City } from '../city/types'
import { State } from '../state/types'
export enum UsersTypes {
  //All
  LOAD_USERS_REQUEST = '@users/LOAD_USERS_REQUEST',
  LOAD_USERS_SUCCESS = '@users/LOAD_USERS_SUCCESS',
  LOAD_USERS_FAILURE = '@users/LOAD_USERS_FAILURE',

  //Single user: -> "readOne" / "readByEmail"
  LOAD_USER_REQUEST = '@users/LOAD_USER_REQUEST',
  LOAD_USER_SUCCESS = '@users/LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE = '@users/LOAD_USER_FAILURE',

  //Search
  SEARCH_USERS_REQUEST = '@users/SEARCH_USERS_REQUEST',
  SEARCH_USERS_SUCCESS = '@users/SEARCH_USERS_SUCCESS',
  SEARCH_USERS_FAILURE = '@users/SEARCH_USERS_FAILURE',

  //Create
  CREATE_USER_REQUEST = '@users/CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = '@users/CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = '@users/CREATE_USER_FAILURE',

  //Update
  UPDATE_USER_REQUEST = '@users/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@users/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@users/UPDATE_USER_FAILURE',

  //Delete
  DELETE_USER_REQUEST = '@users/DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = '@users/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = '@users/DELETE_USER_FAILURE',
}

/**
 * Data types
 */
/**
 * Data types
 */
export interface User {
  id?: number
  username?: string
  email?: string
  password_hash?: string
  newPassword?: string
  authKey?: string
  confirmed_at?: number
  unconfirmed_email?: string
  blocked_at?: number
  registration_ip?: string
  createdAt?: number
  updated_at?: number
  flags?: number
  last_login_at?: number
  origin?: string
  numTurma?: number
  
  //profile:
  profile?: Profile
  name?: string
  bio?: string
  timezone?: string
  whatsapp?: string
  cpf?: string
  endereco?: string
  address?: string
  addressNumber?: string
  addressDistrict?: string
  addressCity?: string
  addressState?: string
  addressCountry?: string
  image?: string
  profileUserId?: number
  postalCode?:string

  city?: City
  state?: State

  data?: any

  cityId?: string
  stateId?: string
  roles?: string
  /*  */
}

export interface Profile {
  userId?: number
  name?: string
  public_email?: string
  gravatar_email?: string
  gravatar_id?: string
  location?: string
  website?: string
  bio?: string
  timezone?: string
  whatsapp?: string
  cpf?: string
  endereco?: string
  address?: string
  addressNumber?: string
  addressDistrict?: string
  addressCity?: string
  addressState?: string
  addressCountry?: string
  image?: string
  profileUserId?: number
  postalCode?:string

  cityParent?: City
  stateParent?: State

  cityId: string
  stateId: string
  //occupation?: Occupation[]
}

export interface Occupation {
  id?: number
  name?: string
  createdAt?: number
  status?: number
  userId?: number
  parentUser?: User
}


/**
 * State type
 */
export interface UsersState {
  readonly data: User[]
  readonly loading: boolean
  readonly error: boolean

  page?: number
  countTotal?: number
}
