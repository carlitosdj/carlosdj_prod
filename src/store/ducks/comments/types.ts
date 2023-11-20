import {User} from '../users/types'

/**
 * Action types
 */
export enum CommentTypes {
  //Load
  LOAD_COMMENTS_REQUEST = '@comments/LOAD_COMMENTS_REQUEST',
  LOAD_COMMENTS_SUCCESS = '@comments/LOAD_COMMENTS_SUCCESS',
  LOAD_COMMENTS_FAILURE = '@comments/LOAD_COMMENTS_FAILURE',

  //Create
  CREATE_COMMENT_REQUEST = '@comments/CREATE_COMMENT_REQUEST',
  CREATE_COMMENT_SUCCESS = '@comments/CREATE_COMMENT_SUCCESS',
  CREATE_COMMENT_FAILURE = '@comments/CREATE_COMMENT_FAILURE',

  //Create
  CREATE_COMMENT_WITH_PARENT_REQUEST = '@comments/CREATE_COMMENT_WITH_PARENT_REQUEST',
  CREATE_COMMENT_WITH_PARENT_SUCCESS = '@comments/CREATE_COMMENT_WITH_PARENT_SUCCESS',
  CREATE_COMMENT_WITH_PARENT_FAILURE = '@comments/CREATE_COMMENT_WITH_PARENT_FAILURE',

  //Update
  UPDATE_COMMENT_REQUEST = '@comments/UPDATE_COMMENT_REQUEST',
  UPDATE_COMMENT_SUCCESS = '@comments/UPDATE_COMMENT_SUCCESS',
  UPDATE_COMMENT_FAILURE = '@comments/UPDATE_COMMENT_FAILURE',

  //Update
  UPDATE_COMMENT_WITH_PARENT_REQUEST = '@comments/UPDATE_COMMENT_WITH_PARENT_REQUEST',
  UPDATE_COMMENT_WITH_PARENT_SUCCESS = '@comments/UPDATE_COMMENT_WITH_PARENT_SUCCESS',
  UPDATE_COMMENT_WITH_PARENT_FAILURE = '@comments/UPDATE_COMMENT_WITH_PARENT_FAILURE',

  //Delete
  DELETE_COMMENT_REQUEST = '@comments/DELETE_COMMENT_REQUEST',
  DELETE_COMMENT_SUCCESS = '@comments/DELETE_COMMENT_SUCCESS',
  DELETE_COMMENT_FAILURE = '@comments/DELETE_COMMENT_FAILURE',

  //Delete
  DELETE_COMMENT_WITH_PARENT_REQUEST = '@comments/DELETE_COMMENT_WITH_PARENT_REQUEST',
  DELETE_COMMENT_WITH_PARENT_SUCCESS = '@comments/DELETE_COMMENT_WITH_PARENT_SUCCESS',
  DELETE_COMMENT_WITH_PARENT_FAILURE = '@comments/DELETE_COMMENT_WITH_PARENT_FAILURE',
}

/**
 * Data types
 */
export interface Comment {
  id?: string
  comment?: string
  createdAt?: string
  updatedAt?: string
  status?: number
  userId?: number
  componentId?: number
  parentId?: number
  parentUser?: User
  replies?: Comment[]
}

/**
 * State type
 */
export interface CommentState {
  readonly data: Comment[]
  readonly loading: boolean
  readonly error: boolean
}
