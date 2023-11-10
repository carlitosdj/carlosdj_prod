import React, {useEffect, useState} from 'react'
// import { useJwt } from "react-jwt";
import {useSelector, useDispatch} from 'react-redux'

import {loadMeRequest, updateMeRequest} from '../../../../store/ducks/me/actions'
// import { useCookies } from 'react-cookie';
import {ApplicationState} from '../../../../store'
// import { User } from '../../../../store/ducks/users/types';
import {} from '../../../../store/ducks/me/actions'

import {useParams} from 'react-router-dom'
import Loading from '../../../design/loading'
import { Alert } from 'react-bootstrap-v5'
const {v4: uuidv4} = require('uuid')

type ParamTypes = {
  email: string | undefined
  authKey: string | undefined
}

const LoginPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  
  // const history = useHistory();

  //Cookies:
  // const [cookies, setCookie] = useCookies(['user_associacao']);
  // const cookieUser:User = cookies.user_associacao;
  //Redux:
  const me = useSelector((state: ApplicationState) => state.me)
  const {email, authKey} = useParams<ParamTypes>()

  //console.log('ME', me)

  useEffect(() => {
    dispatch(loadMeRequest(email!, authKey!))
  }, [authKey, email, dispatch])

  // console.log('cookies - login', cookies)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password && confirmPassword && password === confirmPassword) {
      //console.log('dispatching...')
      setError('')
      dispatch(updateMeRequest({id: me.me.id, email, newPassword: password, authKey: uuidv4()}))
    } else {
      //errMsg('Dados inválidos, preencha novamente');
      //console.log('Erro!')
      setError('Erro: Senhas não são coincidentes.')
    }
  }

  if (!me.me.id) return <Loading />

  return (
    <div className=''>
      <div className='login-page'>
        <div className='istdef-login-box'>
          {/* <UsersList /> */}
          {/* <CartList /> */}

          {/* <button onClick={handleSubmitB}>teste</button> */}
          {/* /.login-logo */}
          <div className='card'>
            <div className='card-body login-card-body'>
              <b>ALTERAR SENHA: </b>
              {email}
              {/* <br/>
              {me.me.authKey}
              <br/>
              {authKey} */}
              <br />
              <br />
              {(error !== '') ?
                <>
                  <Alert variant='danger'>{error}</Alert>
                </>
              :''}
              {(me.message === 'updated' && error ==='') ? (
                <>
                  <Alert variant='primary'>Senha alterada com sucesso.</Alert>
                  <div>
                    <a href='/'> Entrar no sistema </a>
                  </div>
                </>
              ) : me.me.authKey !== authKey ? (
                <>
                  <Alert variant='danger'>Essa chave de autenticação expirou, repita o processo.</Alert>
                  <div>
                    <a href='/auth/forgot-password'> Clique aqui para reiniciar o processo de recuperação de senha </a>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className='input-group mb-3'>
                    <input
                      type='password'
                      style={{fontSize: 13}}
                      className='form-control'
                      id='login'
                      name='email'
                      placeholder='Nova Senha'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-lock' />
                      </div>
                    </div>
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      type='password'
                      style={{fontSize: 13}}
                      className='form-control'
                      id='login'
                      name='email'
                      placeholder='Repita sua senha'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-lock' />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    {/* /.col */}
                    <div className='col-12'>
                      <button type='submit' className='btn btn-dark btn-block'>
                        Salvar
                      </button>
                    </div>
                    {/* /.col */}
                  </div>
                </form>
              )}
              {/* /.social-auth-links */}
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
