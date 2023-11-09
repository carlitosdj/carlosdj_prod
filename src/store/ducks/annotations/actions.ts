import {action} from 'typesafe-actions'
import {AnnotationsTypes} from './types'
import {Annotation} from '../annotation/types'

//All
export const loadMyAnnotationsRequest = (userId: number) =>
  action(AnnotationsTypes.LOAD_MY_ANNOTATIONS_REQUEST, userId)
export const loadMyAnnotationsSuccess = (data: Annotation) =>
  action(AnnotationsTypes.LOAD_MY_ANNOTATIONS_SUCCESS, data)
export const loadMyAnnotationsFailure = (error: {}) =>
  action(AnnotationsTypes.LOAD_MY_ANNOTATIONS_FAILURE, error)
