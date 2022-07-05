import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import * as React from 'react'
import DatosPersonales from './components/DatosPersonales';
import MotivoConsulta from './components/MotivoConsulta';
import HistoriaEnfermedadActual from './components/HistoriaEnfermedadActual';
import RevisionPorAparatos from './components/RevisionPorAparatos'
import EnfermedadesInfectoContagiosas from './components/EnfermedadesInfectoContagiosas';
import EnfermedadesHederitarias from './components/EnfermedadesHederitarias';
import AntecedentesNoPatologicos from './components/AntecedentesNoPatologicos'

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
    const _RevisionPorAparatos = 3;
    const _EnfermedadesInfectoContagiosas = 4;
    const _EnfermedadesHederitarias = 5;
    const _AntecedentesNoPatologicos = 6;
    const _MaxNumberPages = 6;

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
                {(currentPage === _RevisionPorAparatos) && <RevisionPorAparatos/>}
                {(currentPage === _EnfermedadesInfectoContagiosas) && <EnfermedadesInfectoContagiosas/>}
                {(currentPage === _EnfermedadesHederitarias) && <EnfermedadesHederitarias/>}
                {(currentPage === _AntecedentesNoPatologicos) && <AntecedentesNoPatologicos/>}
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