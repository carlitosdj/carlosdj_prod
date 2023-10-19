/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
// import {useDispatch} from 'react-redux'
// import * as Yup from 'yup'
// import clsx from 'clsx'
import {Link} from 'react-router-dom'
// import {useFormik} from 'formik'
import {loginUserRequest} from '../../../../store/ducks/me/actions'
// import { useHistory } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import {ApplicationState} from '../../../../store'
// import { User } from '../../../../store/ducks/users/types';
// import { authfromcookie } from '../../../../store/ducks/me/actions';
import {Alert} from 'react-bootstrap-v5'
// import Loading from '../../loading'
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const dispatch = useDispatch()
  // const history = useHistory();

  //Cookies:
  // const [cookies, setCookie] = useCookies(['user_associacao']);
  // const cookieUser:User = cookies.user_associacao;

  //Redux:
  const me = useSelector((state: ApplicationState) => state.me)

  // console.log('me login', me)
  // console.log("Cookie user", cookieUser)
  // if(me.error){
  //   setLoading(false);
  // }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log("eai?")
    event.preventDefault()
    if (login && pass) {
      setLoading(true)
      me.error = false
      //console.log('System is trying to login user...')
      dispatch(loginUserRequest({email: login, password: pass}))
      //setLoading(false)
    } else {
      //errMsg('Dados inválidos, preencha novamente');
      //console.log('Erro!')
      //setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {me.error ? <Alert variant='danger'>Erro: Login ou senha inválidos</Alert> : ''}
      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fw-bolder'>Email</label>
        <input
          type='text'
          className='form-control form-control-lg form-control-solid'
          style={{fontSize: 13}}
          id='login'
          name='email'
          placeholder='Digite seu e-mail'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder mb-0'>Senha</label>
            {/* end::Label */}
            {/* begin::Link */}

            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          className='form-control form-control-lg form-control-solid'
          style={{fontSize: 13}}
          id='senha'
          name='password'
          aria-describedby='emailHelp'
          placeholder='Digite sua senha'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-2'
          // disabled={formik.isSubmitting || !formik.isValid}
        >
          {(!loading || me.error) && <span className='indicator-label'>Entrar</span>}
          {loading && !me.error && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Conectando...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
      <Link
        to='/auth/forgot-password'
        className='link-dark fs-6 fw-bolder'
        // style={{marginLeft: '5px'}}
      >
        Esqueceu a senha?
      </Link>
    </form>
  )
}
