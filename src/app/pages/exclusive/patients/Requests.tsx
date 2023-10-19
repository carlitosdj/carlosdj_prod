/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
//import {useIntl} from 'react-intl'
import {Solicitation, SolicitationState} from '../../../../store/ducks/solicitation/types'
import Loading from '../../../design/loading'
//import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {History} from './History'
import {FormReproval} from './FormReproval'
import {FormAnalise} from './FormAnalise'
import {FormSchedule} from './FormSchedule'
import {FormFinalize} from './FormFinalize'
import {FormForward} from './FormForward'
import {FormRequirement} from './FormRequirement'
//import {FormToAttendance} from './FormToAttendance'
import {FormNewSection} from './FormNewSection'
import Actions from './Actions'

//import {KTSVG, toAbsoluteUrl} from '../../../helpers'
const MOMENT = require('moment')

type Props = {
  className: string
  solicitation: SolicitationState
  name: string
  status: number
  actions: string[]
}

const Requests: React.FC<Props> = ({className, solicitation, name, status, actions}) => {
  // const intl = useIntl()
  // const dispatch = useDispatch()

  const [showHistory, setShowHistory] = useState(false)
  const [showAnalise, setShowAnalise] = useState(false)
  const [showRequirement, setShowRequirement] = useState(false)

  const [showScheduling, setShowScheduling] = useState(false)
  const [showFinalize, setShowFinalize] = useState(false)
  const [showReproval, setShowReproval] = useState(false)
  const [showForward, setShowForward] = useState(false)
  //const [showToAttendance, setShowToAttendance] = useState(false)
  const [showNewSection, setShowNewSection] = useState(false)

  const [message, setMessage] = useState('')
  const [data, setData] = useState<Solicitation>()
  //const [confirmReproval, setConfirmReproval] = useState('')

  const me = useSelector((state: ApplicationState) => state.me)

  const statusToText = (status: number) => {
    switch (status) {
      case 0:
        return 'PENDENTE'
      //break
      case 1:
        return 'ANALISE'
      //break
      case 2:
        return 'EM EXIGÊNCIA'
      //break
      case 3:
        return 'AGENDADO'
      //break
      case 4:
        return 'EM ATENDIMENTO'
      //break
      case 5:
        return 'FINALIZADO'
      //break
      case 6:
        return 'REPROVADO'
      //break
      default:
        break
    }
  }
  //console.log("Data", data)

  const handleClose = () => {
    setShowReproval(false)
    setShowHistory(false)
    setShowAnalise(false)
    setShowScheduling(false)
    setShowFinalize(false)
    setShowForward(false)
    setShowRequirement(false)
    //setShowToAttendance(false)
    setShowNewSection(false)
    setMessage('')
  }

  //Numero de pacientes que será exibido na header do componente
  let patientNumber = solicitation.all.filter(
    (e) => e.status === status && e.parentUser?.id === me.me.id
  ).length

  return (
    <>
      <History handleClose={handleClose} show={showHistory} data={data} />
      <FormAnalise
        show={showAnalise}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />
      <FormRequirement
        show={showRequirement}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />
      <FormSchedule
        show={showScheduling}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />
      {/* <FormToAttendance
        show={showToAttendance}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      /> */}
      <FormNewSection
        show={showNewSection}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />
      <FormFinalize
        show={showFinalize}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />
      <FormReproval
        show={showReproval}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />
      <FormForward
        show={showForward}
        data={data}
        handleClose={handleClose}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>{name}</span>
            <span className='text-muted mt-1 fw-bold fs-7'>
              {patientNumber === 1 ? '1 paciente' : patientNumber + ' pacientes'}
            </span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive' style={{overflow: 'visible'}}>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}

              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-100px'>Paciente</th>
                  <th className='min-w-50px text-end'>Ações</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              {solicitation.loading && <Loading />}
              <tbody>
                {!solicitation.loading &&
                  solicitation.all.map((data: Solicitation, index) => {
                    let state = statusToText(status)
                    let created_atFilter = data.history?.filter(
                      (history) => history.type_history === state
                    )[0]
                    let created_at = MOMENT(new Date(Number(created_atFilter?.created_at) * 1000))

                    //console.log("HEY", created_at)

                    // let session_number = data?.history?.filter(
                    //   (e) => e.type_history === 'AGENDADO' || e.type_history === 'EM ATENDIMENTO'
                    // ).length
                    let last_history = data?.history![0]
                    let last_detail_data = last_history.detail?.filter(
                      (e) => e.type_detail === 'Data'
                    )[0]
                    let last_detail_time = last_history.detail?.filter(
                      (e) => e.type_detail === 'Horário'
                    )[0]

                    if (data.status === status && data.parentUser!.id === me.me.id)
                      return (
                        <tr key={index}>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='symbol symbol-45px me-5'>
                                <img
                                  alt=''
                                  src={
                                    data.parentPatient?.profile?.image?.includes('https://')
                                      ? data.parentPatient?.profile?.image
                                      : 'https://labiopalatina.com.br/files/' +
                                        data.parentPatient?.profile?.image
                                  }
                                  style={{width: '100%'}}
                                  onError={({currentTarget}) => {
                                    currentTarget.onerror = null // prevents looping
                                    currentTarget.src =
                                      'https://salvemaisum.com.br/media/guestuser.jpg'
                                  }}
                                />
                              </div>
                              <div className='d-flex justify-content-start flex-column'>
                                <a
                                  href='#'
                                  onClick={() => {
                                    setData(data)
                                    setShowHistory(true)
                                  }}
                                  className='text-dark fw-bolder text-hover-primary fs-7'
                                >
                                  {data.parentPatient?.profile?.name}
                                </a>
                                <span className='text-muted fw-bold text-muted d-block fs-8'>
                                  {data.parentPatient?.profile?.cityParent?.name}
                                  {' / '}
                                  {data.parentPatient?.profile?.stateParent?.state}
                                </span>
                                <span className='text-muted fw-bold text-muted d-block fs-8'>
                                  {created_at.format('DD/MM/YYYY HH:mm')}
                                  {data.session &&
                                  last_detail_data?.value_detail &&
                                  last_detail_time?.value_detail ? (
                                    <div
                                      className='p-2 m-1'
                                      style={{borderRadius: 5, backgroundColor: '#efefef'}}
                                    >
                                      {/* <div className='text-dark fs-8'>
                                        Nº Próxima sessão: {session_number}
                                      </div> */}
                                      <div className='text-dark fs-8'>
                                        Nº Próxima sessão: {data.session}
                                      </div>
                                      <div className='text-dark fs-8'>
                                        Data: {last_detail_data?.value_detail}
                                      </div>
                                      <div className='text-dark fs-8'>
                                        Horário: {last_detail_time?.value_detail}
                                      </div>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            {/* <div className='d-flex justify-content-end flex-shrink-0'> */}
                            <div className='d-flex flex-column flex-shrink-0'>
                              <Actions
                                actions={actions}
                                data={data}
                                setData={setData}
                                setShowAnalise={setShowAnalise}
                                setShowFinalize={setShowFinalize}
                                setShowForward={setShowForward}
                                setShowNewSection={setShowNewSection}
                                setShowReproval={setShowReproval}
                                setShowRequirement={setShowRequirement}
                                setShowScheduling={setShowScheduling}
                                //setShowToAttendance={setShowToAttendance}
                                setShowHistory={setShowHistory}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    return ''
                  })}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export {Requests}
