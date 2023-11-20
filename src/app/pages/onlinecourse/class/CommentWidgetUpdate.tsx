import {Dispatch, SetStateAction} from 'react'
import Loading from '../../../design/loading'
import TextareaAutosize from 'react-textarea-autosize'

type TextBoxProps = {
  loading: boolean
  handleSubmit: (event: any) => any
  comment?: string
  setComment: Dispatch<SetStateAction<string>>
  parentId?: number
}

const CommentWidgetUpdate = ({loading, handleSubmit, comment, setComment}: TextBoxProps) => {
  return (
    <div className='mb-0'>
      <div className='tab-pane active' id='timeline'>
        {/* Post */}
        <div className='post clearfix'>
          <form noValidate onSubmit={handleSubmit}>
            <TextareaAutosize
              minRows={2}
              className='form-control'
              //rows={2}
              style={{width: '100%'}}
              placeholder=''
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name='description'
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
