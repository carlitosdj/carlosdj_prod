/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { toAbsoluteUrl } from '../design/helpers'
import { Link } from 'react-router-dom'
import ModalNotAvailable from './ModalNotAvailable'
import { Component } from '../../store/ducks/component/types'
const MOMENT = require('moment')

type Props = {
  className: string
  link: string
  data: Component
}

const CourseWidget1: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  link,
  data
}) => {

  let extra_img = data?.extras?.filter((extra: any) => extra.key_extra === 'img')[0];
  let extra_release = data?.extras?.filter((extra: any) => extra.key_extra === 'release')[0];
  
  let img = '1652141135752-logo.png'
  if (extra_img?.value_extra)
    img = extra_img?.value_extra


  //console.log("extra", extra?.value_extra)
  
  //let + '' + data.extras![0].value_extra
  let release = '1969/01/01 00:00:01'
  if(extra_release?.value_extra) 
    release = extra_release?.value_extra
  
  let today = MOMENT().format('YYYY-MM-DD HH:mm:ss.000')
  let dataAvailable = MOMENT(release).format('YYYY-MM-DD HH:mm:ss.000')
  let isAvailable =  MOMENT(today).isAfter(dataAvailable) ? true : false

  const [showModal, setShowModal] = useState(false)
  
  return (
    <>
    <ModalNotAvailable
      show={showModal}
      setShow={setShowModal}
      data={data}
    />
    <Link to={!isAvailable?'#!':link} onClick={() => !isAvailable?setShowModal(true):''}>
      <div className={`toHover card ${className}`}>
        {/* begin::Header */}
        <div
          className={
            !isAvailable
              ? `disabled-blog card-header wave border-0`
              : `card-header wave border-0`
          }
          style={{
            //display: 'flex',
            backgroundImage: !isAvailable
              ? `url(${toAbsoluteUrl('/media/violaofeeling/cadeado.png')}), url(${'https://labiopalatina.com.br/files/' + img})`
              : `url(${'https://labiopalatina.com.br/files/' + img})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            
            // color: 'rgba(255, 255, 255, 0.1)',
            width: '100%',
            paddingTop: '135%',
            height: 0,
          }}
        >
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body p-0'>
          {/* begin::Stats */}
          <div className='card-p position-relative'>
            {/* begin::Row */}

            {/* end::Row */}
            <div className='card-title fw-bolder text-dark'>{data.name}</div>
            <div className='card-title text-dark'>{data.description}</div>
            {!isAvailable && 
              <div className='card-title text-dark' style={{fontSize:11}}>
                <b>Disponível em: {MOMENT(release).format('DD/MM/YY')}</b>
              </div>
            }
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
