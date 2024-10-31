// perfil.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPage from "./NavbarPage";
import "./perfil.css";

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [favoritos, setFavoritos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerPerfil();
        cargarFavoritos();
    }, []);

    async function obtenerPerfil() {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost/perfil.php?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();

            if (data.mensaje) {
                setMensaje(data.mensaje);
            } else {
                setUsuario(data);
            }
        } catch (error) {
            console.error("Hubo un problema con la solicitud fetch:", error);
        }
    }

    const cargarFavoritos = () => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        setFavoritos(favoritos);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleJuegoClick = (juego) => {
        console.log(juego);
        navigate('/juego/:id', { state: { juego } });
    };

    return (
        <div>
            <NavbarPage />
            <div className="perfil-container">
                <h2 className="perfil-title">Perfil del Usuario</h2>
                {mensaje && <p className="perfil-message">{mensaje}</p>}
                {usuario ? (
                    <div className="perfil-info">
                        <p><strong>Email:</strong> {usuario.email}</p>
                        <p><strong>Fecha de Registro:</strong> {new Date(usuario.created_at).toLocaleDateString()}</p>
                        <button onClick={handleLogout} className="perfil-logout-button">Cerrar Sesión</button>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
                <h2>Juegos Favoritos</h2>
                <ul className="favoritos-list">
                    {favoritos.length > 0 ? (
                        favoritos.map(juego => (
                            <li key={juego.id} onClick={() => handleJuegoClick(juego)} className="favorito-item">
                                <img src={juego.portada} alt={`Portada de ${juego.nombre}`} className='portadaperfil'/>
                                <div className="favorito-info">
                                    <h3>{juego.nombre}</h3>
                                    <p>Calificación: {juego.calificacion}</p>
                                    <p>Descripción: {juego.descripcion}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No tienes juegos favoritos.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Perfil;
