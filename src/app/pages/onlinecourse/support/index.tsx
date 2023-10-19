import {useEffect} from 'react'
import {ApplicationState} from '../../../../store'
import {useSelector, useDispatch} from 'react-redux'
import {loadSupportsRequest} from '../../../../store/ducks/support/actions'
import Loading from '../../../design/loading'

import {MySupportWidget} from './MySupportWidget'

import {SupportState} from '../../../../store/ducks/support/types'
import {PageTitle} from '../../../design/layout/core'

type Props = {
  supports: SupportState
}

const ManagePageSupport: React.FC<React.PropsWithChildren<Props>> = ({supports}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <MySupportWidget supports={supports} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const MySupport = () => {
  const supportsList = useSelector((state: ApplicationState) => state.supports)
  const me = useSelector((state: ApplicationState) => state.me)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Carregando supports', me.me.id)
    dispatch(loadSupportsRequest(me.me.id!))
  }, [me, dispatch])

  console.log('supports', supportsList)

  if (supportsList.loading) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Meus chamados</PageTitle>
      <ManagePageSupport supports={supportsList} />
    </>
  )
}

export default MySupport
