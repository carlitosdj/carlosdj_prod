import React from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { PageTitle } from '../../design/layout/core'
import { useIntl } from 'react-intl'
const MOMENT = require('moment')

const Renovation = () => {
    const me = useSelector((state: ApplicationState) => state.me)
    var created_at = MOMENT(Number(me.me.created_at) * 1000) //.format('DD/MM/YYYY HH:mm')
    var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
    let progress = (now.diff(created_at, 'years', true)*100).toFixed(2);

    if (parseInt(progress) > 100)
      progress = '100';

    const intl = useIntl()
    return (
        <>
        <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.RENOVATION' })}</PageTitle>
        <div className='d-flex flex-column w-100 me-2'>
           Renovar assinatura?
        </div>
        </>
    )
}

export default Renovation