import React from 'react'
import { Form } from 'react-bootstrap';
import CustomizedHook from './CustomizedHook'
import EnfermedadesHederitariasJson from './LocalData/EnfermedadesHereditarias.json'

function EnfermedadesHederitarias({onChangeForm}) {
  return (
    <div className="container">
        <form>
            <div className="row">
                <Form.Group className="col-md-12" controlId="edad">
                    <Form.Label>Enfermedades hereditarias</Form.Label>
                    <CustomizedHook PreloadData={EnfermedadesHederitariasJson} Label="Enfermedades hereditarias"/>
                    <br/>
                    <Form.Control as="textarea" rows={5} placeholder="Otros" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
            </div>
        </form>
</div>
  );
}

export default EnfermedadesHederitarias;