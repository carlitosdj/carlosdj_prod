import {Annotation} from '../annotation/types'
/**
 * Action types
 */
export enum AnnotationsTypes {
  //All
  LOAD_MY_ANNOTATIONS_REQUEST = '@annotations/LOAD_MY_ANNOTATIONS_REQUEST',
  LOAD_MY_ANNOTATIONS_SUCCESS = '@annotations/LOAD_MY_ANNOTATIONS_SUCCESS',
  LOAD_MY_ANNOTATIONS_FAILURE = '@annotations/LOAD_MY_ANNOTATIONS_FAILURE',

  DELETE_ANNOTATION_REQUEST = '@annotation/DELETE_ANNOTATION_REQUEST',
  DELETE_ANNOTATION_SUCCESS = '@annotation/DELETE_ANNOTATION_SUCCESS',
  DELETE_ANNOTATION_FAILURE = '@annotation/DELETE_ANNOTATION_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
// imported

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface AnnotationsState {
  readonly data: Annotation[]
  readonly loading: boolean
  readonly error?: Error
}
