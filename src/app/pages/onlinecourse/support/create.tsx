import {useState} from 'react'
import {ApplicationState} from '../../../../store'
import {useSelector, useDispatch} from 'react-redux'
import {createSupportRequest} from '../../../../store/ducks/support/actions'

import {InputGroup, FormControl, Button} from 'react-bootstrap-v5'

import {Support} from '../../../../store/ducks/support/types'

interface handleCloseProps {
  handleClose: () => void
}

const Leads = ({handleClose}: handleCloseProps) => {
  const dispatch = useDispatch()
  const me = useSelector((state: ApplicationState) => state.me)
  // const [list, setList] = useState('');
  // const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('')

  const sendEmail = () => {
    console.log('send')
    // console.log('list', list)
    // console.log('subject', subject)
    // console.log('message', message)
    var data = new Date()
    const support: Support = {
      message,
      parentUser: me.me.id,
      userId: me.me.id,
      status: 0,
      created_at: data.getTime() / 1000,
    }
    dispatch(createSupportRequest(support))
    handleClose()
  }

  return (
    <>
      <InputGroup>
        {/* <InputGroup.Prepend> */}
        <InputGroup.Text>Mensagem</InputGroup.Text>
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
      <Button variant='outline-secondary' onClick={sendEmail}>
        Abrir chamado
      </Button>
    </>
  )
}

export default Leads
