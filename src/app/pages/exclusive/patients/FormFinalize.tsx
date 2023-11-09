import React, {useState} from 'react'
import {Button, Form, FormControl, InputGroup, Modal} from 'react-bootstrap-v5'
import {Solicitation, Solicitationhistory} from '../../../../store/ducks/solicitation/types'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {useDispatch} from 'react-redux'
import {updateSolicitationRequest} from '../../../../store/ducks/solicitation/actions'
import api from '../../../../services/api'
import {PhotoUpload} from './PhotoUpload'
import Loading from '../../../design/loading'

type Props = {
  data: Solicitation | undefined
  show: boolean
  handleClose: React.Dispatch<React.SetStateAction<void>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<Solicitation | undefined>>
}

const FormFinalize: React.FC<Props> = ({data, show, handleClose, message, setMessage, setData}) => {
  const me = useSelector((state: ApplicationState) => state.me)
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const [pa, setPa] = useState('')
  const [sat, setSat] = useState('')
  const [freq, setFreq] = useState('')

  const [preenchedor, setPreenchedor] = useState('')
  const [canula, setCanula] = useState('')
  const [anestesico, setAnestesico] = useState('')

  const [croppedImageBefore, setCroppedImageBefore] = useState<any>('')
  const [croppedImageAfter, setCroppedImageAfter] = useState<any>('')

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
      changeStatusData(5, 'FINALIZADO')
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

    let lastHistory = data?.history![0]

    if (croppedImageBefore && croppedImageAfter) {
      const formdata = new FormData()
      formdata.append('file', croppedImageBefore, 'alp.jpg') //selectedFile.name

      const formdataB = new FormData()
      formdataB.append('file', croppedImageAfter, 'alp.jpg') //selectedFile.name

      api
        .post('/upload', formdata, {}) //Sobe a terceira imagem
        .then((resA: any) => {
          api
            .post('/upload', formdataB, {}) //Sobe a terceira imagem
            .then((resB: any) => {
              lastHistory!.detail = [
                ...lastHistory?.detail!,
                {
                  type_detail: 'PA',
                  value_detail: pa,
                },
                {
                  type_detail: 'SAT',
                  value_detail: sat,
                },
                {
                  type_detail: 'FREQ',
                  value_detail: freq,
                },
                {
                  type_detail: 'Preenchedor',
                  value_detail: preenchedor,
                },
                {
                  type_detail: 'Canula',
                  value_detail: canula,
                },
                {
                  type_detail: 'Anestesico',
                  value_detail: anestesico,
                },
                {
                  type_detail: 'img',
                  value_detail: resA.data.filename,
                },
                {
                  type_detail: 'img',
                  value_detail: resB.data.filename,
                },
              ]

              newHistory = {
                type_history: history,
                created_at: dateNow.getTime() / 1000,
                parentSolicitation: data!.id,
                status: 1,
                //userId: me.me.id!,
                parentUser: {id: me.me.id!},
                message,
                // detail: [
                //     {
                //     type_detail: 'img',
                //     value_detail: resA.data.filename
                //     },
                // ]
              }
              newSolicitation!.history = [lastHistory!, newHistory]
              console.log('*********Solic with DATA*********', newSolicitation)
              dispatch(updateSolicitationRequest(newSolicitation!))
              setLoading(false)
              handleClose()
            })
        })
    } else {
      lastHistory!.detail = [
        ...lastHistory?.detail!,
        {
          type_detail: 'PA',
          value_detail: pa,
        },
        {
          type_detail: 'SAT',
          value_detail: sat,
        },
        {
          type_detail: 'FREQ',
          value_detail: freq,
        },
        {
          type_detail: 'Preenchedor',
          value_detail: preenchedor,
        },
        {
          type_detail: 'Canula',
          value_detail: canula,
        },
        {
          type_detail: 'Anestesico',
          value_detail: anestesico,
        },
      ]

      newHistory = {
        type_history: history,
        created_at: dateNow.getTime() / 1000,
        parentSolicitation: data!.id,
        status: 1,
        //userId: me.me.id!,
        parentUser: {id: me.me.id!},
        message,
      }
      newSolicitation!.history = [lastHistory!, newHistory]
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
            {loading ? 'Aguarde...' : 'Finalizar: ' + data?.parentPatient?.profile?.name}
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
              <h1>Preencha a ficha de evolução</h1>
              <div className='row bg-light-danger pt-5' style={{borderRadius: 5}}>
                <div className='col-md-6'>
                  <h4>Antes do atendimento</h4>
                  {/* <div></div> */}
                  <Form.Label>P.A (Pressão Arterial)</Form.Label>
                  <Form.Control
                    placeholder={''}
                    required
                    value={pa}
                    onChange={(e) => setPa(e.target.value)}
                  />
                  <br />
                  <Form.Label>Saturação (O2)%</Form.Label>
                  <Form.Control
                    placeholder={''}
                    required
                    value={sat}
                    onChange={(e) => setSat(e.target.value)}
                  />
                  <br />
                  <Form.Label>Frequencia cardíaca (bpm)</Form.Label>
                  <Form.Control
                    placeholder={''}
                    required
                    value={freq}
                    onChange={(e) => setFreq(e.target.value)}
                  />
                  <br />
                  <PhotoUpload
                    croppedImage={croppedImageBefore}
                    setCroppedImage={setCroppedImageBefore}
                    title={'Imagem antes'}
                  />
                </div>
                <div className='col-md-6'>
                  <h4>Depois do atendimento</h4>

                  <Form.Label>Preenchedor utilizado</Form.Label>
                  <Form.Control
                    placeholder={''}
                    required
                    value={preenchedor}
                    onChange={(e) => setPreenchedor(e.target.value)}
                  />
                  <br />
                  <Form.Label>Cânula utilizada</Form.Label>
                  <Form.Control
                    placeholder={''}
                    required
                    value={canula}
                    onChange={(e) => setCanula(e.target.value)}
                  />
                  <br />
                  <Form.Label>Anestésico utilizado</Form.Label>
                  <Form.Control
                    placeholder={''}
                    required
                    value={anestesico}
                    onChange={(e) => setAnestesico(e.target.value)}
                  />
                  <br />
                  <PhotoUpload
                    croppedImage={croppedImageAfter}
                    setCroppedImage={setCroppedImageAfter}
                    title={'Imagem depois'}
                  />
                </div>
              </div>
              <br />
              <InputGroup>
                {/* <InputGroup.Prepend> */}
                <InputGroup.Text>
                  Relatório do atendimento
                  <br />
                  do início ao fim
                </InputGroup.Text>
                {/* </InputGroup.Prepend> */}
                <FormControl
                  as='textarea'
                  aria-label='With textarea'
                  rows={10}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </InputGroup>
              <br />
              {/* <PhotoUpload
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    title={'Imagem (opcional)'}
                /> 
                <br /> */}
              <Form.Group controlId='validationCustomTerms'>
                <Form.Check
                  type='checkbox'
                  required
                  name='terms'
                  label='Confirmar a finalização dessa solicitação'
                  feedback='Você precisa confirmar a finalização para prosseguir.'
                  id='Check'
                  onChange={handleTerms}
                />
              </Form.Group>
              <br />
              <Button variant='outline-secondary btn-primary' type='submit' size='sm'>
                Confirmar
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
export {FormFinalize}
