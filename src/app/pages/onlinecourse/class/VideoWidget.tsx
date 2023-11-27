/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {
  createAulaConcluidaRequest,
  createRateRequest,
  createTimeWatchedRequest,
} from '../../../../store/ducks/component/actions'
import Vimeo from '@u-wave/react-vimeo'
import {useNavigate, useParams} from 'react-router-dom'
// import {toAbsoluteUrl} from '../../../helpers'

type Props = {
  className: string
  selectedClass: any
  url?: string
}

type ParamTypes = {
  id: string
  module_id: string
  class_id: string
}

const StarRating = (selectedClass: any) => {
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()
  const me = useSelector((state: ApplicationState) => state.me)

  //console.log("Selected class", selectedClass.selectedClass)

  useEffect(() => {
    //console.log("Bateu")
    setRating(selectedClass.selectedClass.completed[0]?.rate)
  }, [selectedClass.selectedClass.id])

  const rate = (index: number) => {
    setRating(index)
    dispatch(
      createRateRequest(
        selectedClass.selectedClass.completed[0]?.id,
        me.me.id!,
        selectedClass.selectedClass.id,
        index
      )
    )
    // dispatch(createRateRequest(1, 748, index))
  }
  return (
    <div className='star-rating d-flex align-items-center' style={{fontSize: 20}}>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type='button'
            key={index}
            className={index <= rating ? 'on' : 'off'}
            onClick={() => rate(index)}
          >
            <span className='star'>&#9733;</span>
          </button>
        )
      })}
      <span style={{fontSize: 16, paddingLeft: 3}}>{rating}</span>
    </div>
  )
}

const VideoWidget: React.FC<React.PropsWithChildren<Props>> = ({className, selectedClass, url}) => {
  let video_id = ''
  if (url) {
    let reg = /.+?:\/\/.+?(\/.+?)(?:#|\?|$)/
    var pathname = reg.exec(url!)![1]
    let split = pathname.split('/')
    video_id = split[2]
  }

  const dispatch = useDispatch()
  const me = useSelector((state: ApplicationState) => state.me)
  const component = useSelector((state: ApplicationState) => state.component)
  const navigate = useNavigate()
  let {id, module_id, class_id} = useParams<ParamTypes>()

  // console.log('**COMPONENT**', component)
  // console.log('**SELECTEDCLASS**', selectedClass)
  // console.log("selectedClass.completed[0].timeWatched === selectedClass.duration", selectedClass.completed[0].timeWatched === selectedClass.duration)
  // console.log("selectedClass.completed[0].timeWatched", selectedClass.completed[0].timeWatched)
  // console.log("selectedClass.duration", selectedClass.duration)
  // useEffect(() => {
  //   //console.log("ei")
  // },[id, module_id, class_id])

  const completed = (aula: any) => {
    console.log('CONCLUINDO AULA AUTOMATICAMENTE............', aula)
    if (aula.completed[0]?.status === 1) {
      //Desmarcar
      // dispatch(deleteAulaConcluidaRequest(aula.completed[0].id, aula))
      //dispatch(createAulaConcluidaRequest(aula.completed[0]?.id, me.me.id!, aula.id, aula.parent.id, 0))
    } else {
      // console.log('MARCAR como concluida', aula)
      console.log('concluindo aula')
      dispatch(
        createAulaConcluidaRequest(aula.completed[0]?.id, me.me.id!, aula.id, aula.parent.id, 1)
      )
    }
    goNextClass()
  }

  const goNextClass = () => {
    //console.log('next')
    var index = component.classes
      .map((e: any) => {
        return e.id
      })
      .indexOf(selectedClass.id)
    let next = component.classes[index + 1]
    console.log('GO NEXT?', next)
    // if (selectedClass.completed[0]?.status === 0 || selectedClass.completed[0]?.status === null || !selectedClass.completed.length) completed(selectedClass)
    // //completed(selectedClass)
    if (next) {
      console.log('Tem next...')
      navigate('/class/' + id + '/' + module_id + '/' + next.id)
    }
  }

  //console.log("pathname", video_id)
  const [steps, setSteps] = useState(0)
  const [watched, setWatched] = useState(0)
  return (
    <>
      {/* begin::Video */}
      {/* <div style={{ backgroundColor: 'red', color: 'green', zIndex: 999}}>
        Proteção
      </div> */}
      {!url && <div className='text-center'>OPS! Essa aula não existe</div>}
      {url && (
        <div className='embed-responsive embed-responsive-16by9'>
          <div>
            {url!.includes('youtube') ? (
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
            ) : (
              <Vimeo
                video={video_id}
                autoplay
                //onLoaded={() => console.log("Loaded")}
                onEnd={() => {
                  completed(selectedClass)
                  dispatch(
                    createTimeWatchedRequest(
                      selectedClass.completed[0]?.id,
                      me.me.id!,
                      selectedClass.id,
                      selectedClass.duration
                    )
                  )
                }}
                //onProgress={(e:any) => console.log('oi', e)}
                onTimeUpdate={(time) => {
                  setSteps(steps + 1)
                  if (steps >= 59) {
                    setSteps(0)

                    // console.log("OI")
                    // console.log("me.me.id!",me.me.id!)
                    // console.log("selectedClass.selectedClass.id",selectedClass.id)
                    // console.log("selectedClass.completed[0]?.id",selectedClass.completed[0]?.id)
                    // console.log("time.seconds",time.seconds)

                    dispatch(
                      createTimeWatchedRequest(
                        selectedClass.completed[0]?.id,
                        me.me.id!,
                        selectedClass.id,
                        time.seconds
                      )
                    )
                  }
                }}
                //onProgress={progress => console.log("progress", progress)}
                start={
                  selectedClass.completed[0]
                    ? selectedClass.completed[0].timeWatched === selectedClass.duration
                      ? 0
                      : selectedClass.completed[0].timeWatched
                    : 0
                }
                //responsive={true}
              />
            )}
            {/* <div>
            <br />
            <br />
            STEPS: {steps}
          </div> */}
            {/*  */}
          </div>
        </div>
      )}
      {/* end::Video */}
      {/* {url} */}
      <div className={`${className}`}>
        {/* begin::Body */}
        <div className='p-3'>
          Avalie esta aula: <StarRating selectedClass={selectedClass} />
          <div className='flex-grow-1'>
            <div className='mb-6'>
              {/* begin::Text */}
              {/* <div className='text-gray-800 fs-6 fw-normal mb-5'>
              Titulo
            </div> */}
              {/* end::Text */}
            </div>

            {/* begin::Info */}

            {/* <div className='d-flex align-items-center pe-2 mb-5'>
            <span className='text-muted fw-bolder fs-5 flex-grow-1'>ABC</span>

            <div className='symbol symbol-50px'>
              <span className='symbol-label bg-light'>
              

              </span>
            </div>
          </div> */}
            {/* end::Info */}

            {/* begin::Link */}
            <div className='text-dark fw-bolder fs-4'>{selectedClass.name}</div>
            {/* end::Link */}

            {/* begin::Desc */}
            <p className='py-3' dangerouslySetInnerHTML={{__html: selectedClass.description}}></p>
            {/* end::Desc */}
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}

export {VideoWidget}
