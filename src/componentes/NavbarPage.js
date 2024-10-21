import { Link } from "react-router-dom";
import imglogo from "../img/Icon-black-Logo.png";
import "./NavbarPage.css";

function NavbarPage({ setGoregistro }) {
    return (
        <nav>
            <div className="ContenedorNavbar">
                <div className="navbarizquierda">
                    <Link to={'/'}><img src={imglogo} className="imagenlogo" /></Link>
                </div>
                <div></div>
                <div className="navbarderecha">
                    <Link to={'/CargaLogin'}><i className="bi bi-person-circle User-circle"></i></Link>
                    <Link to={'/perfil'}><i className="bi bi-person-circle User-circle"></i> Perfil</Link> {/* Enlace al perfil */}
                </div>
            </div>
        </nav>
    );
}

export default NavbarPage;
