import { City } from "../city/types"
import { State } from "../state/types"
import { User } from "../users/types"


/**
 * Action types
 */
export enum SolicitationTypes {
  //Load all
  LOAD_ALLSOLICITATIONS_REQUEST = '@solicitation/LOAD_ALLSOLICITATIONS_REQUEST',
  LOAD_ALLSOLICITATIONS_SUCCESS = '@solicitation/LOAD_ALLSOLICITATIONS_SUCCESS',
  LOAD_ALLSOLICITATIONS_FAILURE = '@solicitation/LOAD_ALLSOLICITATIONS_FAILURE',

  //Update
  CREATE_SOLICITATION_REQUEST = '@solicitation/CREATE_SOLICITATION_REQUEST',
  CREATE_SOLICITATION_SUCCESS = '@solicitation/CREATE_SOLICITATION_SUCCESS',
  CREATE_SOLICITATION_FAILURE = '@solicitation/CREATE_SOLICITATION_FAILURE',

  //Update
  UPDATE_SOLICITATION_REQUEST = '@solicitation/UPDATE_SOLICITATION_REQUEST',
  UPDATE_SOLICITATION_SUCCESS = '@solicitation/UPDATE_SOLICITATION_SUCCESS',
  UPDATE_SOLICITATION_FAILURE = '@solicitation/UPDATE_SOLICITATION_FAILURE',
}

/**
 * Data types
 */
export interface Solicitation {
  id?: number
  message?: string
  reply?: string
  parentUser?: User
  userId?: number

  parentPatient?: UserPatient
  patient_id?: number

  session?: number

  created_at?: number
  replied_at?: number
  status?: number
  history?: Solicitationhistory[]
  anamnese?: Anamnese[]
  feedback?: Feedback[]
  feedback_patient?: string
}

export interface UserPatient {
  id?: number
  username?: string
  name?: string
  userId?: number
  
  email?: string
  password_hash?: string
  newPassword?: string
  authKey?: string
  confirmed_at?: number
  unconfirmed_email?: string
  blocked_at?: number
  registration_ip?: string
  created_at?: number
  updated_at?: number
  flags?: number
  last_login_at?: number
  //profile:
  profile?: ProfilePatient
  image?: any
  
  
  /*  */
}

export interface ProfilePatient {
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
  image?: string
  cityParent?: City
  stateParent?: State
  bloodtype?: string
  candonate?: string
  profileUserId?: any
  city?: number
  state?: number
  postalCode?: string
  address?: string
  addressNumber?: string
  addressDistrict?: string
}
export interface Solicitationhistory {
  id?: number
  type_history?: string
  message?: string
  created_at?: number
  status?: number

  parentSolicitation?: number
  solicitation_id?: number

  userId?: number
  parentUser?: User

  patient_id?: number
  parentPatient?: UserPatient

  detail?: DetailHistory[]
  
}

export interface Anamnese {
  id_ref?: number,
  answer?: string,
  answers?: string[],
  which?: string,
  question?: string
  wroteanswer?: string
}

export interface Feedback {
  id_ref?: number,
  answer?: string,
  answers?: string[],
  which?: string,
  question?: string
  wroteanswer?: string
}

export interface DetailHistory {
  id_ref?: number,
  type_detail?: string,
  value_detail?: string,
  created_at?: number,
  status?: number,
}

/**
 * State type
 */
export interface SolicitationState {
  readonly all: Solicitation[]
  readonly data: Solicitation[]
  readonly loading: boolean
  readonly error: boolean
}
