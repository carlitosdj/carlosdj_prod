import React, {useState} from 'react'
import {Button, Form, FormControl, InputGroup, Modal} from 'react-bootstrap-v5'
import {Solicitation, Solicitationhistory} from '../../../../store/ducks/solicitation/types'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {useDispatch} from 'react-redux'
import {updateSolicitationRequest} from '../../../../store/ducks/solicitation/actions'
import {PhotoUpload} from './PhotoUpload'
import api from '../../../../services/api'
import Loading from '../../../design/loading'

type Props = {
  data: Solicitation | undefined
  show: boolean
  handleClose: React.Dispatch<React.SetStateAction<void>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<Solicitation | undefined>>
}

const FormReproval: React.FC<Props> = ({data, show, handleClose, message, setMessage, setData}) => {
  const me = useSelector((state: ApplicationState) => state.me)
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const [terms, setTerms] = useState(false)
  const [croppedImage, setCroppedImage] = useState<any>('')
  const [loading, setLoading] = useState(false)

  const handleTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(event.target.checked)
    console.log(event.target.checked)
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    if (terms) {
      setLoading(true)
      setValidated(true)
      changeStatusData(6, 'REPROVADO')

      setMessage('')
      setData({})
      setValidated(false)
    }
  }

  const changeStatusData = (status: number, history: string) => {
    let newSolicitation = data
    newSolicitation!.status = status
    let newHistory: Solicitationhistory

    var dateNow = new Date()

    if (croppedImage) {
      const formdata = new FormData()
      formdata.append('file', croppedImage, 'alp.jpg') //selectedFile.name
      console.log('croppedImage', croppedImage)
      api
        .post('/upload', formdata, {}) //Sobe a terceira imagem
        .then((resA: any) => {
          newHistory = {
            type_history: history,
            created_at: dateNow.getTime() / 1000,
            parentSolicitation: data!.id,
            status: 1,
            //userId: me.me.id!,
            parentUser: {id: me.me.id!},
            message,
            detail: [
              {
                type_detail: 'img',
                value_detail: resA.data.filename,
              },
            ],
          }
          newSolicitation!.history = [newHistory]
          console.log('*********Solic with DATA*********', newSolicitation)
          dispatch(updateSolicitationRequest(newSolicitation!))
          setLoading(false)
          handleClose()
        })
    } else {
      newHistory = {
        type_history: history,
        created_at: dateNow.getTime() / 1000,
        parentSolicitation: data!.id,
        status: 1,
        //userId: me.me.id!,
        parentUser: {id: me.me.id!},
        message,
      }
      newSolicitation!.history = [newHistory]
      console.log('*********Solic with DATA*********', newSolicitation)
      dispatch(updateSolicitationRequest(newSolicitation!))
      setLoading(false)
      handleClose()
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {loading ? 'Aguarde...' : 'Reprovar: ' + data?.parentPatient?.profile?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div>
              <div>Registrando solicitação...</div>
              <Loading />
            </div>
          ) : (
            <>
              <span className='h5'>
                Selecione uma resposta ou insira a resposta completa abaixo
              </span>
              <br />
              <br />
              <Form.Check
                type={'radio'}
                name='group1'
                label={'O paciente não condiz com o projeto.'}
                value={'O paciente não condiz com o projeto.'}
                onChange={(e) => setMessage(e.target.value)}
                id={'1'}
              />
              <br />
              <Form.Check
                type={'radio'}
                name='group1'
                label={'O paciente possui alergia aos medicamentos.'}
                value={'O paciente possui alergia aos medicamentos.'}
                onChange={(e) => setMessage(e.target.value)}
                id={'2'}
              />
              <br />
              <Form.Check
                type={'radio'}
                name='group1'
                label={'O paciente possui alergia ao procedimento.'}
                value={'O paciente possui alergia ao procedimento.'}
                onChange={(e) => setMessage(e.target.value)}
                id={'3'}
              />
              <br />
              <InputGroup>
                <InputGroup.Text>Descreva o motivo</InputGroup.Text>
                <FormControl
                  as='textarea'
                  aria-label='With textarea'
                  rows={10}
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                />
              </InputGroup>
              <br />
              <PhotoUpload
                croppedImage={croppedImage}
                setCroppedImage={setCroppedImage}
                title={'Imagem (opcional)'}
              />
              <br />
              <Form.Group controlId='validationCustomTerms'>
                <Form.Check
                  type='checkbox'
                  required
                  name='terms'
                  label='Confirmar a reprovação dessa solicitação'
                  feedback='Você precisa confirmar a reprovação para prosseguir.'
                  id='Check'
                  onChange={handleTerms}
                />
              </Form.Group>
              <br />
              <Button variant='outline-secondary btn-primary' type='submit' size='sm'>
                Confirmar a Reprovação
              </Button>
              &nbsp;&nbsp;
              <Button
                variant='none'
                onClick={() => {
                  handleClose()
                  setData({})
                }}
                size='sm'
              >
                Cancelar
              </Button>
            </>
          )}
        </Modal.Body>
      </Form>
    </Modal>
  )
}
export {FormReproval}
