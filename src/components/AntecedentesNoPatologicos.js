import * as React from 'react'
import { Form } from 'react-bootstrap';

function MotivoConsulta({onChangeForm}) {
    return (
      <div className="container">
        <form>
            <div className="row">
                <h2>Antecedentes personales no patológicos</h2>
                <Form.Group className="col-md-12" controlId="Vacunas">
                    <Form.Label>Inmunizaciones completas (confirmarcon tarjeta de vacuna si es posible)</Form.Label>
                    <input type="radio" value="Si" name="Inmunizaciones_completas" /> Si
                    <input type="radio" value="No" name="Inmunizaciones_completas" /> No
                    <br/>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Habitos">
                    <h4>Habitos</h4>
                    <Form.Label>Horas de sueño</Form.Label>
                    <Form.Control type="text" placeholder="Horas de sueño" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Horas laborales</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Habitos">
                    <Form.Label>Tipo y hora de actividad fisica</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Alimnetnacion">
                    <Form.Label>Alimentación</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Vacunas">
                    <h4>Tabaco</h4>
                    <input type="radio" value="Si" name="Inmunizaciones_completas" /> Si
                    <input type="radio" value="No" name="Inmunizaciones_completas" /> No
                    <br/>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Frecuencia</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Edad de inicio</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Edad de abandono (si aplica)</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>duracion del habito (en años)</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Vacunas">
                    <h4>Alcohol</h4>
                    <input type="radio" value="Si" name="Inmunizaciones_completas" /> Si
                    <input type="radio" value="No" name="Inmunizaciones_completas" /> No
                    <br/>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Frecuencia</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Edad de inicio</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Edad de abandono (si aplica)</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>duracion del habito (en años)</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Vacunas">
                    <h4>Drogas ilegales</h4>
                    <input type="radio" value="Si" name="Inmunizaciones_completas" /> Si
                    <input type="radio" value="No" name="Inmunizaciones_completas" /> No
                    <br/>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Frecuencia</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Edad de inicio</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Edad de abandono (si aplica)</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>duracion del habito (en años)</Form.Label>
                    <Form.Control type="text" placeholder="Horas laborales" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>

                <Form.Group className="col-md-12" controlId="Vacunas">
                    <h4>Farmacos</h4>
                    <input type="radio" value="Si" name="Inmunizaciones_completas" /> Si
                    <input type="radio" value="No" name="Inmunizaciones_completas" /> No
                    <br/>
                    <Form.Label>Número de medicamentos que esta reciviendo actualemte (prescritos o no)</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                    <Form.Label>Otros habitos</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
              </div>
          </form>
  </div>
    );
  }
  
  export default MotivoConsulta;