import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PaginaPrincipal from './componentes/PaginaPrincipal';
import CargaLogin from './componentes/CargaLogin';
import PestañaJuegos from './componentes/PestañaJuegos';
import Perfil from './componentes/perfil';

function App() {
  return(
    <div className='app'>

        <BrowserRouter>

          <Routes>
            
            <Route path='/' element={<PaginaPrincipal/>}/>
            <Route path='/CargaLogin' element={<CargaLogin/>}/>
            <Route path="/juego/:id" element={<PestañaJuegos/>} />
            <Route path='/perfil' element={<Perfil/>} />

          </Routes>

        </BrowserRouter>

    </div>
  )
}

export default App;
