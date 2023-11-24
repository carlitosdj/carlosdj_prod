/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
  KTSVG,
  // toAbsoluteUrl
} from '../../../design/helpers'
// import { ComponentState } from '../../../../store/ducks/component/types'
import {Link} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {AnnotationsState} from '../../../../store/ducks/annotations/types'
import { Annotation } from '../../../../store/ducks/annotation/types'
import { useDispatch } from 'react-redux'
import { deleteAnnotationRequest } from '../../../../store/ducks/annotations/actions'

// const MOMENT= require( 'moment' );

type Props = {
  className: string
  annotations: AnnotationsState
}

// let today = MOMENT().format( 'YYYY-MM-DD HH:mm:ss.000' );
// const add = (accumulator: number, a: number) => {
//   return accumulator + a;
// }

const ModuleWidget: React.FC<React.PropsWithChildren<Props>> = ({className, annotations}) => {
  console.log('annotations', annotations)
  const intl = useIntl()

  const dispatch = useDispatch()

  // Deleta componente: CHILD
  const deleteAnnotation = (annotation: Annotation) => {
    //console.log("annotation",annotation)
    dispatch(deleteAnnotationRequest(annotation.id!))
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'MENU.ANNOTATIONS'})}
          </span>
          <span className='text-muted mt-1 fw-bold fs-7'>
            {intl.formatMessage({id: 'PAGE.SELECTAANNOTATION'})}
          </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='border-0'>
                    {/* <th className='p-2 min-w-150px'>Comentário</th>
                    <th className='p-2 min-w-140px'>Aula</th>
                    <th className='p-2 min-w-110px'>Módulo</th>
                    <th className='p-2 min-w-50px'>Curso</th>
                    <th className='p-2 min-w-50px text-end'>Ação</th> */}
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {annotations.data?.map((annotation: any, index) => {
                    return (
                      <tr>
                        <td>
                          <Link
                            className='fs-6 text-gray-800 text-hover-primary fw-bolder'
                            to={
                              '/class/' +
                              annotation.parentComponent.parent.componentId +
                              '/' +
                              annotation.parentComponent.parent.id +
                              '/' +
                              annotation.parentComponent.id
                            }
                            style={{display: 'flex'}}
                          >
                            {annotation.message}
                          </Link>
                        </td>
                        <td className='text-muted fw-bold'>{annotation.parentComponent.name}</td>
                        <td className='text-muted fw-bold'>
                          {annotation.parentComponent.parent.name}
                        </td>
                        <td className='text-muted fw-bold'>
                          {annotation.parentComponent.parent.parent.name}
                        </td>

                        <td className='text-end'>
                          <a
                            href='#!'
                            onClick={() => {
                              if (
                                window.confirm('Deseja realmente excluir?')
                              )
                                deleteAnnotation(annotation)
                            }}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ModuleWidget}
