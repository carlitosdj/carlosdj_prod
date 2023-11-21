import {Dispatch, SetStateAction} from 'react'
import Loading from '../../../design/loading'
import TextareaAutosize from 'react-textarea-autosize'
import {useOutsideClick} from './useOutsideClick'

type TextBoxProps = {
  id: string
  loading: boolean
  handleSubmit: (event: any) => any
  comment?: string
  setComment: Dispatch<SetStateAction<string>>
  parentId?: number
  setShowUpdate: (event: any) => any
}

const CommentWidgetUpdate = ({
  id,
  loading,
  handleSubmit,
  comment,
  setComment,
  setShowUpdate,
}: TextBoxProps) => {
  const ref = useOutsideClick(() => {
    setTimeout(() => {
      setShowUpdate(false)
    }, 150)
  })

  return (
    <div className='mb-0' ref={ref}>
      <div className='tab-pane active' id='timeline'>
        {/* Post */}
        <div className='post clearfix'>
          <form noValidate onSubmit={handleSubmit}>
            <TextareaAutosize
              key={id ? id : '-1'}
              minRows={2}
              className='form-control'
              //rows={2}
              style={{width: '100%'}}
              placeholder=''
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name='description'
              autoFocus
              onFocus={(textarea) => {
                let temp = textarea.target.value
                textarea.target.value = ''
                textarea.target.value = temp
              }}
            />

            <button type='submit' className='float-right btn-block btn btn-light-primary mt-2'>
              Salvar
            </button>
            {loading && <Loading />}
          </form>
        </div>
        <br />
      </div>
    </div>
  )
}

export default CommentWidgetUpdate
