/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
// import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1: FC<React.PropsWithChildren<unknown>> = () => {
  const {classes} = useLayout()

  return (
    <div className='toolbar d-none d-lg-block' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'pt-5 d-flex flex-stack')}
      >
        <DefaultTitle />
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
