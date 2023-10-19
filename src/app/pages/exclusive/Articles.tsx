import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../design/layout/core'
import {useIntl} from 'react-intl'
import {CourseWidget1} from '../CourseWidget1'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../store'
import {useDispatch} from 'react-redux'
import {
  loadComponentRequest,
  loadLastClassRequest,
  loadLastLiveClassRequest,
} from '../../../store/ducks/component/actions'
import Loading from '../../design/loading'

const ArticlesPage: FC<React.PropsWithChildren<unknown>> = () => {
  const me = useSelector((state: ApplicationState) => state.me)
  const component = useSelector((state: ApplicationState) => state.component)
  const dispatch = useDispatch()
  //const intl = useIntl()

  useEffect(() => {
    dispatch(loadLastLiveClassRequest())
    dispatch(loadLastClassRequest(me.me.id!))
    dispatch(loadComponentRequest('74', 'desc'))
  }, [])

  return (
    <>
      {/* begin::Row */}
      {/* <h3 className='page-title mt-0 mb-5'>{intl.formatMessage({ id: 'PAGE.TRAINNINGS' })}</h3> */}
      {/* <h3 className='page-title mt-0 mb-5'>Treinamentos</h3> */}
      <div className='row gy-5 g-xl-8'>
        {component.loading && <Loading />}
        {!component.loading &&
          component.data.children?.map((data, index) => {
            return (
              <div className='col-xxl-2 col-6' key={index}>
                <CourseWidget1
                  data={data}
                  link={'/article/' + data.id}
                  className='card-xl-stretch mb-xl-8'
                />
              </div>
            )
          })}
      </div>
      {/* end::Row */}
    </>
  )
}

const Articles: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.BOOKS'})}</PageTitle>
      <ArticlesPage />
    </>
  )
}
export {Articles}
