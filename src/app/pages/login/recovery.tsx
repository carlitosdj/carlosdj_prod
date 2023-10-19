import React, {useEffect, useState} from 'react'
// import { useJwt } from "react-jwt";
import {useSelector, useDispatch} from 'react-redux'

import {recoveryUserRequest} from '../../../store/ducks/me/actions'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {ApplicationState} from '../../../store'
import {User} from '../../../store/ducks/users/types'
import {authfromcookie} from '../../../store/ducks/me/actions'
import Loading from '../../design/loading'

const LoginPage = () => {
  const [login, setLogin] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Cookies:
  const [cookies, setCookie] = useCookies(['user_associacao'])
  const cookieUser: User = cookies.user_associacao
  //Redux:
  const me = useSelector((state: ApplicationState) => state.me)

  useEffect(() => {
    // console.log("Use effect",me.loading)

    if (me.logged === true) {
      //console.log('User is logged.. Redirecting to Home')
      var date = new Date()
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000) //Days *
      setCookie('user_associacao', me.me, {
        path: '/',
        expires: date, //maxAge?
      })
      navigate('/home')
    }
    if (!me.logged && cookieUser) {
      // console.log("tem cookie user!", cookieUser)
      //console.log('Cookie user found... Redirecting to Home')
      dispatch(authfromcookie(cookieUser))
      navigate('/home')
    }
  }, [me.loading])

  // console.log('cookies - login', cookies)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (login) {
      //console.log('dispatching...')
      dispatch(recoveryUserRequest(login))
    } else {
      //errMsg('Dados inválidos, preencha novamente');
      //console.log('Erro!')
    }
  }
  if (me.loading) return <Loading />
  // return <Loading />
  return (
    <div className='wrapper'>
      <div className='login-page'>
        <div className='istdef-login-box'>
          {/* <UsersList /> */}
          {/* <CartList /> */}

          <div className='login-logo'>
            <b>Plataforma</b>ESPORTIVA
          </div>
          {/* <button onClick={handleSubmitB}>teste</button> */}
          {/* /.login-logo */}
          <div className='card'>
            <div className='card-body login-card-body'>
              {me.message === 'sent' ? (
                <div className='text-white'>
                  E-mail enviado, siga as instruções na sua caixa de entrada.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className='input-group mb-3'>
                    <input
                      type='text'
                      style={{fontSize: 13}}
                      className='form-control'
                      id='login'
                      name='email'
                      placeholder='Digite seu e-mail'
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-envelope text-white' />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    {/* /.col */}
                    <div className='col-12'>
                      <button type='submit' className='btn btn-dark btn-block'>
                        Envie-me um e-mail de recuperação
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
