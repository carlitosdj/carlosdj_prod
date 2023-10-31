/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
  KTSVG,
  // toAbsoluteUrl
} from '../../../design/helpers'
import {ComponentState} from '../../../../store/ducks/component/types'
// import { Link } from "react-router-dom";
import {useIntl} from 'react-intl'

// const MOMENT= require( 'moment' );

type Props = {
  className: string
  comp: ComponentState
  id: string
}

// let today = MOMENT().format( 'YYYY-MM-DD HH:mm:ss.000' );
// const add = (accumulator: number, a: number) => {
//   return accumulator + a;
// }

// const withLinkToModule = (text: any, id: any, module_id: any, isAvailable: boolean) => {
//   if (isAvailable) {
//     return (
//       <Link to={'/class/' + id + '/' + module_id} style={{display:'flex' }} className='fs-6 text-gray-800 text-hover-primary fw-bolder'>
//         {text}
//       </Link>
//     )
//   } else {
//     return (<div style={{ color: '#a97a7a'}}>{text}</div>);
//   }
// }

const ModuleWidget: React.FC<React.PropsWithChildren<Props>> = ({className, comp, id}) => {
  // console.log("MODULOS", comp)
  const intl = useIntl()
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'MENU.AGENDA'})}
          </span>
          <span className='text-muted mt-1 fw-bold fs-7'>Informações úteis sobre a agenda</span>
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
                  {comp.modules?.map((module: any, index) => {
                    // let conclusao = Math.round(module.children.map((aula:any) => aula.completed.length).reduce(add,0) / module.children!.length * 100);
                    // let dataAvailable = MOMENT(module.available[0]?.available_date).format("YYYY-MM-DD HH:mm:ss.000");
                    // let dataAvailableMoment = MOMENT(module.available[0]?.available_date).format("DD/MM");
                    // let isAvailable = module.available[0] ? MOMENT(today).isAfter(dataAvailable)? true : false : false;
                    // let textAvailable =  module.available[0] ? isAvailable ? "Liberado" : "Disponível em: " + dataAvailableMoment : "A definir";

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
                          {/* {withLinkToModule(module.name, id, module.id, isAvailable)} */}
                          {module.name}
                          <span className='text-muted fw-bold d-block'>{module.description}</span>
                        </td>
                        {/* <td className='text-end text-muted fw-bold'>{module.children!.length} {intl.formatMessage({id: 'MENU.CLASSES'})}</td> */}
                        {/* <td className='text-end'>
                      <span className='badge badge-light-success'>{intl.formatMessage({id: textAvailable})}</span>
                    </td> */}
                        {/* <td className="text-end project_progress">
                      <div className="progress progress-sm">
                        <div className="progress-bar" role="progressbar" aria-valuenow={conclusao} aria-valuemin={0} aria-valuemax={100} style={{width: conclusao + '%', backgroundColor: '#00BFFE'}}>
                        </div>
                      </div>
                      <small>
                        {conclusao}% Concluído
                      </small>
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
