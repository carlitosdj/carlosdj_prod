/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {ComponentState} from '../../../../store/ducks/component/types'
import {Link, useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../design/helpers'
import {useSelector, useDispatch} from 'react-redux'
import {
  createAulaConcluidaRequest,
  deleteAulaConcluidaRequest,
} from '../../../../store/ducks/component/actions'
import {ApplicationState} from '../../../../store'
const MOMENT = require('moment')
require('moment-duration-format')

type Props = {
  className: string
  comp: ComponentState
  selectedClass: any
  module_id: string
  id: string
}

const MenuClassWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  comp,
  selectedClass,
  module_id,
  id,
}) => {
  // console.log("VER AQUI!!!!", comp)
  // console.log("VER AQUI!!!! ID", id)
  const intl = useIntl()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const me = useSelector((state: ApplicationState) => state.me)
  //Checa se tem aula passada e próxima aula para liberar os botões de navegação:
  var indexClass = comp.classes
    .map((e: any) => {
      return e.id
    })
    .indexOf(selectedClass.id)
  let pastClass = comp.classes[indexClass - 1]
  let nextClass = comp.classes[indexClass + 1]

  var indexModule = comp.modules
    .map((e: any) => {
      return e.id
    })
    .indexOf(Number(module_id))
  let nextModule = comp.modules[indexModule + 1]
  let pastModule = comp.modules[indexModule - 1]

  console.log('next module', nextModule)

  let today = MOMENT(new Date()).format('YYYY-MM-DD HH:mm:ss.000')
  let dataAvailable = nextModule ? nextModule.available[0]?.availableDate : ''
  let isAvailable = nextModule
    ? nextModule.available[0]
      ? MOMENT(today).isAfter(dataAvailable)
        ? true
        : false
      : false
    : false

  console.log('isAvailable', isAvailable)

  //  let isAvailable = true

  const completed = (aula: any) => {
    console.log('AULACONCLUIDA-LENGTH', aula.completed.length)
    if (aula.completed[0]?.status === '1') {
      //Desmarcar
      // dispatch(deleteAulaConcluidaRequest(aula.completed[0].id, aula))
      dispatch(
        createAulaConcluidaRequest(aula.completed[0]?.id, me.me.id!, aula.id, aula.parent.id, 0)
      )
    } else {
      // console.log('MARCAR como concluida', aula)
      dispatch(
        createAulaConcluidaRequest(aula.completed[0]?.id, me.me.id!, aula.id, aula.parent.id, 1)
      )
    }
  }

  const goBackClass = () => {
    //console.log('past')
    var index = comp.classes
      .map((e: any) => {
        return e.id
      })
      .indexOf(selectedClass.id)
    let past = comp.classes[index - 1]

    if (past) {
      navigate('/class/' + id + '/' + module_id + '/' + past.id)
    }
  }

  const goNextClass = () => {
    //console.log('next')
    var index = comp.classes
      .map((e: any) => {
        return e.id
      })
      .indexOf(selectedClass.id)
    let next = comp.classes[index + 1]

    if (
      selectedClass.completed[0]?.status === '0' ||
      selectedClass.completed[0]?.status === null ||
      !selectedClass.completed.length
    )
      completed(selectedClass)
    //completed(selectedClass)
    if (next) {
      navigate('/class/' + id + '/' + module_id + '/' + next.id)
    }
  }

  const goBackModule = () => {
    // console.log("atual", module_id)
    // console.log("modulos atuais", component.modules)
    var index = comp.modules
      .map((e: any) => {
        return e.id
      })
      .indexOf(Number(module_id))
    // console.log("Index", index)
    let past = comp.modules[index - 1]

    if (past) {
      navigate('/class/' + id + '/' + past.id)
    }
  }

  const goNextModule = () => {
    // console.log("atual", module_id)
    // console.log("modulos atuais", component.modules)
    var index = comp.modules
      .map((e: any) => {
        return e.id
      })
      .indexOf(Number(module_id))
    // console.log("Index", index)
    let next = comp.modules[index + 1]

    if (!selectedClass.completed.length) completed(selectedClass)

    if (next) {
      navigate('/class/' + id + '/' + next.id)
    }
  }

  // console.log('COMPONENT', comp)
  return (
    <div className={`card ${className}`}>
      {/* begin::Beader */}
      <div className='card-header border-0 py-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {/* intl.formatMessage({id: 'MENU.CLASSES'}) */} {selectedClass.parent?.name}
          </span>

          <span className='text-muted fw-bold fs-7'>
            {intl.formatMessage({id: 'PAGE.CLICKTOPLAY'})}
          </span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='m-5 d-flex flex-column'>

        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%'}}>
          {pastClass ? (
            <button
              type='button'
              className='btn-block btn btn-primary mx-1 mb-2'
              style={{ flexGrow: 1}}
              onClick={() => goBackClass()}
            >
              Aula anterior
            </button>
          ) : pastModule ? (
            <button
              type='button'
              className='btn-block btn btn-primary mx-1 mb-2'
              style={{ flexGrow: 1}}
              onClick={() => goBackModule()}
            >
              Módulo anterior
            </button>
          ) : (
            ''
          )}
          {nextClass ? (
            <button
              type='button'
              className='btn-block btn btn-primary mx-1 mb-2'
              style={{ flexGrow: 1}}
              onClick={() => goNextClass()}
            >
              Próxima aula
            </button>
          ) : nextModule && isAvailable ? (
            <button
              type='button'
              style={{ flexGrow: 1}}
              className='btn-block btn btn-primary mx-1 mb-2'
              onClick={() => goNextModule()}
            >
              Próximo módulo
            </button>
          ) : (
            ''
          )}
        </div>

        {comp.classes?.map((aula: any, index: any) => {
          return (
            <div className='mt-1' key={index}>
              {/* begin::Item */}
              <div
                className='d-flex flex-stack mb-1 p-2 rounded'
                style={{backgroundColor: aula.id === selectedClass.id ? '#efefef' : 'transparent'}}
              >
                {/* begin::Section */}
                <div className='d-flex align-items-center m-1'>
                  {/* begin::Symbol */}
                  {/* <div className='m-3'>
                    <div className='symbol-label'>
                      <KTSVG
                        className={
                          aula.id === selectedClass.id
                            ? 'svg-icon-success svg-icon-2'
                            : 'svg-icon-2'
                        }
                        path='/media/icons/duotune/arrows/arr024.svg'
                      />
                    </div>
                  </div> */}
                  {/* end::Symbol */}

                  {/* begin::Title */}
                  <div>
                    <Link
                      to={'/class/' + id + '/' + module_id + '/' + aula.id}
                      className='text-gray-800 text-hover-primary fw-bolder'
                    >
                      {aula.name}
                      <br />
                      <span className='text-end text-muted fw-bold' style={{fontSize: 11}}>
                        <KTSVG
                          className='svg-icon-5 svg-icon-alert'
                          path='/media/icons/duotune/general/gen013.svg'
                        />
                        &nbsp;
                        {MOMENT.duration(aula.duration, 'seconds').format('hh:mm:ss', {trim: true})}
                      </span>
                    </Link>

                    {/* <div className='fs-7 text-muted fw-bold mt-1'>{aula.description}</div> */}
                  </div>

                  {/* end::Title */}
                </div>
                {/* end::Section */}

                {/* begin::Label */}
                <div className='fw-bold py-2 px-1'>
                  {comp.loadingAulaConcluida && comp.loadingAulaConcluidaId === aula.id ? (
                    <span className='spinner-border spinner-border-sm'></span>
                  ) : (
                    <Link to='#' onClick={() => completed(aula)}>
                      <div style={{display: 'flex'}}>
                        {aula.completed.length ? (
                          aula.completed[0].status === '1' ? (
                            <KTSVG
                              className='svg-icon-2 svg-icon-success'
                              path='/media/icons/duotune/arrows/arr016.svg'
                            />
                          ) : (
                            <KTSVG
                              className='svg-icon-2'
                              path='/media/icons/duotune/arrows/arr029.svg'
                            />
                          )
                        ) : (
                          <KTSVG
                            className='svg-icon-2'
                            path='/media/icons/duotune/arrows/arr029.svg'
                          />
                        )}
                      </div>
                    </Link>
                  )}
                </div>
                {/* end::Label */}
              </div>
              {/* end::Item */}
            </div>
          )
        })}

        {/* end::Items */}
        {/* {pastClass ? (
          <button
            type='button'
            className='btn-block btn btn-primary m-2'
            onClick={() => goBackClass()}
          >
            Aula anterior
          </button>
        ) : pastModule ? (
          <button
            type='button'
            className='btn-block btn btn-primary m-2'
            onClick={() => goBackModule()}
          >
            Módulo anterior
          </button>
        ) : (
          ''
        )}

        {nextClass ? (
          <button
            type='button'
            className='btn-block btn btn-primary m-2'
            onClick={() => goNextClass()}
          >
            Próxima aula
          </button>
        ) : nextModule && isAvailable ? (
          <button
            type='button'
            className='btn-block btn btn-primary m-2'
            onClick={() => goNextModule()}
          >
            Próximo módulo
          </button>
        ) : (
          ''
        )} */}
      </div>

      {/* end::Body */}
    </div>
  )
}

export {MenuClassWidget}
