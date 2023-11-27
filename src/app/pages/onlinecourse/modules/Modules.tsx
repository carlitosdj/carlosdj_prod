import React, {FC, useEffect} from 'react'
import {PageLink, PageTitle} from '../../../design/layout/core'
// import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {loadModulesRequest} from '../../../../store/ducks/component/actions'
import {ComponentState} from '../../../../store/ducks/component/types'
import Loading from '../../../design/loading'

import {ModuleWidget} from './ModuleWidget'

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

const Modules: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()
  let {id} = useParams<ParamTypes>() //id do módulo
  const component = useSelector((state: ApplicationState) => state.component)
  const me = useSelector((state: ApplicationState) => state.me)
  const dispatch = useDispatch()
  const breadCrumbs: Array<PageLink> = [
    {
      title: 'Todos os cursos',
      path: '/onlinecourses',
      isSeparator: false,
      isActive: false,
    },
  ]
  useEffect(() => {
    //console.log('****************** Loading component...', component)
    // if (!component.modules.length) {
    //   dispatch(loadModulesRequest(id!, me.me.id!, me.me.num_turma!, 'asc')) //Puxa componentes com seus filhos primários
    //   //console.log("HEEEYYYY", [id!, me.me.id!, me.me.num_turma!])
    //   console.log("nao tem length")
    // }

    // else {
    //   if (component.modules[0].parent!.id !== Number(id)) {
    //     dispatch(loadModulesRequest(id!, me.me.id!, me.me.num_turma!, 'asc')) //Puxa componentes com seus filhos primários
    //     console.log("nao tem parent.id")
    //     console.log("Number ID", Number(id))
    //     console.log("Number ID", component.modules[0].parent!.id)

    //   }

    // }
    dispatch(loadModulesRequest(id!, me.me.id!, me.me.num_turma!, 'asc')) //Puxa componentes com seus filhos primários
  }, [])
  //}, [id, me, component.modules, dispatch])

  console.log('Component loaded', component)

  if (component.loadingModules) return <Loading />
  //if (component.modules[0].parent!.id !== Number(id)) return <Loading />

  if (!component.modules.length && !component.loadingModules)
    return (
      <>
        {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
        <PageTitle breadcrumbs={breadCrumbs}>Erro!</PageTitle>
        {/* <ModulesPage comp={component} id={id!} /> */}
        <div className='row g-5 gx-xxl-12'>
          <div className='col-xxl-12'>
            <div className={`card card-xxl-stretch mb-0`}>
              {/* begin::Header */}

              <div className='card-header border-0 pt-5 mt-2'>
                <div className='col-md-12'>
                  Não encontrado
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={breadCrumbs}>{component?.modules[0].parent!.name}</PageTitle>
      <ModulesPage comp={component} id={id!} />
    </>
  )
}
export {Modules}
