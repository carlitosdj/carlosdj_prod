import React, {FC, useEffect} from 'react'
import {PageLink, PageTitle} from '../../../design/layout/core'
// import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {loadModulesRequest} from '../../../../store/ducks/component/actions'
import {ComponentState} from '../../../../store/ducks/component/types'
import Loading from '../../../design/loading'
import {ReplayWidget} from './ReplayWidget'
import { Alert } from 'react-bootstrap-v5'
const MOMENT = require('moment')

// type ParamTypes = {
//   id: string
// }

// const MOMENT= require( 'moment' );

type Props = {
  comp: ComponentState
  id: string
}
const ReplayPage: React.FC<React.PropsWithChildren<Props>> = ({comp, id}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ReplayWidget comp={comp} id={id} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const Replay: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()
  let id = '808' //id do módulo
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
    // {
    //   title: '',
    //   path: '',
    //   isSeparator: true,
    //   isActive: false,
    // },
  ]
  useEffect(() => {
    console.log('****************** Loading component...', component)
    if (!component.modules.length) {
      dispatch(loadModulesRequest(id!, me.me.id!, me.me.numTurma!, 'asc')) //Puxa componentes com seus filhos primários
      //console.log("HEEEYYYY", [id!, me.me.id!, me.me.numTurma!])
    } else {
      if (component.modules[0].parent!.id !== Number(id))
        dispatch(loadModulesRequest(id!, me.me.id!, me.me.numTurma!, 'asc')) //Puxa componentes com seus filhos primários
    }

  }, [id, me, component.modules, dispatch])

  //console.log("Component loaded", component)

  if (component.loading || !component.modules.length) return <Loading />

  if (component.modules[0].parent!.id !== Number(id)) return <Loading />

  // let today = MOMENT().format( 'YYYY-MM-DD HH:mm:ss.000' );
  var createdAt = MOMENT(Number(me.me.createdAt) * 1000) //.format('DD/MM/YYYY HH:mm')
  var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
  let blockAreas = (now.diff(createdAt, 'years', true).toFixed(2) > 1);

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={breadCrumbs}>{component?.modules[0].parent!.name}</PageTitle>

      {((now.diff(createdAt, 'years', true)).toFixed(2) > 0.9) && !blockAreas ?
        <Alert variant='info'>
          <h4 style={{ color: 'rgb(32 38 80)' }}>Contrato de Mentorias ao Vivo</h4>
          Olá, {me.me.profile?.name}.O seu contrato de <b>mentorias ao vivo</b> está prestes a expirar. Deseja renovar sua inscrição? Por favor, clique no botão abaixo:
          <br />
          <br />
          <a href='https://pay.kiwify.com.br/zmBZoFy' className='btn btn-sm btn-light-primary'>
            Renovar mentorias ao vivo
          </a>
          <br /><br />
          Data de entrada: <b>{createdAt.format('DD/MM/YYYY HH:mm')}</b>
          <br />
          Atenção: Após realizar o pagamento, entre em contato com o suporte para conferência do pagamento.
        </Alert>
        : ''}

      {((now.diff(createdAt, 'years', true)).toFixed(2) > 0.9) && blockAreas ?
        <Alert variant='danger'>
          <h4 style={{ color: '#621f26' }}>Contrato de Mentorias ao Vivo</h4>
          Olá, {me.me.profile?.name}.<br /> Seu contrato de mentoria ao vivo <b>expirou</b> e algumas áreas estão agora bloqueadas. Deseja renovar sua inscrição? Por favor, clique no botão abaixo:
          <br />
          <br />
          <a href='https://pay.kiwify.com.br/zmBZoFy' className='btn btn-sm btn-light-primary'>
            Renovar mentorias ao vivo
          </a>
          <br /><br />
          Data de entrada: <b>{createdAt.format('DD/MM/YYYY HH:mm')}</b>
          <br />
          Atenção: Após realizar o pagamento, entre em contato com o suporte para conferência do pagamento.
        </Alert>
        : <ReplayPage comp={component} id={id} />}

      
    </>
  )
}
export {Replay}
