import {action} from 'typesafe-actions'
import {CourseTypes, CourseState} from './types'
// import { Component } from '../component/types';

//Load course
export const loadCourseRequest = (id: string) => action(CourseTypes.LOAD_COURSE_REQUEST, id)
export const loadCourseSuccess = (data: CourseState) =>
  action(CourseTypes.LOAD_COURSE_SUCCESS, data)
export const loadCourseFailure = () => action(CourseTypes.LOAD_COURSE_FAILURE)
