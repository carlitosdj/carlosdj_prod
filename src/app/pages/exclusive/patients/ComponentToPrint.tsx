import React from 'react'
import {Solicitation} from '../../../../store/ducks/solicitation/types'
const MOMENT = require('moment')

interface Props {
  data: Solicitation | undefined
}
// Using a class component, everything works without issue
export class ComponentToPrint extends React.Component<Props> {
  render() {
    var now = MOMENT(Date()).format('DD/MM/YYYY HH:mm')
    return (
      <div style={{color: 'black'}}>
        <br />
        <br />
        <h1 style={{color: 'black'}}>Prontuário - Associação LabioPalatina</h1>
        <br />
        <span style={{color: 'black'}}>Número da solicitação: {this.props.data?.id}</span>
        <br />
        <span style={{color: 'black'}}>Data da impressão: {now}</span>

        {this.props.data?.feedback?.length ? (
          <>
            <h3>Pesquisa de satisfação</h3>
            <br />
            <br />
            Resposta em texto: {this.props.data.feedback_patient}
            <br />
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}

              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-100px'>Pergunta</th>
                  <th className='min-w-100px'>Resposta</th>
                  <th className='min-w-50px'>Escrita</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data?.feedback?.map((anm, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>{anm.question}</div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <span style={{color: anm.answer === 'Sim' ? '#2980b9' : '#e74c3c'}}>
                            {anm.answer}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>{anm.wroteanswer}</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <br />
          </>
        ) : (
          ''
        )}

        <h3>Histórico</h3>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 '>
          {/* begin::Table head */}

          <thead>
            <tr className='fw-bolder text-muted'>
              {/* <th className='w-25px'>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                            className='form-check-input'
                            type='checkbox'
                            value='1'
                            data-kt-check='true'
                            data-kt-check-target='.widget-9-check'
                            />
                        </div>
                        </th> */}
              <th className='min-w-100px'>Data</th>
              <th className='min-w-100px'>Status</th>
              {/* <th className='min-w-100px'>Cidade/UF</th> */}
              {/* <th className='min-w-50px'>S</th> */}
              <th className='min-w-50px text-end'>Responsável</th>
              {/* <th className='min-w-50px'>Mensagem</th> */}
            </tr>
          </thead>
          <tbody>
            {this.props.data?.history?.map((data, index) => {
              let created_at = MOMENT(new Date(Number(data.created_at) * 1000))
              return (
                <>
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center'>
                        {created_at.format('DD/MM/YYYY HH:mm:ss')}
                      </div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>{data?.type_history}</div>
                    </td>
                    <td>
                      <div className='text-end'>
                        {/* {data?.parentUser?.profile?.name} */}
                        {data?.parentPatient?.profile?.name || data?.parentUser?.profile?.name}
                      </div>
                    </td>
                    {/* <td>
                                    <div className='d-flex align-items-center'>
                                        {data?.message}
                                        <br/>
                                    </div>
                                </td> */}
                  </tr>

                  {(data.detail?.length || data?.message) && (
                    <tr>
                      <td colSpan={6} key={index + 'b'}>
                        <div
                          style={{
                            width: '100%',
                            border: '1px dashed #aeaeae',
                            backgroundColor: '#F4F7F9',
                            justifyContent: 'space-between',
                            padding: 10,
                            flex: 1,
                          }}
                        >
                          {data.detail?.map((detail) => {
                            if (detail.type_detail === 'img')
                              return (
                                <img
                                  alt=''
                                  src={'https://labiopalatina.com.br/files/' + detail.value_detail}
                                  className='col-md-3 p-2 col-6'
                                ></img>
                              )
                            return (
                              <div className='text-info'>
                                {detail.type_detail}: {detail.value_detail}
                              </div>
                            )
                          })}
                          {data?.message && (
                            <div className='text-info' style={{whiteSpace: 'pre-line'}}>
                              {data?.message}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>

        <h3>Pré-consulta</h3>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 pt-0'>
          {/* begin::Table head */}

          <thead>
            <tr className='fw-bolder text-muted'>
              {/* <th className='w-25px'>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                            className='form-check-input'
                            type='checkbox'
                            value='1'
                            data-kt-check='true'
                            data-kt-check-target='.widget-9-check'
                            />
                        </div>
                        </th> */}
              <th className='min-w-100px'>Pergunta</th>
              <th className='min-w-100px'>Resposta</th>
              {/* <th className='min-w-100px'>Cidade/UF</th> */}
              {/* <th className='min-w-50px'>S</th> */}
              <th className='min-w-50px'>Escrita</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data?.anamnese?.map((anm, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>{anm.question}</div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <span style={{color: anm.answer === 'Sim' ? '#2980b9' : '#e74c3c'}}>
                        {anm.answer}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>{anm.wroteanswer}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h3>Mais sobre o paciente</h3>
        <div className='row'>
          <div className='col-md-3'>
            <img
              alt=''
              src={
                'https://labiopalatina.com.br/files/' +
                this.props.data?.parentPatient?.profile?.image
              }
              width={'100%'}
            />
          </div>
          <div className='col-md-8 mt-3 mb-2'>
            {this.props.data?.parentPatient?.profile?.name}
            <br />
            {this.props.data?.parentPatient?.email}
            <br />
            {this.props.data?.parentPatient?.profile?.address},{' '}
            {this.props.data?.parentPatient?.profile?.addressNumber},{' '}
            {this.props.data?.parentPatient?.profile?.addressDistrict} -{' '}
            {this.props.data?.parentPatient?.profile?.cityParent?.name}/
            {this.props.data?.parentPatient?.profile?.stateParent?.name}
            <br />
            {this.props.data?.parentPatient?.profile?.cpf}
            <br />
            {this.props.data?.parentPatient?.profile?.whatsapp}
            <br />
          </div>
        </div>

        <br />
      </div>
    )
  }
}
