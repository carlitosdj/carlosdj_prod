import React, {useState, useEffect} from 'react'
import {Button, Form, FormControl, InputGroup, Modal} from 'react-bootstrap-v5'
import {
  DetailHistory,
  Solicitation,
  Solicitationhistory,
} from '../../../../store/ducks/solicitation/types'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {useDispatch} from 'react-redux'
import {updateSolicitationRequest} from '../../../../store/ducks/solicitation/actions'
import formSchedule from './details/formSchedule'
import _ from 'lodash'
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

const FormNewSection: React.FC<Props> = ({
  data,
  show,
  handleClose,
  message,
  setMessage,
  setData,
}) => {
  const me = useSelector((state: ApplicationState) => state.me)
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const [terms, setTerms] = useState(false)
  const [croppedImageBefore, setCroppedImageBefore] = useState<any>('')
  const [croppedImageAfter, setCroppedImageAfter] = useState<any>('')

  const [loading, setLoading] = useState(false)

  const [detail, setDetail] = useState<DetailHistory[]>(formSchedule)

  const [professional, setProfessional] = useState<number>(1) //Troca entre Profissional da Saude e Injetor
  const [fichaEvolucao, setFichaEvolucao] = useState("")

  const [pa, setPa] = useState('')
  const [sat, setSat] = useState('')
  const [freq, setFreq] = useState('')

  const [preenchedor, setPreenchedor] = useState('')
  const [canula, setCanula] = useState('')
  const [anestesico, setAnestesico] = useState('')

  useEffect(() => {
    console.log('Limpando!')
    setDetail([])
    console.log('Limpei!')
    setDetail(formSchedule)
    console.log('AQUIIIIIIII!!!')
    setMessage('')
    setFichaEvolucao("")
    setProfessional(0)

  }, [])

  const handleTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(event.target.checked)
    console.log(event.target.checked)
  }

  const updateAnswer = (question: any, value_detail?: any) => {
    console.log('value', value_detail)
    setDetail((prev) => {
      return prev.map((item) =>
        item.id_ref === question.id_ref
          ? //return new
            {
              ...item,
              value_detail: value_detail ? value_detail : '', //Fiz isso para nao aparecer undefined no wroteanswer
            }
          : //Se não encontrou, volta o valor antigo
            item
      )
    })
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
      changeStatusData(4, 'EM ATENDIMENTO')
      setMessage('')
      setData({})

      setValidated(false)
    }
  }

  //console.log("HISTORIES", data?.history![0].detail)
  const changeStatusData = (status: number, type_history: string) => {
    let newSolicitation = data
    newSolicitation!.status = status
    newSolicitation!.session = newSolicitation!.session! + 1

    //console.log("HISTORIES", data?.history![0])

    let lastHistory = data?.history![0]

    let newHistory: Solicitationhistory

    var dateNow = new Date()

    if (croppedImageBefore && croppedImageBefore) {
      const formdata = new FormData()
      formdata.append('file', croppedImageBefore, 'alp.jpg') //selectedFile.name

      const formdataB = new FormData()
      formdataB.append('file', croppedImageAfter, 'alp.jpg') //selectedFile.name
      //console.log('croppedImage', croppedImageBefore)

      api
        .post('/upload', formdata, {}) //Sobe a terceira imagem
        .then((resA: any) => {
          api
            .post('/upload', formdataB, {}) //Sobe a terceira imagem
            .then((resB: any) => {
              if(professional === 1) { //profissional Injetor:
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
              }
              if (professional === 2) {
                lastHistory!.detail = [
                  ...lastHistory?.detail!,
                  {
                    type_detail: 'Evolucao',
                    value_detail: fichaEvolucao,
                  },
                ]
              }

              newHistory = {
                type_history,
                created_at: dateNow.getTime() / 1000,
                parentSolicitation: data!.id,
                status: 1,
                //userId: me.me.id!,
                parentUser: {id: me.me.id!},
                message,
                detail: [...detail],
              }
              newSolicitation!.history = [lastHistory!, newHistory]
              console.log('*********Solic with DATA*********', newSolicitation)
              dispatch(updateSolicitationRequest(newSolicitation!))
              setLoading(false)
              handleClose()
            })
        })
    } else {
      newHistory = {
        type_history,
        created_at: dateNow.getTime() / 1000,
        parentSolicitation: data!.id,
        status: 1,
        //userId: me.me.id!,
        parentUser: {id: me.me.id!},
        message,
        detail: [...detail],
      }
      if(professional === 1) {
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
      }
      if (professional === 2) {
        lastHistory!.detail = [
          ...lastHistory?.detail!,
          {
            type_detail: 'Evolucao',
            value_detail: fichaEvolucao,
          },
        ]
      }
      newSolicitation!.history = [lastHistory!, newHistory]
      console.log('*********Solic with DATA*********', newSolicitation)
      dispatch(updateSolicitationRequest(newSolicitation!))
      setLoading(false)
      handleClose()
    }
  }
  console.log('Detail', detail)
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {loading ? 'Aguarde...' : 'Agendar: ' + data?.parentPatient?.profile?.name}
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
              <Form.Check
                type={'radio'}
                name='group1'
                label={'Profissional da Saúde Injetor'}
                value={'1'}
                onChange={(e) => setProfessional(1)}
                id={'1'}
                checked={1 === professional}
                
              />
              <br />
              <Form.Check
                type={'radio'}
                name='group1'
                label={'Profissional da Saúde Não Injetor'}
                value={'2'}
                onChange={(e) => setProfessional(2)}
                id={'2'}
                checked={2 === professional}
              />
              <br/>
              {professional === 1 &&  
              <div className='row bg-light-info pt-5 pb-5' style={{borderRadius: 5}}>
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
              }
              {professional === 2 &&
              <div className='row bg-light-info pt-5 pb-5' style={{borderRadius: 5}}>
                <div className='col-md-12'>
                  <h4>Antes do atendimento</h4>
                  {/* <div></div> */}
                  <InputGroup>
                  {/* <InputGroup.Prepend> */}
                    <InputGroup.Text>
                      Informações da Ficha
                      <br />
                      de Evolução
                    </InputGroup.Text>
                    {/* </InputGroup.Prepend> */}
                    <FormControl
                      required
                      as='textarea'
                      aria-label='With textarea'
                      rows={10}
                      value={fichaEvolucao}
                      onChange={(e) => setFichaEvolucao(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>
              }


              <br />
              <h2>Agende a próxima sessão</h2>
              <br />
              <div className='row'>
                {formSchedule.map((item) => {
                  let index = _.findIndex(formSchedule, {id_ref: item.id_ref})
                  return (
                    <Form.Group
                      key={item.id_ref}
                      controlId={'item' + item.id_ref}
                      className='col-md-6'
                    >
                      <Form.Label>{item.type_detail}</Form.Label>
                      <Form.Control
                        placeholder={item.type_detail}
                        required
                        value={detail[index].value_detail}
                        onChange={(e) => updateAnswer(item, e.target.value)}
                      />
                      <br />
                    </Form.Group>
                  )
                })}
              </div>
              <br />
              <InputGroup>
                {/* <InputGroup.Prepend> */}
                <InputGroup.Text>
                  Informações adicionais
                  <br />
                  para atendimento
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
              <Form.Group controlId='validationCustomTerms'>
                <Form.Check
                  type='checkbox'
                  required
                  name='terms'
                  label='Confirmar o agendamento dessa solicitação'
                  feedback='Você precisa confirmar o agendamento para prosseguir.'
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
export {FormNewSection}
