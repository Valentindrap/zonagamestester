import { Link } from "react-router-dom";
import "./CargaLogin.css";
import FotoLogin from "./FotoLogin";
import Registro from "./Registro";
import imglogo from '../img/Icon-black.png'
import { useState } from "react";
import RegistroDos from "./RegistroDos";


function CargaLogin(){
    const [registro, setRegistro] = useState(false)
    return(
        <div className="CargaLogin-container">
            
            <div><Link to={'/'}><img src={imglogo} className='Icon-black'/></Link></div>
            
            
            <div className="Registro-position">
                { registro? 
                    <RegistroDos 
                    setRegistro={setRegistro}/> 
                :
                    <Registro 
                    setRegistro={setRegistro}/>
                }
            </div>

            <div className="FotoLogin-position"><FotoLogin /></div>
            
        </div>
    )
}

export default CargaLogin;