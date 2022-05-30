import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import * as React from 'react'
import DatosPersonales from './components/DatosPersonales';
import MotivoConsulta from './components/MotivoConsulta';
import HistoriaEnfermedadActual from './components/HistoriaEnfermedadActual';

function AgregarPacienteModal({showModal, handleClose}) {

    const handleNext = () => {
        if(_MaxNumberPages > currentPage){
            setcurrentPages(currentPage+1);
        }
    }

    const [currentPage, setcurrentPages] = React.useState(0);
    const _DatosPersonales = 0;
    const _MotivoConsulta = 1;
    const _HistoriaEnfermedadActual = 2;
    const _MaxNumberPages = 2;

    let _button;

    if(currentPage !== _MaxNumberPages){ 
        _button = <Button variant="primary" onClick={() => handleNext()}>
                    Siguiente
                </Button>
    }else{
        _button = <Button variant="primary" onClick={() => handleNext()}>
                    Guardar
                </Button>
    }

    return (
        <>
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Body>
                {(currentPage === _DatosPersonales) && <DatosPersonales/>}
                {(currentPage === _MotivoConsulta) && <MotivoConsulta/>}
                {(currentPage === _HistoriaEnfermedadActual) && <HistoriaEnfermedadActual/>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => {handleClose(); setcurrentPages(0);}}>
                Cancelar
            </Button>
            { 
                _button
            }
            </Modal.Footer>
        </Modal>
        </>
    );
}

  export default AgregarPacienteModal;