import {action} from 'typesafe-actions'
import {AnnotationTypes, Annotation} from './types'

//Single
export const loadAnnotationSingleRequest = (userId: number, componentId: number) =>
  action(AnnotationTypes.LOAD_ANNOTATION_SINGLE_REQUEST, {userId, componentId})
export const loadAnnotationSingleSuccess = (data: Annotation) =>
  action(AnnotationTypes.LOAD_ANNOTATION_SINGLE_SUCCESS, data)
export const loadAnnotationSingleFailure = (error: {}) =>
  action(AnnotationTypes.LOAD_ANNOTATION_SINGLE_FAILURE, error)

//Create
export const createAnnotationRequest = (annotation: Annotation, isNew: boolean) =>
  action(AnnotationTypes.CREATE_ANNOTATION_REQUEST, {annotation, isNew})
export const createAnnotationSuccess = (data: Annotation) =>
  action(AnnotationTypes.CREATE_ANNOTATION_SUCCESS, data)
export const createAnnotationFailure = (error: {}) =>
  action(AnnotationTypes.CREATE_ANNOTATION_FAILURE, error)


