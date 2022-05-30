import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { MdSearch } from "react-icons/md";

function DatosPersonales({onChangeForm}) {
  return (
    <div className="container">
    <div className="row">
        <h2>Datos Personales</h2>
        <form>
            <div className="row">
                <Form.Group className="col-md-10" controlId="Cedula">
                    <Form.Label>Cedula</Form.Label>
                    <Form.Control type="text" placeholder="Cedula" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
                <Form.Group className="col-md-2" controlId="Cedula">
                    <br/>
                    <Button><MdSearch/></Button>
                </Form.Group>
                <Form.Group className="col-md-3" controlId="edad">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="text" placeholder="Edad" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
                <Form.Group className="col-md-9" controlId="HireDate">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control type="date" placeholder="Fecha de nacimiento" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-12" controlId="LugarNacimiento">
                    <Form.Label>Lugar de nacimiento</Form.Label>
                    <Form.Control type="text" placeholder="Lugar de nacimiento" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
                <Form.Group className="col-md-6" controlId="sexo">
                    <Form.Label>Sexo</Form.Label><br/>
                    <input type="radio" value="Masculino" name="gender" /> Masculino
                    <input type="radio" value="Femenino" name="gender" /> Femenino
                </Form.Group>
                <Form.Group className="col-md-6" controlId="Procedencia">
                    <Form.Label>Procedencia</Form.Label>
                    <Form.Control type="text" placeholder="Procedencia" onChange={(e) => onChangeForm(e)}/>
                </Form.Group>
                <Form.Group className="col-md-6" controlId="Religion">
                    <Form.Label>Religion</Form.Label>
                    <Form.Control type="text" placeholder="Religion" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="Escolaridad">
                    <Form.Label>Escolaridad</Form.Label>
                    <Form.Control type="text" placeholder="Escolaridad" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="profecion">
                    <Form.Label>Profecion u oficio</Form.Label>
                    <Form.Control type="text" placeholder="Profecion u oficio" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="DireccionHabitual">
                    <Form.Label>Direccion habitual</Form.Label>
                    <Form.Control type="text" placeholder="Direccion habitual" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="NombrePadre">
                    <Form.Label>Nombre de padre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre de padre" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="NombreMadre">
                    <Form.Label>Nombre de madre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre de madre" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="FuenteInformacion">
                    <Form.Label>Fuente de información</Form.Label>
                    <Form.Control type="text" placeholder="Fuente de información" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="Confiabilidad">
                    <Form.Label>Confiabilidad</Form.Label>
                    <Form.Control type="text" placeholder="Confiabilidad" onChange={(e) => onChangeForm(e)} />
                </Form.Group>
            </div>
        </form>
    </div>
</div>
  );
}

export default DatosPersonales;