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
import ReactTextareaAutosize from 'react-textarea-autosize'

type Props = {
  className: string
  selectedClass: any
  url?: string
}

const AnnotationWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  selectedClass,
  url,
}) => {
  const annotationRedux = useSelector((state: ApplicationState) => state.annotation)
  console.log('AnnotationRedux', annotationRedux)
  // const [validated, setValidated] = useState(false);
  const [annotation, setAnnotation] = useState('')
  const me = useSelector((state: ApplicationState) => state.me)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAnnotationSingleRequest(me.me.id!, Number(selectedClass.id)))
    // setValidated(false) // remove o validador das anotações
  }, [me, selectedClass.id, dispatch])

  console.log('selectedClass.id', selectedClass.id)
  console.log('me.me.id!', me.me.id!)
  console.log('annotationRedux.data', annotationRedux.data ? 'nao' : 'sim')

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
        id: annotationRedux.data?.id,
        message: annotation,
        userId: me.me.id,
        componentId: Number(selectedClass.id),
      }
      console.log('annotationToSave', annotationToSave)

      const isNew: boolean = annotationRedux.data ? false : true
      dispatch(createAnnotationRequest(annotationToSave, isNew))
    }
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column pb-0 pb-lg-0'>
        <div className='text-dark fw-bolder fs-4 mb-5'>Minhas anotações privadas</div>
        <div className='flex-grow-1'>
          <div className='mb-0'>
            <div className='tab-pane active' id='timeline'>
              {/* Post */}
              <div className='post clearfix'>
                {annotationRedux.loading ? (
                  <Loading />
                ) : (
                  // <form noValidate validated={validated} onSubmit={handleSubmit} >
                  <form noValidate onSubmit={handleSubmit}>
                    <ReactTextareaAutosize
                      minRows={2}
                      className='form-control'
                      //rows={10}
                      style={{width: '100%'}}
                      placeholder=''
                      required
                      defaultValue={annotationRedux.data?.message || ''}
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

export {AnnotationWidget}
