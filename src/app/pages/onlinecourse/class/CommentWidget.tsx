/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {Annotation} from '../../../../store/ducks/annotation/types'
import Loading from '../../../design/loading'
import {
  createAnnotationRequest,
  loadAnnotationSingleRequest,
} from '../../../../store/ducks/annotation/actions'
import {createCommentRequest, loadCommentsRequest} from '../../../../store/ducks/comments/actions'
import CommentBox from './CommentBox'
import {Comment, CommentState} from '../../../../store/ducks/comments/types'
import CommentWidgetWrite from './CommentWidgetWrite'

type Props = {
  className: string
  selectedClass: any
  url?: string
}

const CommentWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  selectedClass,
  url,
}) => {
  const comments = useSelector((state: ApplicationState) => state.comments)
  // console.log('commentsRedux', comments)
  const me = useSelector((state: ApplicationState) => state.me)
  const [comment, setComment] = useState('')
  //const [hideAll, setHideAll] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('USEEFFECT CALLED')
    dispatch(loadCommentsRequest(selectedClass.id))
  }, [me, selectedClass.id, dispatch])

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    if (comment) {
      const commentToSave: Comment = {
        comment,
        userId: me.me.id,
        componentId: Number(selectedClass.id),
      }
      console.log('commentToSave', commentToSave)
      dispatch(createCommentRequest(commentToSave))
      setComment('')
    }
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column pb-0 pb-lg-0'>
        <div className='text-dark fw-bolder fs-4 mb-5'>Comentários públicos</div>
        <div className='flex-grow-1'>
          <CommentWidgetWrite
            setShowReply={console.log}
            //setShowUpdate={console.log}
            id={'-1'}
            loading={comments.loading}
            handleSubmit={handleSubmit}
            setComment={setComment}
            comment={comment}
          />

          <div className=''>
            {comments.data.map((comment) => {
              return (
                <CommentBox
                  // setHideAll={setHideAll}
                  // hideAll={hideAll}
                  key={comment.id}
                  componentId={selectedClass.id}
                  comment={comment}
                  loading={comments.loading}
                  handleSubmit={handleSubmit}
                  setComment={setComment}
                />
              )
            })}
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {CommentWidget}
