import React, { useState, useEffect } from 'react'
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap-v5";
import { DetailHistory, Solicitation, Solicitationhistory } from '../../../../store/ducks/solicitation/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { useDispatch } from 'react-redux';
import { updateSolicitationRequest } from '../../../../store/ducks/solicitation/actions';
import formSchedule from './details/formSchedule';
import _ from 'lodash';
import api from '../../../../services/api';
import { PhotoUpload } from './PhotoUpload';

type Props = {
    data: Solicitation | undefined
    show: boolean
    handleClose: React.Dispatch<React.SetStateAction<void>>
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    setData: React.Dispatch<React.SetStateAction<Solicitation | undefined>>
}
  
const FormToAttendance: React.FC<Props> = ({
        data, 
        show, 
        handleClose, 
        message, 
        setMessage, 
        setData
    }) => { 

    const me = useSelector((state: ApplicationState) => state.me)
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false)
    const [terms, setTerms] = useState(false)
    const [croppedImage, setCroppedImage] = useState<any>('')

    const [detail, setDetail] = useState<DetailHistory[]>(formSchedule)

    useEffect(() => {
        console.log("Limpando!")
        setDetail([])
        console.log("Limpei!")
        setDetail(formSchedule)
        console.log("AQUIIIIIIII!!!")
      }, [])

    const handleTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerms(event.target.checked)
        console.log(event.target.checked)
      }

    const updateAnswer = (question: any, value_detail?: any) => {
            console.log("value", value_detail)
            setDetail(prev => {
            return prev.map(item => item.id_ref === question.id_ref
                ? 
                //return new
                {
                    ...item,
                    value_detail: value_detail ? value_detail :  '' //Fiz isso para nao aparecer undefined no wroteanswer
                }
                : 
                //Se não encontrou, volta o valor antigo
                item
            )
    })

    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity() === false) {
          event.stopPropagation()
        }
        
        if (terms) {
            setValidated(true)
            changeStatusData(4,'EM ATENDIMENTO'); 
            setMessage('');
            setData({})
            handleClose();
            setValidated(false)
        }
      }
      
    const changeStatusData = (status:number, history:string) => {
        let newSolicitation = data
        newSolicitation!.status = status
        let newHistory: Solicitationhistory;
        
        var dateNow = new Date(); 
        
        if (croppedImage) {
            const formdata = new FormData()
            formdata.append('file', croppedImage, 'alp.jpg') //selectedFile.name
            console.log("croppedImage", croppedImage)
            api.post('/upload', formdata, {}) //Sobe a terceira imagem
            .then((resA: any) => {

               
                newHistory = {
                    type_history: history,
                    created_at: dateNow.getTime()/1000,
                    parentSolicitation: data!.id,
                    status: 1,
                    //userId: me.me.id!,
                    parentUser: {id: me.me.id!},
                    message,
                    detail: [
                        ...detail,
                        {
                        type_detail: 'img',
                        value_detail: resA.data.filename
                        },
                    ]
                }
                newSolicitation!.history = [newHistory]
                console.log("*********Solic with DATA*********", newSolicitation)
                dispatch(updateSolicitationRequest(newSolicitation!))
            })
        } else {
            newHistory = {
                type_history: history,
                created_at: dateNow.getTime()/1000,
                parentSolicitation: data!.id,
                status: 1,
                //userId: me.me.id!,
                parentUser: {id: me.me.id!},
                message,
                detail
            }
            newSolicitation!.history = [newHistory]
            console.log("*********Solic with DATA*********", newSolicitation)
            dispatch(updateSolicitationRequest(newSolicitation!))
            handleClose();
        }



        }
    console.log("Detail", detail)
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Form validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Agendar: {data?.parentPatient?.profile?.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <h2>Agende a próxima sessão</h2>
                <br/>
                <div className='row'>
                {formSchedule.map((item) => {
                        let index = _.findIndex(formSchedule, {id_ref: item.id_ref});
                        return (
                            
                            <Form.Group key={item.id_ref} controlId={'item'+item.id_ref} className='col-md-6'>
                                <Form.Label>{item.type_detail}</Form.Label>
                                    <Form.Control 
                                        placeholder={item.type_detail}
                                        required
                                        value={detail[index].value_detail}
                                        onChange={(e) => updateAnswer(item, e.target.value)}
                                    />
                                <br/>
                            </Form.Group>
                            
                        )
                    })}
                </div>
                <br/>
                <InputGroup>
                {/* <InputGroup.Prepend> */}
                <InputGroup.Text>Informações adicionais</InputGroup.Text>
                {/* </InputGroup.Prepend> */}
                <FormControl
                    as='textarea'
                    aria-label='With textarea'
                    rows={10}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                </InputGroup>
                <br />
                <PhotoUpload
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    title={'Imagem (opcional)'}
                /> 
                <br />
                <Form.Group controlId='validationCustomTerms'>
                    <Form.Check
                        type='checkbox'
                        required
                        name='terms'
                        label='Confirmo o agendamento dessa solicitação'
                        feedback='Você precisa confirmar o agendamento para prosseguir.'
                        id='Check'
                        onChange={handleTerms}
                    />
                </Form.Group>
                <br/>
                <Button 
                    variant='outline-secondary btn-primary' 
                    type='submit'
                    size='sm'
                >
                Confirmar
                </Button>
                &nbsp;&nbsp;
                <Button 
                    variant='none' 
                    onClick={() => {
                        handleClose();
                        setData({})}
                    }
                    size='sm'>
                Cancelar
                </Button>
                </Modal.Body>
            </Form>
        </Modal>
    )

}
export {FormToAttendance}

