import {Dispatch, SetStateAction, useEffect} from 'react'
import Loading from '../../../design/loading'
import ReactTextareaAutosize from 'react-textarea-autosize'
import {useOutsideClick} from './useOutsideClick'
//import onClickOutside from 'react-onclickoutside'

type TextBoxProps = {
  id?: string
  loading: boolean
  handleSubmit: (event: any) => any
  comment?: string
  setComment: Dispatch<SetStateAction<string>>
  parentId?: number
  setShowReply: (event: any) => any
  //setShowUpdate: (event: any) => any
}

const CommentWidgetWrite = ({
  id,
  loading,
  handleSubmit,
  comment,
  setComment,
  setShowReply,
}: TextBoxProps) => {
  //console.log('SHOW', comment)
  const ref = useOutsideClick(() => {
    setTimeout(() => {
      setShowReply(false)
      
    }, 150)
  })

  useEffect(() => {
    console.log('renderizado', id)
  }, [])

  return (
    <div className='mb-0' ref={ref}>
      <div className='tab-pane active' id='timeline'>
        {/* Post */}
        <div className='post clearfix'>
          {/* <form noValidate> */}
          <form noValidate onSubmit={handleSubmit}>
            <ReactTextareaAutosize
              key={id ? id : '-1'}
              minRows={2}
              className='form-control'
              style={{width: '100%'}}
              placeholder=''
              required
              //value={id! + ' ' + comment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name='description'
              autoFocus={id === '-1' ? false : true}
              onFocus={(textarea) => {
                let temp = textarea.target.value
                textarea.target.value = ''
                textarea.target.value = temp

                
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  console.log('blur event')
                }
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

export default CommentWidgetWrite
