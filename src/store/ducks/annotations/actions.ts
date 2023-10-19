import {action} from 'typesafe-actions'
import {AnnotationsTypes} from './types'
import {Annotation} from '../annotation/types'

//All
export const loadMyAnnotationsRequest = (user_id: number) =>
  action(AnnotationsTypes.LOAD_MY_ANNOTATIONS_REQUEST, user_id)
export const loadMyAnnotationsSuccess = (data: Annotation) =>
  action(AnnotationsTypes.LOAD_MY_ANNOTATIONS_SUCCESS, data)
export const loadMyAnnotationsFailure = (error: {}) =>
  action(AnnotationsTypes.LOAD_MY_ANNOTATIONS_FAILURE, error)
