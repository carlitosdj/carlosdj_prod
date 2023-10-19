import {Reducer} from 'redux'
import {CourseState, CourseTypes} from './types'

const INITIAL_STATE: CourseState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<CourseState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Load
    case CourseTypes.LOAD_COURSE_REQUEST:
      return {...state, loading: true}
    case CourseTypes.LOAD_COURSE_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case CourseTypes.LOAD_COURSE_FAILURE:
      return {...state, loading: false, error: true, data: []}

    default:
      return state
  }
}

export default reducer
