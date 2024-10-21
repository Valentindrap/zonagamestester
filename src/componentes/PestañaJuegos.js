import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarPage from "./NavbarPage";
import "../componentes/PestañaJuegos.css";

function PestañaJuegos() {
    const location = useLocation();
    const juegoSeleccionado = location.state?.juego;
    const gameContainerRef = useRef(null);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    useEffect(() => {
        console.log(juegoSeleccionado); // Para verificar el objeto
    }, [juegoSeleccionado]);

    if (!juegoSeleccionado) {
        return <div>No se seleccionó ningún juego.</div>;
    }

    return (
        <div>
            <NavbarPage />
            <div className="contenedor-anuncios">
                <div className="anuncio"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuerpq_ADZW4Z1VNjKSaUGeO1OkK7I4WDKuQ&s"></img></div>
                <div className="PestañaJuegos-container">
                    <div className="MedPestañaJuegos-container" ref={gameContainerRef}>
                        <div className="fullscreen-btn-container">
                            <button className="btn btn-primary fullscreen-btn" onClick={toggleFullScreen}>
                                <i className="bi bi-fullscreen "></i> {/* Icono de pantalla completa */}
                                {document.fullscreenElement ? " Salir de Pantalla Completa" : " Pantalla Completa"}
                            </button>
                        </div>
                        <iframe
                            src={juegoSeleccionado.url}
                            title={juegoSeleccionado.nombre}
                        ></iframe>
                        <div className="Nombre-PestañaJuegos">
                            <div className="IzqNombre-PestañaJuegos">
                                <p>{juegoSeleccionado.nombre}</p>
                            </div>
                            <div className="DerNombre-PestañaJuegos">
                                <p><i className="bi bi-star"></i> Calificación: {juegoSeleccionado.calificacion}</p>
                            </div>
                        </div>
                        <div className="Abajo-PestañaJuegos">
                            <h3>Descripción</h3>
                            <p>{juegoSeleccionado.descripcion}</p>
                        </div>
                    </div>
                </div>
                <div className="anuncio">Anuncio Derecho</div>
            </div>
        </div>
    );
}

export default PestañaJuegos;
