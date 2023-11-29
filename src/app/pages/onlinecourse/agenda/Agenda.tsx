import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../design/layout/core'
// import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {loadModulesRequest} from '../../../../store/ducks/component/actions'
import {ComponentState} from '../../../../store/ducks/component/types'
import Loading from '../../../design/loading'

import {ModuleWidget} from './AgendaWidget'

type ParamTypes = {
  id: string
}

// const MOMENT= require( 'moment' );

type Props = {
  comp: ComponentState
  id: string
}
const ModulesPage: React.FC<React.PropsWithChildren<Props>> = ({comp, id}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ModuleWidget comp={comp} id={id} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const Agenda: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()
  let {id} = useParams<ParamTypes>() //id do módulo
  const component = useSelector((state: ApplicationState) => state.component)
  const me = useSelector((state: ApplicationState) => state.me)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('****************** Loading component...', {
    //   id: Number(id),
    //   component: component.modules[0],
    // })
    if (!component.modules.length) {
      dispatch(loadModulesRequest(id!, me.me.id!, me.me.numTurma!, 'asc')) //Puxa componentes com seus filhos primários
    } else {
      if (component.modules[0].parent!.id !== Number(id))
        dispatch(loadModulesRequest(id!, me.me.id!, me.me.numTurma!, 'asc')) //Puxa componentes com seus filhos primários
    }
  }, [id, me, component.modules, dispatch])

  // console.log("Component loaded", component)

  if (component.loading || !component.modules.length) return <Loading />

  if (component.modules[0].parent!.id !== Number(id)) return <Loading />

  // let today = MOMENT().format( 'YYYY-MM-DD HH:mm:ss.000' );

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>{component?.modules[0].parent!.name}</PageTitle>
      <ModulesPage comp={component} id={id!} />
    </>
  )
}
export {Agenda}
