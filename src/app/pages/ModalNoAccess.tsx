import React from 'react'
import { Modal } from 'react-bootstrap-v5'
import { Component } from '../../store/ducks/component/types'
const MOMENT = require('moment')

type Props = {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    data: Component
}
const ModalNoACcess: React.FC<Props> = ({ show, setShow, data }) => {
    let extra_release = data?.extras?.filter((extra: any) => extra.keyExtra === 'release')[0];
    let release = '1969/01/01 00:00:01'
    if(extra_release?.valueExtra) 
    release = extra_release?.valueExtra

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop='static'
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Ops! SEM ACESSO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Comprar: <b>{data.name}</b>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default ModalNoACcess