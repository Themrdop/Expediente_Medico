import React from 'react'
import { Form } from 'react-bootstrap';
import CustomizedHook from './CustomizedHook'
import EnfermedadesInfectoContagiosas from './LocalData/EnfermedadesInfectoContagiosas.json';

function AntecedentesFamiliares({onChangeForm}) {
  return (
    <div className="container">
        <form>
            <div className="row">
                <Form.Group className="col-md-12" controlId="edad">
                    <Form.Label>Enfermedades infecto-contagiosas</Form.Label>
                    <CustomizedHook PreloadData={EnfermedadesInfectoContagiosas}/>
                    <br/>
                    <Form.Control as="textarea" rows={5} placeholder="Otros" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
            </div>
        </form>
</div>
  );
}

export default AntecedentesFamiliares;