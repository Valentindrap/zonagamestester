// Perfil.jsx
import React, { useEffect, useState } from 'react';

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        obtenerPerfil();
    }, []);

    async function obtenerPerfil() {
        try {
            const response = await fetch('http://localhost/perfil.php', {
                method: 'GET',
                credentials: 'include', // Asegúrate de incluir las credenciales
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();

            if (data.mensaje) {
                setMensaje(data.mensaje); // Establece el mensaje si no estás autenticado
            } else {
                setUsuario(data); // Establece los datos del usuario si la autenticación es exitosa
            }
        } catch (error) {
            console.error("Hubo un problema con la solicitud fetch:", error);
        }
    }

    return (
        <div className="container-perfil">
            <h2>Perfil del Usuario</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            {usuario ? (
                <div>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Fecha de Registro:</strong> {new Date(usuario.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default Perfil;
