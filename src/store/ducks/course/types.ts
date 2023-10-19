import {Component} from '../component/types'
/**
 * Action types
 */
export enum CourseTypes {
  //Load
  LOAD_COURSE_REQUEST = '@component/LOAD_COURSE_REQUEST',
  LOAD_COURSE_SUCCESS = '@component/LOAD_COURSE_SUCCESS',
  LOAD_COURSE_FAILURE = '@component/LOAD_COURSE_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me

/**
 * State type
 */
export interface CourseState {
  readonly data: Component[]
  readonly loading: boolean
  readonly error: boolean
}
