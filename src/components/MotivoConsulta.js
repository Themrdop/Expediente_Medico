import React from 'react'
import { Form } from 'react-bootstrap';

function MotivoConsulta({onChangeForm}) {
  return (
    <div className="container">
        <form>
            <div className="row">
                <Form.Group className="col-md-12" controlId="edad">
                    <Form.Label>Motivo de consulta</Form.Label>
                    <Form.Control as="textarea" rows={16} placeholder="Motivo de consulta" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
            </div>
        </form>
</div>
  );
}

export default MotivoConsulta;