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
  // console.log("MODULOS", comp)
  const intl = useIntl()
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
                    {/* <th className='p-0 w-40px'></th> */}
                    <th className='p-0 min-w-150px'></th>
                    <th className='p-0 min-w-140px'></th>
                    <th className='p-0 min-w-110px'></th>
                    <th className='p-0 min-w-50px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {annotations.data?.map((annotation: any, index) => {
                    return (
                      <tr>
                        {/* <td>
                          <div className='m-2'>
                            <span className=''>
                              <KTSVG
                                className={'svg-icon-success svg-icon-2'}
                                path='/media/icons/duotune/abstract/abs034.svg'
                              />
                            </span>
                          </div>
                        </td> */}
                        <td>
                          <Link
                            className='fs-6 text-gray-800 text-hover-primary fw-bolder'
                            to={
                              '/class/' +
                              annotation.course_id +
                              '/' +
                              annotation.module_id +
                              '/' +
                              annotation.class_id
                            }
                            style={{display: 'flex'}}
                          >
                            {annotation.message}
                          </Link>
                          <span className='text-muted fw-bold d-block'>{annotation.aula}</span>
                        </td>
                        <td className='text-end text-muted fw-bold'>{annotation.modulo}</td>
                        {/* <td className='text-end'>
                      <span className='badge badge-light-success'>xxx</span>
                    </td> */}

                        {/* <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2'
                        />
                      </a>
                    </td> */}
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
