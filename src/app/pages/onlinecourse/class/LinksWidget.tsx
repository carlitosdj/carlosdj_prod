/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {toAbsoluteUrl} from '../../../design/helpers'

type Props = {
  className: string
  extras_files: any
  extras_links: any
  url?: string
}

const LinksWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  extras_files,
  extras_links,
  url,
}) => {
  // console.log('Links', extras_files)
  // console.log('extras_links', extras_links)
  // console.log('url', url)
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
        <div className='flex-grow-1'>
          <div className='mb-6'>
            {/* begin::Text */}
            <div className='text-dark fw-bolder fs-4 mb-5'>
              Links e Downloads{' '}
              {extras_links.length || extras_files.length
                ? '(' + (extras_links.length + extras_files.length) + ')'
                : ''}
            </div>
            {extras_links.length === 0 && extras_files.length === 0
              ? 'Nenhum arquivo nessa aula.'
              : ''}

            {extras_links.map((link: any, index: any) => {
              
              return (
                <a href={link.valueExtra} key={index} target='_blank'>
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder pb-2'>
                    <img
                      src={toAbsoluteUrl('/media/fileicons/link.png')}
                      className='h-20px'
                      alt='link'
                    />{' '}
                    {link.valueExtra}
                  </div>
                </a>
              )
            })}

            {extras_files.map((link: any, index: any) => {
              let split = link.valueExtra.split('.')
              let extension = split.reverse()[0]
              // console.log('Extension', extension)
              return (
                <a
                  href={'https://institutodefelicibus.com.br/apimodelo/upload/file/' + link.valueExtra}
                  key={index}
                  target='_blank'
                >
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder pb-2'>
                    <img
                      src={toAbsoluteUrl(`/media/fileicons/${extension}.png`)}
                      className='h-20px'
                      alt={extension}
                    />{' '}
                    {link.valueExtra}
                  </div>
                </a>
              )
            })}
            {/* end::Text */}
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {LinksWidget}
