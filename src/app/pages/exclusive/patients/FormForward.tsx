import React, {useState, useEffect} from 'react'
import {Button, Form, FormControl, InputGroup, Modal} from 'react-bootstrap-v5'
import {Solicitation, Solicitationhistory} from '../../../../store/ducks/solicitation/types'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {useDispatch} from 'react-redux'
import {updateSolicitationRequest} from '../../../../store/ducks/solicitation/actions'
import {loadUsersRequest} from '../../../../store/ducks/users/actions'
import Loading from '../../../design/loading'

type Props = {
  data: Solicitation | undefined
  show: boolean
  handleClose: React.Dispatch<React.SetStateAction<void>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<Solicitation | undefined>>
}

const FormForward: React.FC<Props> = ({data, show, handleClose, message, setMessage, setData}) => {
  const users = useSelector((state: ApplicationState) => state.users)
  const me = useSelector((state: ApplicationState) => state.me)
  const [validated, setValidated] = useState(false)
  const [userSelected, setUserSelected] = useState<string>('')
  const [terms, setTerms] = useState(false)
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

    if (userSelected && terms) {
      setLoading(true)
      setValidated(true)
      changeStatusData(0, 'PENDENTE')
      //handleClose()
      setMessage('')
      setData({})
      setValidated(false)
    }
  }

  const dispatch = useDispatch()
  console.log('USERS**', users)
  console.log('User Selected', userSelected)
  useEffect(() => {
    // console.log("############ Loading component hey...", { module_id, class_id, me })
    if (users.page === 0) {
      users.page = users.page! + 1
      console.log('PAGE USEEFFECT', users.page)
      //Atenção: Achar os profissionais próximos do paciente
      dispatch(loadUsersRequest(1, 10))
    }
  }, [])

  const changeStatusData = (status: number, history: string) => {
    let newSolicitation = data
    newSolicitation!.status = status
    newSolicitation!.parentUser = {
      id: parseInt(userSelected!), //MUDAR AQUI
    }

    var dateNow = new Date()
    var dateNowPlusOneSecond = new Date()
    dateNowPlusOneSecond.setSeconds(dateNowPlusOneSecond.getSeconds() + 1)

    let newHistory: Solicitationhistory = {
      type_history: history,
      created_at: dateNowPlusOneSecond.getTime() / 1000,
      parentSolicitation: data!.id,
      status: 1,
      // userId: 2,
      parentUser: {id: parseInt(userSelected!)}, //MUDAR AQUI
      //message,
    }

    let newHistory_forward: Solicitationhistory = {
      type_history: 'ENCAMINHADO',
      created_at: dateNow.getTime() / 1000,
      parentSolicitation: data!.id,
      status: 1,
      // userId: me.me.id!,
      parentUser: {id: me.me.id!},
      message,
    }
    newSolicitation!.history = [newHistory_forward, newHistory]
    console.log('*********Solic with DATA*********', newSolicitation)
    dispatch(updateSolicitationRequest(newSolicitation!))
    setLoading(false)
    handleClose()
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
            {loading
              ? 'Aguarde...'
              : 'Encaminhar: ' + data?.parentPatient?.profile?.name + ' para outro profissional'}
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
              {users.loading ? (
                <Loading />
              ) : (
                <FormControl
                  as='select'
                  size='lg'
                  //value={message}
                  onChange={(e) => setUserSelected(e.target.value)}
                  required
                >
                  <option selected disabled value=''>
                    Escolha um profissional
                  </option>
                  {users.data.map((user, index) => {
                    if (user.id !== me.me.id)
                      return (
                        <option key={index} value={user.id}>
                          {user.profile?.name} - {user.profile?.cityParent?.name}
                          {/* {user.profile?.name} - {user.profile?.cityParent?.name}/{user.profile?.stateParent?.name} */}
                        </option>
                      )
                    return ''
                  })}
                </FormControl>
              )}
              <br />
              <InputGroup>
                {/* <InputGroup.Prepend> */}
                <InputGroup.Text>Motivo</InputGroup.Text>
                {/* </InputGroup.Prepend> */}
                <FormControl
                  as='textarea'
                  aria-label='With textarea'
                  rows={10}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </InputGroup>
              <br />
              <Form.Group controlId='validationCustomTerms'>
                <Form.Check
                  type='checkbox'
                  required
                  name='terms'
                  label='Confirmar o encaminhamento dessa solicitação'
                  feedback='Você precisa confirmar o encaminhamento para prosseguir.'
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
export {FormForward}
