/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {toAbsoluteUrl} from '../design/helpers'
import {Link} from 'react-router-dom'
import ModalNotAvailable from './ModalNotAvailable'
import {Component} from '../../store/ducks/component/types'
import ModalNoACcess from './ModalNoAccess'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../store'
const MOMENT = require('moment')

type Props = {
  className: string
  link: string
  data: Component
}

const CourseWidget1: React.FC<React.PropsWithChildren<Props>> = ({className, link, data}) => {
  let extra_img = data?.extras?.filter((extra: any) => extra.keyExtra === 'img')[0]
  let extra_release = data?.extras?.filter((extra: any) => extra.keyExtra === 'release')[0]

  const me = useSelector((state: ApplicationState) => state.me)

  let img = '1652141135752-logo.png'
  if (extra_img?.valueExtra) img = extra_img?.valueExtra

  console.log('extra', data)

  //let + '' + data.extras![0].valueExtra
  let release = '1969/01/01 00:00:01'
  if (extra_release?.valueExtra) release = extra_release?.valueExtra

  let today = MOMENT().format('YYYY-MM-DD HH:mm:ss.000')
  let dataAvailable = MOMENT(release).format('YYYY-MM-DD HH:mm:ss.000')
  let isAvailable = MOMENT(today).isAfter(dataAvailable) ? true : false
  let access = data.access.length || me.me.roles === 'admin'

  console.log('TODAY', today)
  let date = new Date(release)
  console.log('hey', date)
  console.log('release', release)

  const [showModalNotAvailable, setShowModalNotAvailable] = useState(false)
  const [showModalNoAccess, setShowModalNoAccess] = useState(false)

  return (
    <>
      <ModalNotAvailable
        show={showModalNotAvailable}
        setShow={setShowModalNotAvailable}
        data={data}
      />
      <ModalNoACcess show={showModalNoAccess} setShow={setShowModalNoAccess} data={data} />
      <Link
        to={!isAvailable || !access ? '#!' : link}
        onClick={() => {
          !access && setShowModalNoAccess(true)
          !isAvailable && setShowModalNotAvailable(true)
        }}
      >
        <div className={`toHover card ${className}`}>
          {/* begin::Header */}

          <div
            className={
              !isAvailable || !access
                ? `card-header wave border-0 disabled-blog`
                : `card-header wave border-0`
            }
            style={{
              //display: 'flex',
              backgroundImage:
                !isAvailable || !access
                  ? `url(${toAbsoluteUrl('/media/violaofeeling/cadeado.png')}), url(${
                      'https://institutodefelicibus.com.br/files/' + img
                    })`
                  : `url(${'https://institutodefelicibus.com.br/files/' + img})`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              opacity: !isAvailable || !access ? 0.6 : 1,
              // color: 'rgba(255, 255, 255, 0.1)',
              width: '100%',
              paddingTop: '135%',
              height: 0,
            }}
          ></div>

          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body p-0'>
            {/* begin::Stats */}
            <div className='card-p position-relative'>
              {/* begin::Row */}

              {/* end::Row */}
              <div className='card-title fw-bolder text-dark'>{data.name}</div>
              <div className='card-title text-dark'>{data.description}</div>
              {/* {access && (
                <div
                  className='card-title text-white text-center rounded p-2'
                  style={{backgroundColor: '#2ecc71'}}
                >
                  ACESSO LIBERADO
                </div>
              )}
              {!access && (
                <div
                  className='card-title text-white text-center rounded p-2'
                  style={{backgroundColor: '#C43531'}}
                >
                  SEM ACESSO
                </div>
              )} */}

              {!isAvailable && (
                <div className='card-title text-dark' style={{fontSize: 11}}>
                  <b>Disponível em: {MOMENT(release).format('DD/MM/YY')}</b>
                </div>
              )}
            </div>
            {/* end::Stats */}
          </div>
          
          {/* end::Body */}
        </div>
      </Link>
    </>
  )
}

export {CourseWidget1}
