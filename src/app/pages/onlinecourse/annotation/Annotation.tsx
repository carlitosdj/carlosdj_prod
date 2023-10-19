import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../design/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
// import { Component as Comp, ComponentState } from '../../../../store/ducks/component/types'
import Loading from '../../../design/loading'

import {ModuleWidget} from './AnnotationWidget'
import {loadMyAnnotationsRequest} from '../../../../store/ducks/annotations/actions'
import {AnnotationsState} from '../../../../store/ducks/annotations/types'

// const MOMENT= require( 'moment' );

type Props = {
  annotations: AnnotationsState
}
const ModulesPage: React.FC<React.PropsWithChildren<Props>> = ({annotations}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ModuleWidget annotations={annotations} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const Annotation: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const annotations = useSelector((state: ApplicationState) => state.annotations)
  const dispatch = useDispatch()
  const me = useSelector((state: ApplicationState) => state.me)

  useEffect(() => {
    dispatch(loadMyAnnotationsRequest(me.me.id!))
  }, [dispatch, me])

  // console.log("Component loaded", component)

  if (annotations.loading) {
    return <Loading />
  }

  // let today = MOMENT().format( 'YYYY-MM-DD HH:mm:ss.000' );

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Minhas anotações</PageTitle>
      <ModulesPage annotations={annotations} />
    </>
  )
}
export {Annotation}
