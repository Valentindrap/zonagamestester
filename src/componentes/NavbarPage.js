import { Link } from "react-router-dom";
import imglogo from "../img/Icon-black-Logo.png";
import "./NavbarPage.css";

function NavbarPage({ setGoregistro }) {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token

    return (
        <nav>
            <div className="ContenedorNavbar">
                <div className="navbarizquierda">
                    <Link to={'/'}>
                        <img src={imglogo} className="imagenlogo" alt="Logo" />
                    </Link>
                </div>
                <div></div>
                <div className="navbarderecha">
                    <Link to={isAuthenticated ? '/perfil' : '/CargaLogin'}>
                        <i className="bi bi-person-circle User-circle"></i> 
                        {isAuthenticated ? ' ' : ' '}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavbarPage;
