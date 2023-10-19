import React, { FC, useEffect } from 'react'
import { PageTitle } from '../../design/layout/core'
import { useIntl } from 'react-intl'
import { SuppliersWidget } from './suppliers/SuppliersWidget'
// import Vimeo from '@u-wave/react-vimeo'
// import { right } from '@popperjs/core'
// const MOMENT = require('moment')

const SuppliersPage: FC<React.PropsWithChildren<unknown>> = () => {
  // const me = useSelector((state: ApplicationState) => state.me)
  // const component = useSelector((state: ApplicationState) => state.component)
  // const dispatch = useDispatch()
  // const intl = useIntl()

  useEffect(() => {
    // dispatch(loadLastLiveClassRequest())
    // dispatch(loadLastClassRequest(me.me.id!))
  }, [])
  
  return (
    <>
      {/* begin::Row */}
      {/* <h3 className='page-title mt-0 mb-5'>{intl.formatMessage({ id: 'PAGE.SUPPLIERS' })}</h3> */}
      <SuppliersWidget className='card-xxl-stretch mb-5 mb-xl-8' />
      {/* <h3 className='page-title mt-0 mb-5'>Treinamentos</h3> */}
      {/* end::Row */}
    </>
  )
}

const Suppliers: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.SUPPLIERS' })}</PageTitle>
      <SuppliersPage />
    </>
  )
}
export { Suppliers }
