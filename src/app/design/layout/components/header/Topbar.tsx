import clsx from 'clsx'
import React, {FC} from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../../store'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {
  // HeaderNotificationsMenu,
  HeaderUserMenu,
  // QuickLinks
} from '../../../partials'
import {useLayout} from '../../core'
import api from '../../../../../services/api'
import { call } from 'redux-saga/effects'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  // toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'
  // toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC<React.PropsWithChildren<unknown>> = () => {
  const {config} = useLayout()
  const me = useSelector((state: ApplicationState) => state.me)
  const image = me.me.image
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          {/* <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='metronic' /> */}
           <img 
            src={ image?.includes('https://') ? image : 'https://institutodefelicibus.com.br/files/' + image}
            //style={{width: '40px', height:'40px'}}
            className=''
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://institutodefelicibus.com.br/files/notfound.jpg";
            }}
            />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {/* {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )} */}
    </div>
  )
}

export {Topbar}
