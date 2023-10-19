import React from 'react'
import {MenuItem} from './MenuItem'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.ONLINECOURSES'})} to='/onlinecourses' />
      <MenuItem title={intl.formatMessage({id: 'MENU.SEARCH'})} to='/search' />
    </>
  )
}
