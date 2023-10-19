import React, { FC, useEffect } from 'react'
import { PageTitle } from '../../design/layout/core'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { useDispatch } from 'react-redux'
import { Requests } from './patients/Requests'
import { loadAllSolicitationsRequest } from '../../../store/ducks/solicitation/actions'

const PatientsPage: FC<React.PropsWithChildren<unknown>> = () => {
  const me = useSelector((state: ApplicationState) => state.me)
  const solicitation = useSelector((state: ApplicationState) => state.solicitation)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAllSolicitationsRequest(me.me.id!))
  }, [])

  console.log("solicitations", solicitation)
  
  return (
    <>
      <div className='row g-5 gx-xxl-8'>
        <div className='col-xxl-4'>
          <Requests 
            className='card-xxl-stretch mb-5 mb-xl-8' 
            solicitation={solicitation} 
            //name={intl.formatMessage({ id: 'PAGE.REQUEST' })} 
            name={'Pendente'}
            status={0} 
            actions={['analise', 'reprovar', 'encaminhar']}
          />
        </div>
        <div className='col-xxl-4'>
          <Requests 
            className='card-xxl-stretch mb-5 mb-xl-8' 
            solicitation={solicitation}
            name='Em análise' 
            status={1}
            actions={['exigencia', 'aprovar', 'reprovar', 'encaminhar']}
        />
        </div>
        <div className='col-xxl-4'>
          <Requests 
            className='card-xxl-stretch mb-5 mb-xl-8' 
            solicitation={solicitation}
            name='Em Exigência' 
            status={2}
            actions={['novaexigencia', 'aprovar', 'reprovar', 'encaminhar']}
        />
        </div>
        {/* <div className='col-xxl-4'>
          <Requests 
            className='card-xxl-stretch mb-5 mb-xl-8' 
            solicitation={solicitation} 
            name='Agendado' 
            status={3} 
            actions={['ematendimento', 'finalizar']}
          />
        </div> */}
        {/* Novo */}
        <div className='col-xxl-4'>
          <Requests 
            className='card-xxl-stretch mb-5 mb-xl-8' 
            solicitation={solicitation} 
            name='Em atendimento' 
            status={4} 
            actions={['novasecao', 'finalizar']}
          />
        </div>
        {/* Fim Novo */}
        <div className='col-xxl-4'>
          <Requests 
            className='card-xxl-stretch mb-5 mb-xl-8' 
            solicitation={solicitation} 
            name='Finalizado' 
            status={5}
            //actions={['solicitar']}
            actions={[]}
          />
        </div>
        <div className='col-xxl-4'>
          <Requests 
            className='card-xxl-stretch mb-5 mb-xl-8'
            solicitation={solicitation}
            name='Reprovado'
            status={6} 
            //actions={['solicitar']}
            actions={[]}
          />
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}

const Patients: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.PATIENTS' })}</PageTitle>
      <PatientsPage />
    </>
  )
}
export { Patients }
