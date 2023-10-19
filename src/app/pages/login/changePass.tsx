import React, {useEffect, useState} from 'react'
// import { useJwt } from "react-jwt";
import {useSelector, useDispatch} from 'react-redux'

import {loadMeRequest, updateMeRequest} from '../../../store/ducks/me/actions'
import {useNavigate} from 'react-router-dom'
// import {useCookies} from 'react-cookie'
import {ApplicationState} from '../../../store'
// import {User} from '../../../store/ducks/users/types'
import {} from '../../../store/ducks/me/actions'
import Loading from '../../design/loading'
import {useParams, Link} from 'react-router-dom'
const {v4: uuidv4} = require('uuid')

type ParamTypes = {
  email: string
  auth_key: string
}

const LoginPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  //Cookies:
  // const [cookies, setCookie] = useCookies(['user_associacao']);
  // const cookieUser:User = cookies.user_associacao;
  //Redux:
  const me = useSelector((state: ApplicationState) => state.me)
  const {email, auth_key} = useParams<ParamTypes>()
  //console.log('ME', me)

  useEffect(() => {
    dispatch(loadMeRequest(email!, auth_key!))
  }, [])

  // console.log('cookies - login', cookies)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password && confirmPassword && password === confirmPassword) {
      //console.log('dispatching...')
      dispatch(updateMeRequest({id: me.me.id, email, newPassword: password, auth_key: uuidv4()}))
    } else {
      //errMsg('Dados inválidos, preencha novamente');
      //console.log('Erro!')
    }
  }

  if (!me.me.id) return <Loading />

  return (
    <div className='wrapper'>
      <div className='login-page'>
        <div className='istdef-login-box'>
          {/* <UsersList /> */}
          {/* <CartList /> */}

          <div className='login-logo'>
            <b>VIOLÃO</b>FEELING
          </div>
          {/* <button onClick={handleSubmitB}>teste</button> */}
          {/* /.login-logo */}
          <div className='card'>
            <div className='card-body login-card-body text-white'>
              <b>ALTERAR SENHA: </b>
              {email}
              <br />
              <br />
              {me.message === 'changed' ? (
                <>
                  <div>Senha alterada com sucesso.</div>
                  <div>
                    <a href='/'> Entrar no sistema </a>
                  </div>
                </>
              ) : me.me.auth_key !== auth_key ? (
                <>
                  <div>Essa chave de autenticação expirou, repita o processo. </div>
                  <div>
                    <a href='/recovery'> Clique aqui para recuperar sua senha </a>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className='input-group mb-3'>
                    <input
                      type='text'
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
                      type='text'
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
