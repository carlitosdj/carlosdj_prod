import {AulaConcluida} from '../aulaconcluida/types'
// import { available } from '../available/types';
import {Extras} from '../extras/types'
/**
 * Action types
 */
export enum ComponentTypes {
  //Load component and children
  LOAD_COMPONENT_REQUEST = '@component/LOAD_COMPONENT_REQUEST',
  LOAD_COMPONENT_SUCCESS = '@component/LOAD_COMPONENT_SUCCESS',
  LOAD_COMPONENT_FAILURE = '@component/LOAD_COMPONENT_FAILURE',

  LOAD_MODULES_REQUEST = '@component/LOAD_MODULES_REQUEST',
  LOAD_MODULES_SUCCESS = '@component/LOAD_MODULES_SUCCESS',
  LOAD_MODULES_FAILURE = '@component/LOAD_MODULES_FAILURE',

  LOAD_CLASSES_REQUEST = '@component/LOAD_CLASSES_REQUEST',
  LOAD_CLASSES_SUCCESS = '@component/LOAD_CLASSES_SUCCESS',
  LOAD_CLASSES_FAILURE = '@component/LOAD_CLASSES_FAILURE',

  LOAD_LASTCLASS_REQUEST = '@component/LOAD_LASTCLASS_REQUEST',
  LOAD_LASTCLASS_SUCCESS = '@component/LOAD_LASTCLASS_SUCCESS',
  LOAD_LASTCLASS_FAILURE = '@component/LOAD_LASTCLASS_FAILURE',

  LOAD_LASTLIVECLASS_REQUEST = '@component/LOAD_LASTLIVECLASS_REQUEST',
  LOAD_LASTLIVECLASS_SUCCESS = '@component/LOAD_LASTLIVECLASS_SUCCESS',
  LOAD_LASTLIVECLASS_FAILURE = '@component/LOAD_LASTLIVECLASS_FAILURE',

  LOAD_COMPONENT_BY_DESC_REQUEST = '@component/LOAD_COMPONENT_BY_DESC_REQUEST',
  LOAD_COMPONENT_BY_DESC_SUCCESS = '@component/LOAD_COMPONENT_BY_DESC_SUCCESS',
  LOAD_COMPONENT_BY_DESC_FAILURE = '@component/LOAD_COMPONENT_BY_DESC_FAILURE',

  LOAD_COMPONENT_CHILDREN_REQUEST = '@component/LOAD_COMPONENT_CHILDREN_REQUEST',
  LOAD_COMPONENT_CHILDREN_SUCCESS = '@component/LOAD_COMPONENT_CHILDREN_SUCCESS',
  LOAD_COMPONENT_CHILDREN_FAILURE = '@component/LOAD_COMPONENT_CHILDREN_FAILURE',

  LOAD_COMPONENT_EXTRAS_REQUEST = '@component/LOAD_COMPONENT_EXTRAS_REQUEST',
  LOAD_COMPONENT_EXTRAS_SUCCESS = '@component/LOAD_COMPONENT_EXTRAS_SUCCESS',
  LOAD_COMPONENT_EXTRAS_FAILURE = '@component/LOAD_COMPONENT_EXTRAS_FAILURE',

  // //Load course
  // LOAD_COURSE_REQUEST = '@component/LOAD_COURSE_REQUEST',
  // LOAD_COURSE_SUCCESS = '@component/LOAD_COURSE_SUCCESS',
  // LOAD_COURSE_FAILURE = '@component/LOAD_COURSE_FAILURE',

  //Create component
  CREATE_COMPONENT_REQUEST = '@component/CREATE_COMPONENT_REQUEST',
  CREATE_COMPONENT_SUCCESS = '@component/CREATE_COMPONENT_SUCCESS',
  CREATE_COMPONENT_FAILURE = '@component/CREATE_COMPONENT_FAILURE',

  //Update component
  UPDATE_COMPONENT_REQUEST = '@component/UPDATE_COMPONENT_REQUEST',
  UPDATE_COMPONENT_SUCCESS = '@component/UPDATE_COMPONENT_SUCCESS',
  UPDATE_COMPONENT_FAILURE = '@component/UPDATE_COMPONENT_FAILURE',

  //Delete component
  DELETE_COMPONENT_REQUEST = '@component/DELETE_COMPONENT_REQUEST',
  DELETE_COMPONENT_SUCCESS = '@component/DELETE_COMPONENT_SUCCESS',
  DELETE_COMPONENT_FAILURE = '@component/DELETE_COMPONENT_FAILURE',

  //Create Extra
  CREATE_EXTRA_REQUEST = '@component/CREATE_EXTRA_REQUEST',
  CREATE_EXTRA_SUCCESS = '@component/CREATE_EXTRA_SUCCESS',
  CREATE_EXTRA_FAILURE = '@component/CREATE_EXTRA_FAILURE',

  //Update Extra
  UPDATE_EXTRA_REQUEST = '@component/UPDATE_EXTRA_REQUEST',
  UPDATE_EXTRA_SUCCESS = '@component/UPDATE_EXTRA_SUCCESS',
  UPDATE_EXTRA_FAILURE = '@component/UPDATE_EXTRA_FAILURE',

  UPLOAD_EXTRA_REQUEST = '@component/UPLOAD_EXTRA_REQUEST',
  UPLOAD_EXTRA_SUCCESS = '@component/UPLOAD_EXTRA_SUCCESS',
  UPLOAD_EXTRA_FAILURE = '@component/UPLOAD_EXTRA_FAILURE',

  //Delete Extra
  DELETE_EXTRA_REQUEST = '@component/DELETE_EXTRA_REQUEST',
  DELETE_EXTRA_SUCCESS = '@component/DELETE_EXTRA_SUCCESS',
  DELETE_EXTRA_FAILURE = '@component/DELETE_EXTRA_FAILURE',

  //Create completed
  CREATE_AULACONCLUIDA_REQUEST = '@component/CREATE_AULACONCLUIDA_REQUEST',
  CREATE_AULACONCLUIDA_SUCCESS = '@component/CREATE_AULACONCLUIDA_SUCCESS',
  CREATE_AULACONCLUIDA_FAILURE = '@component/CREATE_AULACONCLUIDA_FAILURE',

  //Create completed
  UPDATE_AULACONCLUIDA_REQUEST = '@component/UPDATE_AULACONCLUIDA_REQUEST',
  UPDATE_AULACONCLUIDA_SUCCESS = '@component/UPDATE_AULACONCLUIDA_SUCCESS',
  UPDATE_AULACONCLUIDA_FAILURE = '@component/UPDATE_AULACONCLUIDA_FAILURE',

  //Delete completed
  DELETE_AULACONCLUIDA_REQUEST = '@component/DELETE_AULACONCLUIDA_REQUEST',
  DELETE_AULACONCLUIDA_SUCCESS = '@component/DELETE_AULACONCLUIDA_SUCCESS',
  DELETE_AULACONCLUIDA_FAILURE = '@component/DELETE_AULACONCLUIDA_FAILURE',

  //Delete completed
  CREATE_RATE_REQUEST = '@component/CREATE_RATE_REQUEST',
  CREATE_RATE_SUCCESS = '@component/CREATE_RATE_SUCCESS',
  CREATE_RATE_FAILURE = '@component/CREATE_RATE_FAILURE',

  //Delete completed
  SEARCH_REQUEST = '@component/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@component/SEARCH_SUCCESS',
  SEARCH_FAILURE = '@component/SEARCH_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Component {
  id?: number
  componentId?: number
  name?: string
  description?: string
  createdAt?: string
  status?: number | boolean
  order?: string
  children?: Component[] | undefined
  extras?: Extras[]
  parent?: Component | undefined
  completed?: AulaConcluida[]
  available?: any
  orderby?: any
}
/**
 * State type
 */
export interface ComponentState {
  readonly modules: Component[]
  readonly classes: Component[]
  readonly lastliveclass?: Component
  readonly lastclass?: Component
  readonly search: any[]
  readonly data: Component
  readonly loading: boolean
  readonly error: boolean
  readonly loadingAulaConcluida: boolean
  readonly loadingAulaConcluidaId?: number
  readonly loadingLastLiveClass?: boolean
  readonly loadingLastClass?: boolean
}
