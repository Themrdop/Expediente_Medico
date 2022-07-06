import * as React from 'react'
import { Form } from 'react-bootstrap';

function AntecedentesPersonalesPatologicos({onChangeForm}) {
    return (
      <div className="container">
        <form>
            <div className="row">
                <h2>Antecedentes personales patológicos</h2>
                <Form.Group className="col-md-12" controlId="Vacunas">
                    <Form.Label>Enfermedades infecto-contagiosas previas (registrar fecha)</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Vacunas">
                    <Form.Label>Enfermedades cronícas</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Vacunas">
                    <Form.Label>Cirugías previas realizadas</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Vacunas">
                    <Form.Label>Hospitalizaciones (registrar fecha y causas del hospitalización)</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
              </div>
          </form>
  </div>
    );
  }
  
  export default AntecedentesPersonalesPatologicos;