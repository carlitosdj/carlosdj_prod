import {Reducer} from 'redux'
import {AnnotationsState, AnnotationsTypes} from './types'

const INITIAL_STATE: AnnotationsState = {
  data: [],
  error: {},
  loading: false,
}

const reducer: Reducer<AnnotationsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //All
    case AnnotationsTypes.LOAD_MY_ANNOTATIONS_REQUEST:
      return {...state, loading: true, data: []}
    case AnnotationsTypes.LOAD_MY_ANNOTATIONS_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case AnnotationsTypes.LOAD_MY_ANNOTATIONS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Delete
    case AnnotationsTypes.DELETE_ANNOTATION_REQUEST:
      return {...state}
    case AnnotationsTypes.DELETE_ANNOTATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        data: state.data?.filter((item) => item.id !== action.payload.data.id),
      }
    case AnnotationsTypes.DELETE_ANNOTATION_FAILURE:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
