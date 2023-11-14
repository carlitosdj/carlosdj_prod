import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../design/layout/core'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
//import { loadCampaignRequest, loadMyCampaignsRequest } from '../../../store/ducks/campaign/actions'
import {useParams} from 'react-router-dom'
//import { CampaignState } from '../../../../store/ducks/campaign/types'

import {UsersState} from '../../../../store/ducks/users/types'
import {Link} from 'react-router-dom'

const MOMENT = require('moment')
type ParamTypes = {
  id: string
}

type Props = {
  users: UsersState
  //campaigns: CampaignState
  id: number
}

const MyProfilePage: FC<React.PropsWithChildren<Props>> = ({users, id}) => {
  //let created_at_text = MOMENT(Number(users.user.createdAt!) * 1000) //.format('DD/MM/YYYY HH:mm')
  //const title = `${document.title} | Salve Mais Um`
  const me = useSelector((state: ApplicationState) => state.me)
  //const iconSize = 48
  //const intl = useIntl()

  var createdAt = MOMENT(Number(me.me.createdAt) * 1000) //.format('DD/MM/YYYY HH:mm')
  var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
  let progress = (now.diff(createdAt, 'years', true) * 100).toFixed(2)
  if (parseInt(progress) > 100) progress = '100'

  return (
    <>
      {/* begin::Row */}

      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-3'>
          <div className={`card card-xxl-stretch mb-5 mb-xxl-6`}>
            <img
              alt=''
              src={
                me.me.image?.includes('https://')
                  ? me.me.image
                  : 'http://localhost:3000/upload/file/' + me.me.image
              }
              style={{width: '100%'}}
              onError={({currentTarget}) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = 'https://labiopalatina.com.br/media/guestuser.jpg'
              }}
            />
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bolder fs-3'>{me.me.name}</span>
              </h3>
              <div className='d-flex flex-column w-100 me-2'>
                <div className='d-flex flex-stack mb-2'>
                  <span className='text-muted me-2 fs-7 fw-bold'>
                    Acesso à plataforma: {progress}%
                  </span>
                </div>
                <div className='progress h-6px w-100'>
                  <div
                    className={
                      parseInt(progress) < 90 ? 'progress-bar bg-primary' : 'progress-bar bg-danger'
                    }
                    role='progressbar'
                    style={{width: progress + '%'}}
                  ></div>
                </div>
              </div>
              <br />
              <br />
            </div>

            <div style={{paddingLeft: '2.25rem', paddingRight: '2.25rem'}}>
              <div>
                <Link className='btn btn-sm btn-primary btn-block w-100' to={'/edit'}>
                  Editar perfil
                </Link>
                <br />
                <br />
              </div>
              <div>
                <Link className='btn btn-sm btn-success btn-block w-100' to={'/onlinecourses'}>
                  Continuar curso
                </Link>
                <br />
                <br />
              </div>
              {/* {me.me.id === id && <div><Link className='btn btn-sm btn-primary' to={'/campaigns'}>Criar campanhas</Link><br/><br/></div>} */}
              {/* {users.user.cityParent?.name} {users.user.stateParent?.state} */}
            </div>
          </div>
        </div>

        <div className='col-xxl-9'>
          <div className={`card card-xxl-stretch mb-5 mb-xxl-6`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bolder fs-3 mb-1'>Meus dados</span>
                <span className='text-muted mt-1 fw-bold fs-7'>Visualização geral</span>
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
                      {/* <thead>
                        <tr className='border-0'>
                          <th className='p-0 w-150px'>asd</th>
                          <th className='p-0 min-w-150px'>dd</th>
                        </tr>
                      </thead> */}
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                        <span className='text-dark fw-bolder fs-6'>
                          Nome: {me.me.name}
                        </span>
                        <br />
                        <br />
                        <span className='text-dark fw-bolder fs-6'>Email: {me.me.email}</span>
                        <br />
                        <br />
                        <span className='text-dark fw-bolder fs-6'>
                          Whatsapp: {me.me.whatsapp}
                        </span>
                        <br />
                        <br />
                        <span className='text-dark fw-bolder fs-6'>CPF: {me.me.cpf}</span>
                        <br />
                        <br />
                        <span className='text-dark fw-bolder fs-6'>
                          Endereço: {me.me.address}, {me.me.addressNumber},{' '}
                          {me.me.addressDistrict} - {me.me.city?.name} /{' '}
                          {me.me.state?.state} / {me.me.addressCountry} -{' '}
                          {me.me.postalCode}
                        </span>
                        <br />
                        <br />
                        <span className='text-dark fw-bolder fs-6'>
                          Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}
                        </span>
                        <br />
                        {/* <span className='text-dark fw-bolder fs-5'>{now.diff(createdAt, 'years', true) > 1? 'RENOVAÇÃO' : 'NO PRAZO'}</span> */}
                        {/* <span className='text-dark fw-bolder fs-5'>{(now.diff(createdAt, 'years', true)*100).toFixed(2)}%</span> */}
                        <br />
                        {/* <span className='text-dark fw-bolder fs-6'>Ocupações:</span>
                        {me.me.occupation?.map((occ) => {
                          return <div>{occ.name}</div>
                        })}
                        <br /> */}
                        {/* <span className='text-dark fw-bolder fs-6'>Biografia:</span>
                        <br />
                        {me.me.bio?.split('\n').map(function (item, key) {
                          return (
                            <span key={key}>
                              {item}
                              <br />
                            </span>
                          )
                        })} */}
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
        </div>
      </div>

      {/* end::Row */}
    </>
  )
}

const MyProfile: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()
  const me = useSelector((state: ApplicationState) => state.me)
  const users = useSelector((state: ApplicationState) => state.users)
  //const component = useSelector((state: ApplicationState) => state.component)

  // const dispatch = useDispatch()
  let {id} = useParams<ParamTypes>()

  console.log("ME AQUI", me)
  console.log("USERS", users)

  useEffect(() => {
    // console.log("############ Loading component hey...", { module_id, class_id, me })
    // console.log("ID", id)
    // console.log("camp id", campaign.campaign.id)
    // console.log("dispatch?", +campaign.campaign.id! !== +id!)
    //if(+campaign.campaign.id! !== +id!)
    // dispatch(loadUserRequest(id!))
    // dispatch(loadMyCampaignsRequest(+id!))
  }, [me.me])
  //console.log("USER", users)
  // document.title = 'Perfil '+ users.user?.name + ' | Salve mais um';
  // if(users.loadingUser) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SALVEMAISUM'})}</PageTitle> */}
      {/* <PageTitle breadcrumbs={[]}>{users.user.name}</PageTitle> */}
      <PageTitle breadcrumbs={[]}>{me.me.name}</PageTitle>
      <MyProfilePage users={users} id={+id!} />
    </>
  )
}
export {MyProfile}
