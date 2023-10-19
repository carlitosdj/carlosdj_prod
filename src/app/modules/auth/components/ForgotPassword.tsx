import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {recoveryUserRequest} from '../../../../store/ducks/me/actions'
import {ApplicationState} from '../../../../store'
// import {requestPassword} from '../reduxOLD/AuthCRUD'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  //console.log('hasErrors', hasErrors)

  const dispatch = useDispatch()
  const me = useSelector((state: ApplicationState) => state.me)

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        dispatch(recoveryUserRequest(values.email))
        // requestPassword(values.email)
        //   .then(({data: {result}}) => {
        //     setHasErrors(false)
        //     setLoading(false)
        //   })
        //   .catch(() => {
        //     setHasErrors(true)
        //     setLoading(false)
        //     setSubmitting(false)
        //     setStatus('The login detail is incorrect')
        //   })
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        {/* begin::Title */}
        {/* {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Desculpe, parece que alguns erros foram detectados. Tente novamente.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Redefinição de senha enviada. Por favor verifique seu email</div>
          </div>
        )} */}
        {/* end::Title */}
        {me.message === 'sent' ? (
          <>
            <div className='text-gray-400 fw-bold fs-4'>
              Redefinição de senha enviada. Por favor verifique seu email.
            </div>
            <Link to='/auth/login'>
              <button
                type='button'
                id='kt_login_password_reset_form_cancel_button'
                className='btn btn-lg btn-light-primary fw-bolder'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Voltar
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className='text-center mb-10'>
              {/* begin::Title */}
              <h1 className='text-gray-400 text-dark mb-3'>Esqueceu sua senha?</h1>
              {/* end::Title */}

              {/* begin::Link */}
              <div className='text-gray-400 fw-bold fs-4'>
                Entre com seu e-mail para recuperar sua senha
              </div>
              {/* end::Link */}
            </div>
            <div className='fv-row mb-10'>
              <label className='form-label fw-bolder text-gray-400 fs-6'>Email</label>
              <input
                type='email'
                placeholder=''
                autoComplete='off'
                {...formik.getFieldProps('email')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.email && formik.errors.email},
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                </div>
              )}
            </div>

            <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
              <button
                type='submit'
                id='kt_password_reset_submit'
                className='btn btn-lg btn-primary fw-bolder me-4'
              >
                <span className='indicator-label'>Enviar</span>
                {loading && (
                  <span className='indicator-progress'>
                    Carregando...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
              <Link to='/auth/login'>
                <button
                  type='button'
                  id='kt_login_password_reset_form_cancel_button'
                  className='btn btn-lg btn-light-primary fw-bolder'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  Cancelar
                </button>
              </Link>{' '}
            </div>
          </>
        )}
      </form>
    </>
  )
}
