import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap-v5'
import {Solicitation, Solicitationhistory} from '../../../../store/ducks/solicitation/types'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {useDispatch} from 'react-redux'
import {updateSolicitationRequest} from '../../../../store/ducks/solicitation/actions'
import Loading from '../../../design/loading'

type Props = {
  data: Solicitation | undefined
  show: boolean
  handleClose: React.Dispatch<React.SetStateAction<void>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<Solicitation | undefined>>
}

const FormAnalise: React.FC<Props> = ({data, show, handleClose, message, setMessage, setData}) => {
  const [validated, setValidated] = useState(false)
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(event.target.checked)
    console.log(event.target.checked)
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    setTerms(false)
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    if (terms) {
      setLoading(true)
      setValidated(true)
      //&& terms === true && segmentation
      changeStatusData(1, 'ANALISE')
      //handleClose();
      setMessage('')
      setData({})
      setTerms(false)
      handleClose()
      setValidated(false)
    }
  }

  const me = useSelector((state: ApplicationState) => state.me)
  const dispatch = useDispatch()

  const changeStatusData = (status: number, history: string) => {
    let newSolicitation = data
    newSolicitation!.status = status

    var dateNow = new Date()

    let newHistory: Solicitationhistory = {
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
            {loading ? 'Aguarde...' : 'Analisar: ' + data?.parentPatient?.profile?.name}
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
              <div>
                Você está prestes a mover um paciente para a Análise.
                <br />
                Uma mensagem será disparada para o paciente, portanto,
                <br />
                assine abaixo seu termo de responsabilidade em cuidar dessa solicitação.
              </div>
              <br />
              <Form.Group controlId='validationCustomTerms'>
                <Form.Check
                  type='checkbox'
                  required
                  name='terms'
                  label='Concordo com os termos e condições'
                  feedback='Você precisa aceitar os termos e condições para prosseguir.'
                  id='Check'
                  onChange={handleTerms}
                />
              </Form.Group>
              {/* <InputGroup>
                        <InputGroup.Text>Digite o motivo</InputGroup.Text>
                        <FormControl
                            as='textarea'
                            aria-label='With textarea'
                            rows={10}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </InputGroup> */}
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
                  setValidated(false)
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
export {FormAnalise}
