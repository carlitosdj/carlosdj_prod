import {action} from 'typesafe-actions'
import {CommentTypes, Comment} from './types'

//Load groups
export const loadCommentsRequest = (id: string) => action(CommentTypes.LOAD_COMMENTS_REQUEST, id)
export const loadCommentsSuccess = (data: Comment[]) =>
  action(CommentTypes.LOAD_COMMENTS_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadCommentsFailure = (err: any[]) => action(CommentTypes.LOAD_COMMENTS_FAILURE, err)

//Create
export const createCommentRequest = (data: Comment) =>
  action(CommentTypes.CREATE_COMMENT_REQUEST, data)
export const createCommentSuccess = (data: Comment) =>
  action(CommentTypes.CREATE_COMMENT_SUCCESS, data)
export const createCommentFailure = (err: any[]) => action(CommentTypes.CREATE_COMMENT_FAILURE, err)

//Create with Parent
export const createCommentWithParentRequest = (data: Comment) =>
  action(CommentTypes.CREATE_COMMENT_WITH_PARENT_REQUEST, data)
export const createCommentWithParentSuccess = (data: Comment) =>
  action(CommentTypes.CREATE_COMMENT_WITH_PARENT_SUCCESS, data)
export const createCommentWithParentFailure = (err: any[]) =>
  action(CommentTypes.CREATE_COMMENT_WITH_PARENT_FAILURE, err)

//Update
export const updateCommentRequest = (supportToUpdate: Comment) =>
  action(CommentTypes.UPDATE_COMMENT_REQUEST, supportToUpdate)
export const updateCommentSuccess = (data: Comment) =>
  action(CommentTypes.UPDATE_COMMENT_SUCCESS, data)
export const updateCommentFailure = (err: any[]) => action(CommentTypes.UPDATE_COMMENT_FAILURE, err)

//Update
export const updateCommentWithParentRequest = (supportToUpdate: Comment) =>
  action(CommentTypes.UPDATE_COMMENT_WITH_PARENT_REQUEST, supportToUpdate)
export const updateCommentWithParentSuccess = (data: Comment) =>
  action(CommentTypes.UPDATE_COMMENT_WITH_PARENT_SUCCESS, data)
export const updateCommentWithParentFailure = (err: any[]) =>
  action(CommentTypes.UPDATE_COMMENT_WITH_PARENT_FAILURE, err)

//Delete
export const deleteCommentRequest = (id: string) => action(CommentTypes.DELETE_COMMENT_REQUEST, id)
export const deleteCommentSuccess = (id: number) => action(CommentTypes.DELETE_COMMENT_SUCCESS, id)
export const deleteCommentFailure = (err: any[]) => action(CommentTypes.DELETE_COMMENT_FAILURE, err)

//Delete
export const deleteCommentWithParentRequest = (id: string) => action(CommentTypes.DELETE_COMMENT_WITH_PARENT_REQUEST, id)
export const deleteCommentWithParentSuccess = (id: number) => action(CommentTypes.DELETE_COMMENT_WITH_PARENT_SUCCESS, id)
export const deleteCommentWithParentFailure = (err: any[]) => action(CommentTypes.DELETE_COMMENT_WITH_PARENT_FAILURE, err)