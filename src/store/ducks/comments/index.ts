import {Reducer} from 'redux'
import {CommentState, CommentTypes} from './types'
const INITIAL_STATE: CommentState = {
  data: [],
  error: false,
  loading: false,
}

const reducer: Reducer<CommentState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Load
    case CommentTypes.LOAD_COMMENTS_REQUEST:
      return {...state, loading: true}
    case CommentTypes.LOAD_COMMENTS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case CommentTypes.LOAD_COMMENTS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case CommentTypes.CREATE_COMMENT_REQUEST:
      return {...state, loading: true}
    case CommentTypes.CREATE_COMMENT_SUCCESS:
      return {...state, loading: false, error: false, data: [action.payload.data, ...state.data]}
    case CommentTypes.CREATE_COMMENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case CommentTypes.CREATE_COMMENT_WITH_PARENT_REQUEST:
      return {...state, loading: true}
    case CommentTypes.CREATE_COMMENT_WITH_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        // data: [...state.data, action.payload.data]
        data: Object.assign([], state.data, {
          ...state.data.map((comment) => {
            //console.log('Comment-Redux', comment)
            console.log('action.payload.data', action.payload.data)
            // console.log("Aula", aula.id)
            if (comment.id === action.payload.data.parentId) {
              console.log('ACHEIIIIIIIIIII*************', comment.id)
              comment.replies?.unshift(action.payload.data)

              //comment.completed = [action.payload.data]
            }
            return comment
          }),
        }),
      }
    case CommentTypes.CREATE_COMMENT_WITH_PARENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Update
    case CommentTypes.UPDATE_COMMENT_REQUEST:
      return {...state}
    case CommentTypes.UPDATE_COMMENT_SUCCESS:
      //console.log('ACTION PAYLOAD VER', action.payload)
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      } //update data?
    case CommentTypes.UPDATE_COMMENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Update
    case CommentTypes.UPDATE_COMMENT_WITH_PARENT_REQUEST:
      return {...state}
    case CommentTypes.UPDATE_COMMENT_WITH_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: Object.assign([], state.data, {
          ...state.data.map((comment) => {
            if (comment.id === action.payload.data.parentId) {
              console.log('ACHEI', comment.id)
              const replies = comment.replies?.map((reply) => {
                if (reply.id === action.payload.data.id) {
                  console.log('ACHEI DE NOVO', reply.id)
                  return {
                    ...action.payload.data,
                    blablabla: 'bleubleu',
                  }
                } else return reply
              })
              return {
                ...comment,
                replies,
              }
            }
            return comment
          }),
        }),
      }
    case CommentTypes.UPDATE_COMMENT_WITH_PARENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Delete
    case CommentTypes.DELETE_COMMENT_REQUEST:
      return {...state}
    case CommentTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data.id),
      }
    case CommentTypes.DELETE_COMMENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Delete
    case CommentTypes.DELETE_COMMENT_WITH_PARENT_REQUEST:
      return {...state}
    case CommentTypes.DELETE_COMMENT_WITH_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        //data: state.data?.filter((item) => item.id !== action.payload.data.id),
        data: Object.assign([], state.data, {
          ...state.data.map((comment) => {
            if (comment.id === action.payload.data.parentId) {
              console.log('ACHEI', comment.id)
              //state.data?.filter((item) => item.id !== action.payload.data.id),
              // const replies = comment.replies?.map((reply) => {
              //   if (reply.id === action.payload.data.id) {
              //     console.log('ACHEI DE NOVO', reply.id)
              //     return {
              //       ...action.payload.data,
              //       blablabla: 'bleubleu',
              //     }
              //   } else return reply
              // })
              return {
                ...comment,
                replies: comment.replies?.filter((item) => item.id !== action.payload.data.id),
              }
            }
            return comment
          }),
        }),
      }
    case CommentTypes.DELETE_COMMENT_WITH_PARENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
