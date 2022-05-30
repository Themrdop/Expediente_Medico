import React from 'react'
import { Form } from 'react-bootstrap';

function HistoriaEnfermedadActual({onChangeForm}) {
  return (
    <div className="container">
        <form>
            <div className="row">
                <Form.Group className="col-md-12" controlId="HistoriaEnfermedadActual">
                    <Form.Label>Historia de Enfermedad Actual</Form.Label>
                    <Form.Control as="textarea" rows={16} placeholder="Historia de Enfermedad Actual" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
            </div>
        </form>
    </div>
  );
}

export default HistoriaEnfermedadActual;