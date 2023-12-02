import React, { FC, useEffect } from 'react'
import { PageTitle } from '../design/layout/core'
import { useIntl } from 'react-intl'
import { CourseWidget1 } from './CourseWidget1'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import { useDispatch } from 'react-redux'
import { loadComponentRequest, loadComponentWithAccessRequest } from '../../store/ducks/component/actions'
import Loading from '../design/loading'
// import Vimeo from '@u-wave/react-vimeo'
// import { right } from '@popperjs/core'
// const MOMENT = require('moment')

const TrainningPage: FC<React.PropsWithChildren<unknown>> = () => {
  // const me = useSelector((state: ApplicationState) => state.me)
  const component = useSelector((state: ApplicationState) => state.component)
  const me = useSelector((state: ApplicationState) => state.me)
  const dispatch = useDispatch()
  // const intl = useIntl()

  useEffect(() => {
    // dispatch(loadLastLiveClassRequest())
    // dispatch(loadLastClassRequest(me.me.id!))
    console.log("ID", me.me.id?.toString()!)
    dispatch(loadComponentWithAccessRequest('2',me.me.id?.toString()!, 'asc'))
  }, [])

  console.log("component", component)
  // console.log("COMPONENT*******", component)
  // let url: string | undefined = ''
  // let urlLastClass: string | undefined = ''

  // let check = component.lastliveclass?.extras?.filter((extra: any) => extra.keyExtra === 'url')[0] //Checa se tem o 'extra' de url.
  // if (check) url = check.valueExtra

  // let checkLastClass = component.lastclass?.extras?.filter((extra: any) => extra.keyExtra === 'url')[0] //Checa se tem o 'extra' de url.
  // if (checkLastClass) urlLastClass = checkLastClass.valueExtra

  // let reg = /.+?:\/\/.+?(\/.+?)(?:#|\?|$)/;
  // let video_id = ""
  // if (urlLastClass) {
  //   var pathname = reg.exec(urlLastClass!)![1];
  //   let split = pathname.split('/');
  //   video_id = split[2];
  // }

  // var createdAt = MOMENT(new Date(Number(me.me.createdAt) * 1000)) //.format('DD/MM/YYYY HH:mm')
  // var now = MOMENT(new Date()) //.format('DD/MM/YYYY HH:mm')

  // console.log("last class", component.lastclass)
  // let blockAreas = (now.diff(createdAt, 'years', true).toFixed(2) > 1);
  // let today = MOMENT().format('YYYY-MM-DD HH:mm:ss.000')
  
  return (
    <> 
      

      {/* <div className='row gy-5 g-xl-8'>
        {
          component.loadingLastClass ?
            ''//<Loading/> -- TODO: Se a lista estiver nula (aluno nao concluiu nenhuma aula, fica rodando Loading infinito =/)
            :
            video_id ?
              <>
                <div className='col-xxl-6'>
                  <a href={'/class/' + component.lastclass?.parent?.parent?.id + '/' + component.lastclass?.parent?.id}>
                    <h3 className='page-title mt-5 mb-5'>Continue de onde parou</h3>
                    <div className='mb-4 text-white'>{component.lastclass?.parent?.parent?.name} - {component.lastclass?.parent?.name} - {component.lastclass?.name}</div>
                    <div className='embed-responsive embed-responsive-16by9'>

                      {/* <Vimeo
                        video={video_id}
                        controls={false}
                        //background={true}
                        //pip={true}
                        transparent={false}
                        //autoplay
                        //onLoaded={() => console.log("Loaded")}
                        //onEnd={() => completed(selectedClass)}
                        //onProgress={(e:any) => console.log('oi', e)}
                      /> *x/}
                      <iframe
                        title='video'
                        className='embed-responsive-item rounded'
                        src={urlLastClass}
                        style={{ width: '100%', pointerEvents: 'none' }}
                        //height={75}
                        frameBorder={0}
                      // allow='autoplay; fullscreen'
                      // allowFullScreen
                      />
                    </div>
                  </a>
                </div>
              </> : ''
        }
        {
          component.loadingLastLiveClass ?
            <Loading />
            :
            <>
              <div className={blockAreas === true ? 'col-xxl-6 block' : 'col-xxl-6'}>
                <h3 className='page-title mt-5 mb-5'>{intl.formatMessage({ id: 'PAGE.LASTCLASS' })} - <Link to={'/replay'}>{intl.formatMessage({ id: 'PAGE.ALLREPLAYS' })}</Link></h3>
                <div className='mb-4'>{component.lastliveclass?.name}</div>
                <div
                  style={{
                    backgroundImage: blockAreas
                      ? `url(${toAbsoluteUrl('/media/violaofeeling/cadeado.png')})`
                      : '',
                    backgroundPosition: 'right top',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <div className={blockAreas === true ? 'block' : ''} >


                    <div className='embed-responsive embed-responsive-16by9'>
                      <div>
                        <iframe
                          title='video'
                          className='embed-responsive-item rounded'
                          src={url}
                          width={640}
                          height={564}
                          frameBorder={0}
                          allow='autoplay; fullscreen'
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
        }
      </div> */}
      {/* begin::Row */}
      {/* <h3 className='page-title mt-0 mb-5'>{intl.formatMessage({ id: 'PAGE.TRAINNINGS' })}</h3> */}
      {/* <h3 className='page-title mt-0 mb-5'>Treinamentos</h3> */}
      {/* <div className='row gy-5 g-xl-8'>
        {/* <h2>Próximos</h2> *x/}
        {component.loading && <Loading/>}
        {!component.loading && component.data.children?.map((data,index) => {
          let extra_img = data?.extras?.filter((extra: any) => extra.keyExtra === 'img')[0];
          let extra_release = data?.extras?.filter((extra: any) => extra.keyExtra === 'release')[0];
          
          let img = '1652141135752-logo.png'
          if (extra_img?.valueExtra)
            img = extra_img?.valueExtra


          //console.log("extra", extra?.valueExtra)
          
          //let + '' + data.extras![0].valueExtra
          let release = '1969/01/01 00:00:01'
          if(extra_release?.valueExtra)
            release = extra_release?.valueExtra
          
          let dataAvailable = MOMENT(release).format('YYYY-MM-DD HH:mm:ss.000')
          let isAvailable =  MOMENT(today).isAfter(dataAvailable) ? true : false
          if(!isAvailable) {
            return (
                <div className='col-xxl-2 col-6' key={index}>
                  <CourseWidget1
                      link={'/modules/' + data.id}
                      name={data.name!}
                      description={data.description!}
                      className='card-xl-stretch mb-xl-8'
                      img={'https://institutodefelicibus.com.br/files/' + img}
                      height={200}
                      locked={!isAvailable}
                      release={release}
                    />
                </div>
            )
          }
        })
      } 
      </div> */}

      <div className='row gy-5 g-xl-8'>
        {/* <h2>Disponíveis</h2> */}
        {component.loading && <Loading/>}
        {!component.loading && component.data.children?.map((data,index) => {
          
          //if(isAvailable) {
            return (
                <div className='col-xxl-3 col-6' key={index}>
                  <CourseWidget1
                      data={data}
                      link={'/modules/' + data.id}
                      className='card-xl-stretch mb-xl-8'
                      //height={200}
                      //locked={true}
                      //locked={!isAvailable}
                      //release={release}
                    />
                </div>
            )
          //}
        })
      } 
      </div>
      
      {/* end::Row */}
    </>
  )
}

const Trainning: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.TRAINNINGS' })}</PageTitle>
      <TrainningPage />
    </>
  )
}
export { Trainning }
