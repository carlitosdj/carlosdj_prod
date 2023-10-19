/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
  KTSVG, toAbsoluteUrl,
  // toAbsoluteUrl
} from '../../design/helpers'
// import { ComponentState } from '../../../../store/ducks/component/types'
import {Link} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {AnnotationsState} from '../../../store/ducks/annotations/types'
import { ComponentState } from '../../../store/ducks/component/types'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { Alert } from 'react-bootstrap-v5'
const MOMENT = require('moment')
require("moment-duration-format");
// const MOMENT= require( 'moment' );

type Props = {
  className: string
  component: ComponentState
}

// let today = MOMENT().format( 'YYYY-MM-DD HH:mm:ss.000' );
// const add = (accumulator: number, a: number) => {
//   return accumulator + a;
// }

const SearchWidget: React.FC<React.PropsWithChildren<Props>> = ({className, component}) => {
  console.log("SEARCHxxxxxxxxxx", component)
  const intl = useIntl()
  const me = useSelector((state: ApplicationState) => state.me)
  var created_at = MOMENT(new Date(Number(me.me.created_at) * 1000)) //.format('DD/MM/YYYY HH:mm')
  var now = MOMENT(new Date()) //.format('DD/MM/YYYY HH:mm')
  let blockAreas = (now.diff(created_at, 'years', true).toFixed(2) > 1);

  return (
    <>
    
    
    
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'MENU.SEARCH'})}
          </span>
          {component.search.length ?
          <span className='text-muted mt-1 fw-bold fs-7'>
            Clique no nome da aula para ser redirecionado. <br/>
            Resultados: {component.search.length}
          </span>
          : 
          <span className='text-muted mt-1 fw-bold fs-7'>
            Digite sua busca no campo acima.
          </span>}
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
                    <th className='p-0 w-30px'></th>
                    <th className='p-0 min-w-150px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                
                <tbody>
                
                  {component.search?.map((component: any, index) => {

                    const terms = ["mentoria", "terça musical", "quinta teórica", "terca musical", "quinta teorica", "turma 2", "turma 1"]
                    const result = terms.some(term => component.parentName.toLowerCase().includes(term))
                    return (

                      <tr key={index} className={result && blockAreas? 'block':''}>
                        
                        <td >
                        <Link
                            className='fs-6 text-gray-800 text-hover-primary fw-bolder'
                            to={
                              '/class/' +
                              component.firstId +
                              '/' +
                              component.parentId +
                              '/' +
                              component.id
                            }
                            style={{display: 'flex'}}
                          >
                            <div
                              style={{
                                width:100, 
                                pointerEvents: 'none',
                                backgroundImage: result && blockAreas
                                  ? `url(${toAbsoluteUrl('/media/violaofeeling/cadeado.png')})`
                                  : '',
                                backgroundPosition: 'right top',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                
                            }}
                            >
                              <div className={blockAreas && result ? 'block' : ''} >
                                <iframe
                                    title='video'
                                    className='embed-responsive-item rounded'
                                    src={component.value_extra}
                                    
                                    style={{
                                      width:100, 
                                      pointerEvents: 'none',
                                      // backgroundImage: result && blockAreas
                                      //   ? `url(${toAbsoluteUrl('/media/violaofeeling/cadeado.png')})`
                                      //   : '',
                                      // backgroundPosition: 'right top',
                                      // backgroundRepeat: 'no-repeat',
                                      // backgroundSize: 'cover',
                                    }}
                                    height={75}
                                    frameBorder={0}
                                    // allow='autoplay; fullscreen'
                                    // allowFullScreen
                                  />
                            </div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <Link
                            className='fs-6 text-gray-800 text-hover-primary fw-bolder'
                            to={
                              '/class/' +
                              component.firstId +
                              '/' +
                              component.parentId +
                              '/' +
                              component.id
                            }
                            style={{display: 'flex'}}
                          >
                            {component.name}
                          </Link>
                          {/* <span className='text-muted fw-bold d-block'>{component.parent.name}</span> */}
                          <span className='text-muted fw-bold d-block'>{component.parentName}</span>
                          <span className='text-muted fw-bold d-block'>Duração: {MOMENT.duration(component.duration, "seconds").format("hh:mm:ss", {trim: true})}</span>
                        </td>
                        
                        {/* <td className='text-end text-muted fw-bold'>{component.parentName}</td> */}
                        {/* component.search.map((component,index) => 
                            <div key={index}>
                              {component.parentName} {component.name} {component.id} {component.parentId} {component.firstId} {component.value_extra}
                            </div>
                        ) */}
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
    </>
  )
}

export {SearchWidget}
