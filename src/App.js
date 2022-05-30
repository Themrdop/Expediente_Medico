import { Fab } from 'react-tiny-fab';
import { MdAdd } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as React from 'react'
import DatosPesonales from './components/DatosPersonales';
import { Route, Routes } from 'react-router-dom'
import ListaPacientes from './components/ListaPacientes';
import AgregarPacienteModal from './AgregarPacienteModal';

function App() {

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);

  //const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<ListaPacientes/>}/>
        <Route exact path="/DatosPesonales" element={<DatosPesonales/>}/>
        <Route component={ListaPacientes} />
      </Routes>
      <AgregarPacienteModal showModal={show} handleClose={handleClose}/>
      <Fab
        alwaysShowTitle={true}
        icon={<MdAdd />}
        onClick={() => setShow(true)}
      />
    </div>
  );
}

export default App;
