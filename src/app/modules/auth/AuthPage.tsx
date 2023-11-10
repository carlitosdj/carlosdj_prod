/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import ChangePass from './components/changePass'
import {Login} from './components/Login'
// import Login from '../../../app/pages/login'
import {toAbsoluteUrl} from '../../design/helpers'

export function AuthPage() {
  useEffect(() => {
    // document.body.classList.add('bg-white')
    return () => {
      // document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      // style={{
      //   backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14-dark.png')})`,
      // }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          {/* <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo-1.svg')} className='h-45px' /> */}
          <img
            alt='Logo'
            className='h-45px'
            src={toAbsoluteUrl('/media/logos/logo.png')}
          />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Routes>
            
              <Route path='login' element={<Login />} />
              <Route path='registration' element={<Registration />} />
              <Route path='change/:email/:authKey' element={<ChangePass />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              {/* <Route path='auth' element={<Navigate to='/auth/login'/>}></Route> */}
              {/* <Route element={<Navigate to='/auth/login'/>}></Route> */}
            
          </Routes>
        </div>

        
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      {/* <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            Sobre
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Suporte
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contato
          </a>
        </div>
      </div> */}
      {/* end::Footer */}
    </div>
  )
}
