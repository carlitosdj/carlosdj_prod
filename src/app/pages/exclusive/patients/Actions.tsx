import React from 'react'
import { Solicitation } from '../../../../store/ducks/solicitation/types'
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap-v5'

type Props = {
    actions: string[]
    data: Solicitation
    setData: React.Dispatch<React.SetStateAction<Solicitation | undefined>>
    setShowAnalise: React.Dispatch<React.SetStateAction<boolean>>
    setShowRequirement: React.Dispatch<React.SetStateAction<boolean>>
    setShowScheduling: React.Dispatch<React.SetStateAction<boolean>>
    setShowForward: React.Dispatch<React.SetStateAction<boolean>>
    setShowReproval: React.Dispatch<React.SetStateAction<boolean>>
    //setShowToAttendance: React.Dispatch<React.SetStateAction<boolean>>
    setShowNewSection: React.Dispatch<React.SetStateAction<boolean>>
    setShowFinalize: React.Dispatch<React.SetStateAction<boolean>>
    setShowHistory: React.Dispatch<React.SetStateAction<boolean>>
  }

const Actions: React.FC<Props> = ({
    actions,
    data,
    setData,
    setShowAnalise,
    setShowRequirement,
    setShowScheduling,
    setShowForward,
    setShowReproval,
    //setShowToAttendance,
    setShowNewSection,
    setShowFinalize,
    setShowHistory

}) => { 
    
    return (
        <>
        <DropdownButton
            as={ButtonGroup}
            size="sm"
            //style={{zIndex: 999}}
            drop={'down'}
            variant="none"
            // key={variant}
            // id={`dropdown-variants-${variant}`}
            // variant={variant.toLowerCase()}
            title={'Ações'}
        >
            {/* {actions.includes('solicitar')
            &&
            <Dropdown.Item eventKey="1"
                onClick={() => {
                if (window.confirm('Deseja mover para PENDENTE: ' + data.parentPatient?.profile?.name + '?'))
                    changeStatus(data, 0, 'PENDENTE')
                }
                }
            >Pendente
            </Dropdown.Item>
            } */}
            <Dropdown.Item eventKey="2"
                onClick={() => {
                console.log("data selected", data)
                setShowHistory(true)
                setData(data)
                }} className='fs-8'>Ver Prontuário
            </Dropdown.Item>
            {actions.includes('analise')
            &&
            <Dropdown.Item eventKey="2"
                onClick={() => {
                console.log("data selected", data)
                setShowAnalise(true)
                setData(data)
                }} className='fs-8'>Analisar
            </Dropdown.Item>
            }
            {actions.includes('exigencia')
            &&
            <Dropdown.Item eventKey="3"
                onClick={() => {
                console.log("data selected", data)
                setShowRequirement(true)
                setData(data)
                }} className='fs-8'>Mover p/ Exigência</Dropdown.Item>
            }
            {actions.includes('novaexigencia')
            && <Dropdown.Item eventKey="4"
                onClick={() => {
                console.log("data selected", data)
                setShowRequirement(true)
                setData(data)
                }} className='fs-8'>Nova Exigência</Dropdown.Item>
            }
            {actions.includes('aprovar')
            &&
            <Dropdown.Item eventKey="5"
                onClick={() => {
                console.log("data selected", data)
                setShowScheduling(true)
                //setShowNewSection(true)
                setData(data)
                }} className='fs-8'>Agendar</Dropdown.Item>
            }
            {actions.includes('encaminhar')
            &&
            <Dropdown.Item eventKey="6"
                onClick={() => {
                console.log("data selected", data)
                setShowForward(true)
                setData(data)
                }} className='fs-8'>Encaminhar</Dropdown.Item>
            }
            {actions.includes('reprovar')
            &&

            <Dropdown.Item eventKey="7"
                onClick={() => {
                console.log("data selected", data)
                setShowReproval(true)
                setData(data)
                }} className='fs-8'>Reprovar</Dropdown.Item>
            }
            {/* {actions.includes('ematendimento')
            &&
            <Dropdown.Item eventKey="8"
                onClick={() => {
                console.log("data selected", data)
                setShowToAttendance(true)
                setData(data)
                }} className='fs-8'>Mover p/ atendimento</Dropdown.Item>
            } */}
            {actions.includes('novasecao')
            &&
            <Dropdown.Item eventKey="9"
                onClick={() => {
                console.log("data selected", data)
                setShowNewSection(true)
                setData(data)
                }} className='fs-8'>Concluir sessão e agendar nova</Dropdown.Item>
            }

            {actions.includes('finalizar')
            &&
            <Dropdown.Item eventKey="10"
                onClick={() => {
                console.log("data selected", data)
                setShowFinalize(true)
                setData(data)
                }} className='fs-8'>Concluir sessão e Finalizar</Dropdown.Item>
            }

            {/* <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}

        </DropdownButton>
        </>
    )
}

export default Actions