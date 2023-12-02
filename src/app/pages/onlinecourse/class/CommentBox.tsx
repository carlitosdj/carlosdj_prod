import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import {Comment, CommentState} from '../../../../store/ducks/comments/types'
import CommentWidgetWrite from './CommentWidgetWrite'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {
  createCommentWithParentRequest,
  deleteCommentRequest,
  deleteCommentWithParentRequest,
  updateCommentRequest,
  updateCommentWithParentRequest,
} from '../../../../store/ducks/comments/actions'
//import Loading from '../../../design/loading'
import CommentWidgetUpdate from './CommentWidgetUpdate'
import {useOutsideClick} from './useOutsideClick'

const MOMENT = require('moment')

interface Props {
  componentId: number
  loading: boolean
  comment: Comment
  handleSubmit: (event: any) => any
  setComment: Dispatch<SetStateAction<string>>
  // hideAll: boolean
  // setHideAll: (bool: any) => any
}

const CommentBox = ({comment, loading, handleSubmit, setComment, componentId}: Props) => {
  const [showReply, setShowReply] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)

  const [reply, setReply] = useState(comment.parentUser ? comment.parentUser?.name + ', ' : '')
  const [updateComment, setUpdateComment] = useState(comment.comment!)

  // useEffect(() => {
  //   console.log('TESTE', comment)
  //   //setUpdateComment(comment.comment!)
  // }, [comment.id])

  const dispatch = useDispatch()
  const me = useSelector((state: ApplicationState) => state.me)

  const handleSubmitWithParentId = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    if (comment) {
      const commentToSave: Comment = {
        comment: reply,
        userId: me.me.id,
        componentId,
        parentId: !comment.parentId ? Number(comment.id) : Number(comment.parentId),
      }
      console.log('commentToSave-WITHPARENT', commentToSave)
      dispatch(createCommentWithParentRequest(commentToSave))
      setShowReply(false)
      setReply('')
      setShowUpdate(false)
    }
  }

  const handleUpdate = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    if (comment) {
      const commentToSave: Comment = {
        id: comment.id,
        comment: updateComment,
        userId: me.me.id,
        componentId,
        //parentId: Number(comment.id),
      }
      console.log('Update...', commentToSave)
      dispatch(updateCommentRequest(commentToSave))
      //setShowReply(false)
      setShowUpdate(false)
      setShowReply(false)
      //setReply('')
    }
  }

  const handleUpdateWithParentId = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    if (comment) {
      const commentToSave: Comment = {
        id: comment.id,
        comment: updateComment,
        userId: me.me.id,
        componentId,
        parentId: Number(comment.parentId),
      }
      console.log('Update...', commentToSave)
      dispatch(updateCommentWithParentRequest(commentToSave)) //TODO:
      setShowUpdate(false)
      setShowReply(false)
    }
  }

  const deleteComment = (comment: Comment) => {
    dispatch(deleteCommentRequest(comment.id!))
  }

  const deleteCommentWithParent = (comment: Comment) => {
    dispatch(deleteCommentWithParentRequest(comment.id!))
  }

  const nl2br = (str: string, replaceMode: boolean, isXhtml: boolean) => {
    var breakTag = isXhtml ? '<br />' : '<br>'
    var replaceStr = replaceMode ? '$1' + breakTag : '$1' + breakTag + '$2'
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
  }

  return (
    <div>
      <div className='d-flex p-2'>
        <div
          className='cursor-pointer symbol symbol-40px symbol-md-50px show menu-dropdown p-2'
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img
            src={`https://institutodefelicibus.com.br/files/${comment.parentUser?.image}`}
            onError={({currentTarget}) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = 'https://institutodefelicibus.com.br/files/notfound.jpg'
            }}
          />
        </div>
        <div className='w-100'>
          <div>
            <div style={{fontWeight: 'bold'}}>{comment.parentUser?.name}</div>
            <div style={{fontSize: 10}}>
              {MOMENT(
                comment.createdAt === comment.updatedAt ? comment.createdAt : comment.updatedAt
              ).format('DD/MM/YY HH:mm')}{' '}
              {comment.createdAt !== comment.updatedAt && ' - (Editado)'}
            </div>
            {!showUpdate && (
              <>
                {/* <div>ID: {comment.id} </div> */}
                <div dangerouslySetInnerHTML={{__html: nl2br(comment.comment!, true, true)}}></div>
              </>
            )}
          </div>

          <a
            href='#!'
            onClick={() => {
              setShowReply(!showReply)
              setShowUpdate(false)
            }}
            style={{fontWeight: 'bold'}}
          >
            {/* {' Responder '+(showReply?'TRUE':'FALSE')} */}
            {' Responder'}
          </a>

          {comment.parentUser?.id === me.me.id && (
            <a
              href='#!'
              onClick={() => {
                setShowUpdate(!showUpdate)
                setShowReply(false)
              }}
              style={{fontWeight: 'bold'}}
            >
              {' Editar'}
            </a>
          )}

          {comment.parentUser?.id === me.me.id && !comment.parentId && (
            <a
              href='#!'
              onClick={() => {
                if (window.confirm('Deseja realmente excluir?')) deleteComment(comment)
              }}
              style={{fontWeight: 'bold'}}
            >
              {' Excluir'}
            </a>
          )}
          {comment.parentUser?.id === me.me.id && comment.parentId && (
            <a
              href='#!'
              onClick={() => {
                if (window.confirm('Deseja realmente excluir?')) deleteCommentWithParent(comment)
              }}
              style={{fontWeight: 'bold'}}
            >
              {' Excluir'}
            </a>
          )}

          {showReply && (
            <CommentWidgetWrite
              key={comment.id}
              setShowReply={setShowReply}
              //setShowUpdate={setShowUpdate}
              id={comment.id!}
              loading={loading}
              handleSubmit={handleSubmitWithParentId}
              setComment={setReply}
              comment={reply}
            />
          )}

          {showUpdate && !comment.parentId && (
            <CommentWidgetUpdate
              key={comment.id}
              id={comment.id!}
              loading={loading}
              handleSubmit={handleUpdate}
              setComment={setUpdateComment}
              comment={updateComment}
              setShowUpdate={setShowUpdate}
            />
          )}
          {showUpdate && comment.parentId && (
            <CommentWidgetUpdate
              key={comment.id}
              id={comment.id!}
              loading={loading}
              handleSubmit={handleUpdateWithParentId}
              setComment={setUpdateComment}
              comment={updateComment}
              setShowUpdate={setShowUpdate}
            />
          )}
        </div>
      </div>
      {comment.replies?.map((reply) => {
        return (
          <div style={{paddingLeft: 50}}>
            <CommentBox
              comment={reply}
              loading={loading}
              handleSubmit={handleSubmit}
              setComment={setComment}
              componentId={componentId}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CommentBox
