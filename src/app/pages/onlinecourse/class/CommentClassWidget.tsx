/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {Annotation} from '../../../../store/ducks/annotation/types'
import Loading from '../../../design/loading'
import {
  createAnnotationRequest,
  loadAnnotationSingleRequest,
} from '../../../../store/ducks/annotation/actions'

type Props = {
  className: string
  selectedClass: any
  url?: string
}

const CommentClassWidget: React.FC<React.PropsWithChildren<Props>> = ({className, selectedClass, url}) => {
  const annotationFromDb = useSelector((state: ApplicationState) => state.annotation)

  // const [validated, setValidated] = useState(false);
  const [annotation, setAnnotation] = useState('')
  const me = useSelector((state: ApplicationState) => state.me)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAnnotationSingleRequest(me.me.id!, Number(selectedClass.id)))
    // setValidated(false) // remove o validador das anotações
  }, [me, selectedClass.id, dispatch])

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    // setValidated(true);
    // console.log("CLIKED")
    if (annotation) {
      //&& terms === true
      const annotationToSave: Annotation = {
        id: annotationFromDb.data?.id,
        message: annotation,
        parentUser: me.me.id,
        parentComponent: Number(selectedClass.id),
      }
      dispatch(createAnnotationRequest(annotationToSave))
    }
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
        <div className='text-dark fw-bolder fs-4 mb-5'>Minhas anotações</div>
        <div className='flex-grow-1'>
          <div className='mb-6'>
            <div className='tab-pane active' id='timeline'>
              {/* Post */}
              <div className='post clearfix'>
                {annotationFromDb.loading ? (
                  <Loading />
                ) : (
                  // <form noValidate validated={validated} onSubmit={handleSubmit} >
                  <form noValidate onSubmit={handleSubmit}>
                    <textarea
                      className='form-control'
                      rows={10}
                      style={{width: '100%'}}
                      placeholder=''
                      required
                      defaultValue={annotationFromDb.data?.message || ''}
                      onChange={(e) => setAnnotation(e.target.value)}
                      name='description'
                    />
                    {/* <Form.Control.Feedback type="invalid">
                            Por favor digite uma anotação para salvar
                        </Form.Control.Feedback> */}

                    <button
                      type='submit'
                      className='float-right btn-block btn btn-light-primary mt-2'
                    >
                      Salvar
                    </button>
                  </form>
                )}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {CommentClassWidget}
