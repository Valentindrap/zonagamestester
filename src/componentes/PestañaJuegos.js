import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarPage from "./NavbarPage";
import "../componentes/PestañaJuegos.css";

function PestañaJuegos() {
    const location = useLocation();
    const juegoSeleccionado = location.state?.juego;
    const gameContainerRef = useRef(null);
    const [isFavorito, setIsFavorito] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const handleFavoritoClick = () => {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        
        if (isFavorito) {
            // Si ya es favorito, eliminarlo
            favoritos = favoritos.filter(favorito => favorito.id !== juegoSeleccionado.id);
            setIsFavorito(false);
        } else {
            // Agregar a favoritos
            favoritos.push(juegoSeleccionado);
            setIsFavorito(true);
        }
        
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    };

    useEffect(() => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const isFav = favoritos.some(favorito => favorito.id === juegoSeleccionado.id);
        setIsFavorito(isFav);
    }, [juegoSeleccionado]);

    if (!juegoSeleccionado) {
        return <div>No se seleccionó ningún juego.</div>;
    }

    return (
        <div>
            <NavbarPage />
            <div className="contenedor-anuncios">
                <div className="anuncio"></div>
                <div className="PestañaJuegos-container">
                    <div className="MedPestañaJuegos-container" ref={gameContainerRef}>
                        <div className="fullscreen-btn-container">
                            <button className="btn btn-primary fullscreen-btn" onClick={toggleFullScreen}>
                                <i className="bi bi-fullscreen "></i>
                                {document.fullscreenElement ? " Salir de Pantalla Completa" : " Pantalla Completa"}
                            </button>
                        </div>
                        <iframe
                            src={juegoSeleccionado.url}
                            title={juegoSeleccionado.nombre}
                        ></iframe >
                        <div className="Nombre-PestañaJuegos">
                            <div className="IzqNombre-PestañaJuegos">
                                <p>{juegoSeleccionado.nombre}</p>
                                <button onClick={handleFavoritoClick} className="btn btn-favoritos">
                                   {isFavorito ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
                                </button>
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
                <div className="anuncio"></div>
            </div>
        </div>
    );
}

export default PestañaJuegos;
