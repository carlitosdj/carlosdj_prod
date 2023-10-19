import React, {useEffect, useState} from 'react'
// import { useJwt } from "react-jwt";
import {useSelector, useDispatch} from 'react-redux'

import {loginUserRequest} from '../../../store/ducks/me/actions'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {ApplicationState} from '../../../store'

import {authfromcookie} from '../../../store/ducks/me/actions'
// import Loading from '../../loading'
import {Link} from 'react-router-dom'
import { User } from '../../../store/ducks/users/types'
// import { FaThumbsUp } from 'react-icons/fa';
// import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';

const LoginPage = () => {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Cookies:
  const [cookies, setCookie] = useCookies(['user_associacao'])
  const cookieUser: User = cookies.user_associacao

  //Redux:
  const me = useSelector((state: ApplicationState) => state.me)
  // console.log("me login", me)

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
      // history.push('/home');
      navigate('/onlinecourses')
      

    }
    if (!me.logged && cookieUser) {
      // console.log("tem cookie user!", cookieUser)
      //console.log('Cookie user found... Redirecting to Home', cookieUser)
      dispatch(authfromcookie(cookieUser))
      // history.push('/home');
      navigate('/onlinecourses')
    }
  }, [me.loading])

  // console.log('cookies - login', cookies)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log("eai?")
    event.preventDefault()
    if (login && senha) {
      //console.log('System is trying to login user...')
      dispatch(loginUserRequest({email: login, password: senha}))
    } else {
      //errMsg('Dados inválidos, preencha novamente');
      //console.log('Erro!')
    }
  }
  // if(me.loading)
  //     return <Loading />
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
          {me.error ? 'Login/Senha inválidos.' : ''}
          <div className='card'>
            <div className='card-body login-card-body'>
              <p className='login-box-msg text-white'>
                <small>FAÇA SEU LOGIN</small>
              </p>
              <form onSubmit={handleSubmit}>
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    style={{fontSize: 13}}
                    id='login'
                    name='email'
                    placeholder='Digite seu e-mail'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <div className='input-group-append'>
                    <div className='input-group-text' style={{backgroundColor: '#fff'}}>
                      <span className='fas fa-envelope' />
                    </div>
                  </div>
                </div>
                <div className='input-group mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    style={{fontSize: 13}}
                    id='senha'
                    name='password'
                    aria-describedby='emailHelp'
                    placeholder='Digite sua senha'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <div className='input-group-append'>
                    <div className='input-group-text' style={{backgroundColor: '#fff'}}>
                      <span className='fas fa-lock' />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <div className='icheck-primary'>
                      <input type='checkbox' id='remember' />
                      <label htmlFor='remember' className='text-white'>
                        &nbsp;<small>Lembrar-me</small>
                      </label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className='col-7'>
                    <Link to='/recovery'>
                      <small>Esqueci minha senha</small>
                    </Link>
                  </div>
                  {/* /.col */}
                </div>
                <p className='mb-1'>
                  <button className='btn btn-dark btn-block' type='submit'>
                    Entrar
                    {me.loading ? <> Carregando </> : ''}
                  </button>
                </p>
              </form>
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
