/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
  KTSVG,
  // toAbsoluteUrl
} from '../../../design/helpers'
import {ComponentState} from '../../../../store/ducks/component/types'
import {Link} from 'react-router-dom'
import {useIntl} from 'react-intl'

const MOMENT = require('moment')

type Props = {
  className: string
  comp: ComponentState
  id: string
}

let today = MOMENT().format('YYYY-MM-DD HH:mm:ss.000')
const add = (accumulator: number, a: number) => {
  return accumulator + a
}

const withLinkToModule = (text: any, id: any, module_id: any, isAvailable: boolean) => {
  if (isAvailable) {
    return (
      <Link
        to={'/class/' + id + '/' + module_id}
        style={{display: 'flex'}}
        className='fs-6 text-gray-800 text-hover-primary fw-bolder'
      >
        {text}
      </Link>
    )
  } else {
    return <div style={{color: '#a97a7a'}}>{text}</div>
  }
}

const ReplayWidget: React.FC<React.PropsWithChildren<Props>> = ({className, comp, id}) => {
  console.log('MODULOS', comp)
  const intl = useIntl()
  let faseDuration = 0;
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{comp.modules[0].parent?.name} </span>
          <span className='text-muted mt-1 fw-bold fs-7'>
            {intl.formatMessage({id: 'PAGE.SELECTAMODULETOSTART'})}
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
                  <tr className='fw-bolder text-muted'>
                    {/* <th className='w-20px'></th> */}
                    <th className='min-w-100px'>Módulo</th>
                    <th className='min-w-40px text-center'>Aulas</th>
                    <th className='min-w-50px text-center'>Liberação</th>
                    <th className='min-w-50px text-center'>Duração</th>
                    <th className='min-w-50px'>Conclusão</th>
                    {/* <th className='min-w-50px text-end'>Ação</th> */}
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {
                  comp.modules?.map((module: any, index) => {
                    let duration = module.children.reduce((total:number, currentValue:any) => total = total + currentValue.duration,0)
                    faseDuration+=duration;

                    let module_length = module.children!.length
                    let conclusao = Math.round(
                      (module.children
                        .map((aula: any) => aula.completed.filter((ac:any) => ac.status === '1').length).reduce(add, 0) / module_length) *100
                      )

                    let dataAvailable = MOMENT(module.available[0]?.availableDate).format(
                      'YYYY-MM-DD HH:mm:ss.000'
                    )

                    let dataAvailableMoment = MOMENT(
                      module.available[0]?.availableDate
                    ).format('DD/MM')

                    let isAvailable = module.available[0]
                      ? MOMENT(today).isAfter(dataAvailable)
                        ? true
                        : false
                      : false

                    let textAvailable = module.available[0]
                      ? isAvailable
                        ? 'Liberado'
                        : 'Disponível em: ' + dataAvailableMoment
                      : 'A definir'

                    return (
                      <tr key={index}>
                        {/* <td>
                          <div className=''>
                            <span className=''>
                              {/* <img
                            src={toAbsoluteUrl('/media/icons/duotune/abstract/abs022.svg')}
                            className='h-50 align-self-center'
                            alt=''
                          /> *x/}
                              <KTSVG
                                className={'svg-icon-success svg-icon-2'}
                                path='/media/icons/duotune/abstract/abs034.svg'
                              />
                            </span>
                          </div>
                        </td> */}
                        <td>
                          {withLinkToModule(module.name, id, module.id, isAvailable)}
                          {/* <span className='text-muted fw-bold d-block'>{module.description}</span> */}
                        </td>
                        <td className='text-center text-muted fw-bold'>
                          {module.children!.length}
                          {/* {intl.formatMessage({id: 'MENU.CLASSES'})} */}
                        </td>
                        <td className='text-center'>
                          <span className='badge badge-light-success'>
                            {intl.formatMessage({id: textAvailable})}
                          </span>
                        </td>
                        <td className='text-center text-muted fw-bold'>
                          {MOMENT.duration(duration, "seconds").format("hh:mm:ss", {trim: true})}
                        </td>
                        <td className='text-end'>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>
                              <span className='text-muted me-2 fs-7 fw-bold'>{conclusao}%</span>
                            </div>
                            <div className='progress h-6px w-100'>
                              <div
                                className='progress-bar bg-primary'
                                role='progressbar'
                                style={{width: conclusao + '%'}}
                              ></div>
                            </div>
                          </div>
                        </td>
                        

                        {/* <td className='text-end'>
                      <Link to={'/class/' + id + '/' + module.id} style={{display:'flex' }} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2'
                        />
                      </Link>
                    </td> */}
                      </tr>
                    )
                  })}
                </tbody>
                {/* end::Table body */}
               
              </table>
              Duração da fase: {MOMENT.duration(faseDuration, "seconds").format("hh:mm:ss", {trim: true})}
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

export {ReplayWidget}
