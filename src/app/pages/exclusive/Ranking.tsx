import React, { FC, useEffect } from 'react'
import { PageTitle } from '../../design/layout/core'
import { useIntl } from 'react-intl'
import { RankingWidget } from './ranking/RankingWidget'
// import Vimeo from '@u-wave/react-vimeo'
// import { right } from '@popperjs/core'

const RankingPage: FC<React.PropsWithChildren<unknown>> = () => {
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
      {/* <h3 className='page-title mt-0 mb-5'>{intl.formatMessage({ id: 'PAGE.RANKING' })}</h3> */}
      <RankingWidget className='card-xxl-stretch mb-5 mb-xl-8' />
      {/* end::Row */}
    </>
  )
}

const Ranking: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.RANKING' })}</PageTitle>
      <RankingPage />
    </>
  )
}
export { Ranking }
