import React from 'react'
import { Form } from 'react-bootstrap';
import CustomizedHook from './CustomizedHook'
import RevisionData from './LocalData/RevicionData.json';

function RevisionPorAparatos({onChangeForm}) {
  return (
    <div className="container">
        <form>
            <div className="row">
                <Form.Group className="col-md-12" controlId="motivoConsulta">
                    <Form.Label>Revision por aparatos y sistemas</Form.Label>
                    <CustomizedHook PreloadData={RevisionData}/>
                    <br/>
                    <Form.Control as="textarea" rows={5} placeholder="Otros hallazgos en el interrogatorio" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
            </div>
        </form>
</div>
  );
}

export default RevisionPorAparatos;