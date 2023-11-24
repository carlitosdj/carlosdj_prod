/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {
  KTSVG,
  // toAbsoluteUrl
} from '../../../design/helpers'
import {
  // Table,
  // Button,
  Modal,
} from 'react-bootstrap-v5'
import {useIntl} from 'react-intl'
import {SupportState} from '../../../../store/ducks/support/types'
import CreateSupport from './create'

const MOMENT = require('moment')

type Props = {
  className: string
  supports: SupportState
}

const MySupportWidget: React.FC<React.PropsWithChildren<Props>> = ({className, supports}) => {
  // console.log("MODULOS", comp)
  const intl = useIntl()
  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => {
    setShow(false)
  }
  const createSupport = () => {
    setShow(true)
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo chamado ao Suporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateSupport handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>
              {intl.formatMessage({id: 'MENU.SUPPORT'})}
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>Chamados na plataforma</span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <a
              href='#!'
              className='btn btn-sm btn-light-primary'
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
              onClick={() => createSupport()}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo chamado
            </a>
          </div>
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
                      <th className='p-0 w-50px'>#Id</th>
                      <th className='p-0 min-w-140px'>Data</th>
                      <th className='p-0 min-w-140px'>Mensagem</th>
                      <th className='p-0 min-w-110px'>Resposta</th>
                      <th className='p-0 min-w-50px'>Status</th>
                      <th className='p-0 min-w-50px'>Repondido por</th>
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {supports.data.map((support, index) => {
                      return (
                        <tr key={index}>
                          <td className='text-left fw-bold'>
                            #{support.id}
                          </td>
                          <td>
                            <span className='text-left text-muted fw-bold d-block'>
                              {MOMENT(support.createdAt).format('DD/MM/YYYY HH:mm')}
                            </span>
                          </td>
                          <td className='text-left fw-bold'>{support.message}</td>
                          <td className='text-left fw-bold'>{support.reply}</td>
                          <td className='text-left'>
                            <span className='badge badge-light-success'>
                              {support.status ? 'Respondido' : 'Não respondido'}
                            </span>
                          </td>
                          <td className='text-left fw-bold'>{support.parentAdmin?.name}</td>
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

export {MySupportWidget}
