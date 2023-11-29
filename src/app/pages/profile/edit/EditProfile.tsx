import React, {FC, useEffect, useRef, useState} from 'react'
import {PageTitle} from '../../../design/layout/core'
import {useIntl} from 'react-intl'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {useDispatch} from 'react-redux'
//import { loadCampaignRequest, loadMyCampaignsRequest } from '../../../../store/ducks/campaign/actions'
import {useNavigate, useParams} from 'react-router-dom'
import Loading from '../../../design/loading'
//import { CampaignState } from '../../../../store/ducks/campaign/types'
import {loadUserRequest} from '../../../../store/ducks/users/actions'
import {authfromcookie, loadMeRequest, updateMeRequest} from '../../../../store/ducks/me/actions'
import {Occupation, User, UsersState} from '../../../../store/ducks/users/types'
import {Link} from 'react-router-dom'
import {Button, Col, Form} from 'react-bootstrap-v5'
//import { loadCityRequest } from '../../../../store/ducks/city/actions'
//import { MeState } from '../../../../store/ducks/users/types'
import {useCookies} from 'react-cookie'
import api from '../../../../services/api'
// import {CKEditor} from 'ckeditor4-react'
//import { loadStateRequest } from '../../../../store/ducks/state/actions'

import FileResizer from 'react-image-file-resizer'
import ReactCrop, {centerCrop, Crop, makeAspectCrop, PixelCrop} from 'react-image-crop'
import {canvasPreview} from '../canvasPreview'
import {useDebounceEffect} from '../useDebounceEffect'
import {loadStateRequest} from '../../../../store/ducks/state/actions'
import {loadCityRequest} from '../../../../store/ducks/city/actions'
// const MOMENT = require('moment')
// type ParamTypes = {
//   id: string
// }

// type Props = {
//   me: MeState
//   //campaigns: CampaignState
// }
// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}
const EditProfilePage: FC<React.PropsWithChildren<unknown>> = () => {
  // let created_at_text = MOMENT(Number(users.user.createdAt!) * 1000) //.format('DD/MM/YYYY HH:mm')
  // const title = `${document.title} | Salve Mais Um`;
  const [imgSrc, setImgSrc] = useState('')
  const [croppedImage, setCroppedImage] = useState<any>('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(1 / 1) //16 / 9
  //const [occupation, setOccupation] = useState<Occupation[]>([])

  const imgRef = useRef<HTMLImageElement>(null)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
      setSelectedFile(e.target.files[0])

      //setIsSelected(true)
    } else {
      //setSelectedFile(e.target.files[0])
      setImgSrc('')
    }
  }
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const {width, height} = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
      //console.log("ei?")
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        //console.log("hum?")
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate).then(
          () => {
            //console.log("FOI..?", previewCanvasRef)

            previewCanvasRef.current?.toBlob((file: any) => {
              //console.log("FILE", file)
              try {
                FileResizer.imageFileResizer(
                  file,
                  800,
                  800,
                  'JPEG',
                  100,
                  0,
                  (uri) => {
                    //console.log("Nova imagem:", uri);
                    setCroppedImage(uri)
                  },
                  'blob'
                )
              } catch (error) {
                //console.log("error", error)
              }

              // let url = URL.createObjectURL(file);
              // console.log("URL", url)
            }, 'image/jpeg')
          }
        )
      }
    },
    100,
    [completedCrop, scale, rotate]
  )
  const [validated, setValidated] = useState(false)

  const [name, setName] = useState<string | undefined>('')
  const [username, setUsername] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>('')
  const [whatsapp, setWhatsapp] = useState<string | undefined>('')
  //const [bio, setBio] = useState<string | undefined>('')
  const [cpf, setCpf] = useState<string | undefined>('')
  //const [endereco, setEndereco] = useState<string | undefined>('')
  const [address, setAddress] = useState<string | undefined>('')
  const [addressCEP, setAddressCEP] = useState<string | undefined>('')

  const [addressNumber, setAddressNumber] = useState<string | undefined>('')
  const [addressDistrict, setAddressDistrict] = useState<string | undefined>('')
  const [addressCity, setAddressCity] = useState<string | undefined>('')
  const [addressState, setAddressState] = useState<string | undefined>('')
  const [addressCountry, setAddressCountry] = useState<string | undefined>('')
  const [numTurma, setNumTurma] = useState<number | undefined>()
  const [createdAt, setCreatedAt] = useState<number | undefined>()

  const [image, setImage] = useState<string | undefined>('')

  const [userCity, setUserCity] = useState('')
  const [userState, setUserState] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>()
  const [isSelected, setIsSelected] = useState(false)
  const [preview, setPreview] = useState<any>()
  const [field, setField] = useState([])

  const dispatch = useDispatch()

  //Cookies:
  const [cookies, setCookie] = useCookies(['user_associacao'])
  const cookieUser: User = cookies.user_associacao
  const navigate = useNavigate()
  const me = useSelector((state: ApplicationState) => state.me)
  //console.log("ME", me)
  const state = useSelector((state: ApplicationState) => state.state)
  const city = useSelector((state: ApplicationState) => state.city)
  console.log('ME', me)
  console.log('City', city)
  console.log('State', state)

  useEffect(() => {
    setName(me.me.name)
    setUsername(me.me.username)
    setEmail(me.me.email)
    setWhatsapp(me.me.whatsapp)
    setCpf(me.me.cpf)
    setAddress(me.me.endereco)
    setImage(me.me.image)

    //setEndereco(me.me.endereco)
    setAddress(me.me.address)
    setAddressNumber(me.me.addressNumber)
    setAddressDistrict(me.me.addressDistrict)
    setAddressCity(me.me.addressCity)
    setAddressState(me.me.addressState)
    setAddressCountry(me.me.addressCountry)
    setAddressCEP(me.me.postalCode)
    setNumTurma(me.me.numTurma)
    setCreatedAt(me.me.createdAt)
    setUserCity('' + me.me.city?.id!)
    setUserState('' + me.me.state?.id!)
    //setOccupation(me.me.occupation!)
    //setBio(me.me.bio)
    // setCandonate(users.user.image!)

    // console.log("Setando cookies")
    var date = new Date()
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000) //Days *
    setCookie('user_associacao', me.me, {
      path: '/',
      expires: date, //maxAge?
    })
    // console.log("cookies novo", cookieUser)

    // console.log("CITY",city)
    // console.log("STATE",state)
  }, [me.me])
  //}, [users.user, me.me])

  //console.log('OCCUPATION GERAL', occupation)
  // const handleOccupation = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   occupationSelected: Occupation
  // ) => {
  //   console.log('OI?')
  //   console.log('occupation-selected', occupationSelected)
  //   if (event.target.checked) {
  //     setOccupation([...occupation, occupationSelected])
  //   } else {
  //     setOccupation((current) =>
  //       current.filter((occupation) => occupation.name !== occupationSelected.name)
  //     )
  //   }
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //console.log('submit', campaign.data.id)

    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (name && email && cpf) {
      if (selectedFile) {
        console.log('file is selected')
        //Se selecionou arquivo novo
        //console.log("Selecionado novo arquivo")
        const formdata = new FormData()
        formdata.append('file', croppedImage, 'vf.jpg') //selectedFile.name
        // console.log('[formData]', formdata)
        // console.log('selectedFile', selectedFile)
        api.post('/upload', formdata, {}).then((res: any) => {
          console.log('Selecionou arquivo', res)
          var data = new Date()
          const userToUpdate: User = {
            id: me.me.id,
            email,
            numTurma: numTurma,
            name,
            whatsapp,
            cpf,
            address,
            addressNumber,
            addressDistrict,
            addressCity,
            addressState,
            addressCountry,
            postalCode: addressCEP,
            cityId: userCity,
            stateId: userState,
            image: res.data.filename,
          }
          //Update user
          dispatch(updateMeRequest(userToUpdate))
          //Seta novo user na redux
          dispatch(authfromcookie(userToUpdate))
          var date = new Date()
          setCookie('user_associacao', userToUpdate, {
            path: '/',
            expires: date, //maxAge?
          })
        })
      } else {
        //Se não selecionou nenhuma foto nova:
        console.log('Nao selecionou nenhum arquivo')
        var data = new Date()
        const userToUpdate: User = {
          id: me.me.id,
          email,
          numTurma: numTurma,
          name,
          whatsapp,
          cpf,
          address,
          addressNumber,
          addressDistrict,
          addressCity,
          addressState,
          addressCountry,
          postalCode: addressCEP,
          cityId: userCity,
          stateId: userState,
        }

        //console.log('------------------ USER TO UPDATE', userToUpdate)
        dispatch(updateMeRequest(userToUpdate))
        var date = new Date()
        //Seta novo user na redux
        dispatch(authfromcookie(userToUpdate))
        setCookie('user_associacao', userToUpdate, {
          path: '/',
          expires: date, //maxAge?
        })

        // history.push('/home');

        //     handleClose()
      }
      //  navigate('/profile/'+me.me.id)

      navigate('/myprofile')
    }
  }

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0])
    setIsSelected(true)
    const objectUrl = URL.createObjectURL(event.target.files[0])
    setPreview(objectUrl)
  }

  const setState = (id: string) => {
    setUserState(id)
    setUserCity('')
    dispatch(loadCityRequest(id))
  }

  const iconSize = 48
  const intl = useIntl()
  return (
    <>
      {/* begin::Row */}

      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-12'>
          <div className={`card card-xxl-stretch mb-5 mb-xxl-6`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bolder fs-3 mb-1'>Complete com seus dados</span>
                <span className='text-muted mt-1 fw-bold fs-7'>Edite seu perfil</span>
              </h3>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
              <div className='tab-content'>
                <Form validated={validated} onSubmit={handleSubmit}>
                  <div className='row g-5 gx-xxl-12'>
                    <div className='col-xxl-9'>
                      <Form.Group controlId='fromName'>
                        <Form.Label>Nome completo</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={name}
                          onChange={(e: any) => setName(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o nome
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <Form.Group controlId='fromName'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder=''
                          disabled
                          required
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o email
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <Form.Group controlId='fromName'>
                        <Form.Label>Whatsapp</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={whatsapp}
                          onChange={(e: any) => setWhatsapp(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o whatsapp
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <Form.Group controlId='fromName'>
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={cpf}
                          onChange={(e: any) => setCpf(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o cpf
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      {/* <Form.Group controlId='fromName'>
                      <Form.Label>Endereco</Form.Label>
                      <Form.Control
                        placeholder=''
                        required
                        value={endereco}
                        onChange={(e:any) => setEndereco(e.target.value)}
                      />
                      <Form.Control.Feedback type='invalid'>Por favor informe o endereço</Form.Control.Feedback>
                    </Form.Group>
                    <br /> */}

                      <Form.Group controlId='fromName'>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={address}
                          onChange={(e: any) => setAddress(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o endereco
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <Form.Group controlId='fromName'>
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={addressNumber}
                          onChange={(e: any) => setAddressNumber(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o numero
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <Form.Group controlId='fromName'>
                        <Form.Label>CEP</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={addressCEP}
                          onChange={(e: any) => setAddressCEP(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o cep
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <Form.Group controlId='fromName'>
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={addressDistrict}
                          onChange={(e: any) => setAddressDistrict(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe o bairro
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <Form.Group controlId='formBasicSelect'>
                        <Form.Label>Estado</Form.Label>

                        {state.loading ? (
                          <Loading />
                        ) : (
                          <Form.Control
                            as='select'
                            value={userState}
                            onChange={(e: any) => setState(e.target.value)}
                            required
                          >
                            <option value='' selected disabled hidden>
                              Selecione
                            </option>
                            {state.data.map((st: any, index) => {
                              return (
                                <option key={index} value={st.id} selected={+st.id === +userState}>
                                  {st.name}
                                </option>
                              )
                            })}
                          </Form.Control>
                        )}
                      </Form.Group>
                      <br />
                      <Form.Group controlId='formBasicSelect'>
                        <Form.Label>Cidade</Form.Label>
                        {city.loading ? (
                          <Loading />
                        ) : (
                          <Form.Control
                            as='select'
                            value={userCity}
                            onChange={(e: any) => setUserCity(e.target.value)}
                            required
                          >
                            <option value='' selected disabled hidden>
                              Selecione
                            </option>
                            {city.data.map((ct: any, index) => {
                              return (
                                <option key={index} value={ct.id} selected={+ct.id === +userCity}>
                                  {ct.name}
                                </option>
                              )
                            })}
                          </Form.Control>
                        )}
                      </Form.Group>
                      <br />

                      {/* <Form.Group as={Col} controlId="my_multiselect_field">
                        <Form.Label>Selecione as profissões que te representam</Form.Label>
                        <div className='row'>
                          <div className='col-6'>

                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Assistente Social'}
                              label={'Assistente Social'}
                              onChange={e => {handleOccupation(e, {name: 'Assistente Social'})}}
                              checked={occupation.some(item => item.name === 'Assistente Social') ? true : false}
                            />

                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Biólogo'}
                              label={'Biólogo'}
                              onChange={e => {handleOccupation(e, {name: 'Biólogo'})}}
                              checked={occupation.some(item => item.name === 'Biólogo') ? true : false}
                            />
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Biomédico'}
                              label={'Biomédico'}
                              onChange={e => {handleOccupation(e, {name: 'Biomédico'})}}
                              checked={occupation.some(item => item.name === 'Biomédico') ? true : false}
                            />
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Dentista'}
                              label={'Dentista'}
                              onChange={e => {handleOccupation(e, {name: 'Dentista'})}}
                              checked={occupation.some(item => item.name === 'Dentista') ? true : false}
                            />

                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Enfermeiro'}
                              label={'Enfermeiro'}
                              onChange={e => {handleOccupation(e, {name: 'Enfermeiro'})}}
                              checked={occupation.some(item => item.name === 'Enfermeiro') ? true : false}
                            />
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Esteticista'}
                              label={'Esteticista'}
                              onChange={e => {handleOccupation(e, {name: 'Esteticista'})}}
                              checked={occupation.some(item => item.name === 'Esteticista') ? true : false}
                            />

                          </div>
                          <div className='col-6'>
                            
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Farmacêutico'}
                              label={'Farmacêutico'}
                              onChange={e => {handleOccupation(e, {name: 'Farmacêutico'})}}
                              checked={occupation.some(item => item.name === 'Farmacêutico') ? true : false}
                            />



                            
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Fisioterapeuta'}
                              label={'Fisioterapeuta'}
                              onChange={e => {handleOccupation(e, {name: 'Fisioterapeuta'})}}
                              checked={occupation.some(item => item.name === 'Fisioterapeuta') ? true : false}
                            />
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Fonoaudiólogo'}
                              label={'Fonoaudiólogo'}
                              onChange={e => {handleOccupation(e, {name: 'Fonoaudiólogo'})}}
                              checked={occupation.some(item => item.name === 'Fonoaudiólogo') ? true : false}
                            />


                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Médico'}
                              label={'Médico'}
                              onChange={e => {handleOccupation(e, {name: 'Médico'})}}
                              checked={occupation.some(item => item.name === 'Médico') ? true : false}
                            />
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Psicólogo'}
                              label={'Psicólogo'}
                              onChange={e => {handleOccupation(e, {name: 'Psicólogo'})}}
                              checked={occupation.some(item => item.name === 'Psicólogo') ? true : false}
                            />
                            <Form.Check 
                              className='m-2'
                              type={'checkbox'}
                              id={'Terapeuta'}
                              //checked={true}
                              label={'Terapeuta'}
                              onChange={e => {handleOccupation(e, {name: 'Terapeuta'})}}
                              checked={occupation.some(item => item.name === 'Terapeuta') ? true : false}
                            />
                            
                            
                            
                            
                            
                          </div>
                        </div>
                      </Form.Group> */}
                      <br />

                      {/* <Form.Group controlId='formDescription'>
                        <Form.Label>Biografia em poucas palavras</Form.Label>
                        <Form.Control
                          placeholder=''
                          required
                          value={bio}
                          onChange={(e: any) => setBio(e.target.value)}
                          as='textarea'
                          rows={8}
                          name='bio'
                        />
                        <Form.Control.Feedback type='invalid'>
                          Por favor informe a descrição do produto
                        </Form.Control.Feedback>
                      </Form.Group> */}

                      {/* <Form.Label>Biografia</Form.Label>
                      <CKEditor
                        initData={bio}
                        onChange={(e: any) => setBio(e.editor.getData())}
                      /> */}

                      <br />
                    </div>

                    <div className='col-xxl-3'>
                      <Form.Group>
                        <Form.Label>Selecione uma foto (opcional)</Form.Label>
                        <Form.Control
                          name='image'
                          id='image'
                          type='file'
                          accept='image/*'
                          onChange={onSelectFile}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Selecione um arquivo
                        </Form.Control.Feedback>
                      </Form.Group>
                      <br />

                      <div>
                        <label htmlFor='image'>
                          <a style={{cursor: 'pointer'}}>
                            {!imgSrc && (
                              <img
                                src={
                                  image?.includes('https://')
                                    ? image
                                    : 'https://institutodefelicibus.com.br/apimodelo/upload/file/' + image
                                }
                                style={{width: '100%'}}
                                onError={({currentTarget}) => {
                                  currentTarget.onerror = null // prevents looping
                                  currentTarget.src =
                                    'https://labiopalatina.com.br/media/guestuser.jpg'
                                }}
                              />
                            )}
                            {selectedFile && <img src={preview} style={{width: '50%'}} />}
                          </a>
                        </label>
                      </div>

                      <div className='row g-5 gx-xxl-12'>
                        <div className='col-6'>
                          {!!imgSrc && (
                            <div>
                              <div>Posicione a foto</div>
                              <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}
                                maxHeight={350}
                                maxWidth={350}
                              >
                                <img
                                  ref={imgRef}
                                  alt='Crop me'
                                  src={imgSrc}
                                  style={{
                                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                                    //width:'100%'
                                  }}
                                  onLoad={onImageLoad}
                                />
                              </ReactCrop>
                            </div>
                          )}
                        </div>
                        <div className='col-6'>
                          <div>
                            {!!completedCrop && !!imgSrc && (
                              <div>
                                <div>Prévia</div>
                                <canvas
                                  ref={previewCanvasRef}
                                  style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: completedCrop.width,
                                    height: completedCrop.height,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <br />
                      <br />
                    </div>
                  </div>

                  <Button size='sm' variant='primary' type='submit' className='float-right'>
                    Salvar
                  </Button>
                </Form>

                <br />
                <br />
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

const EditProfile: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  const me = useSelector((state: ApplicationState) => state.me)
  console.log('ME', me)
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(loadUserRequest(''+me.me.id!))

    //Carrega estados e cidades desse estado
    dispatch(loadStateRequest()) //Puxa componentes com seus filhos primários
    dispatch(loadCityRequest('' + me.me.state?.id!))
    // console.log("CARREGANDO...", me.me.stateParent?.id!)
    // console.log("Me", me)
    //console.log("Me", me)
  }, [])
  // document.title = 'Editar '+ users.user?.name + ' | Salve mais um';
  // console.log("USER", users)
  // if(users.loadingUser) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SALVEMAISUM'})}</PageTitle> */}
      <PageTitle breadcrumbs={[]}>{me.me.name}</PageTitle>
      {/* <PageTitle breadcrumbs={[]}>Teste</PageTitle> */}
      <EditProfilePage />
    </>
  )
}
export {EditProfile}
