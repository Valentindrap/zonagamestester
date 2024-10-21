import { useState } from 'react';
import './RegistroDos.css';

function RegistroDos({ setRegistro }) {
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [mensaje, setMensaje] = useState(''); // Estado para el mensaje de error o éxito 

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el envío normal del formulario

        // Validar que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            setMensaje("Las contraseñas no coinciden.");
            return;
        }

        const response = await fetch('http://localhost/registro.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, usuario, contrasena }),
        });

        const data = await response.json();
        setMensaje(data.mensaje); // Mostrar el mensaje del servidor

        // Redirigir si el registro fue exitoso
        if (data.mensaje === "Registro exitoso") {
            setTimeout(() => {
                setRegistro(false); // Redirigir al usuario a el login
            }, 1500); // Esperar 1.5 segundos antes de redirigir
        }
    };

    return (
        <div className="container-registro">
            <form onSubmit={handleSubmit}>
                <div>
                    <p className='session-text'>Iniciar Sesión</p>
                    <p className='session-text-mini'>Oye! Si ya tienes una cuenta<br />
                        <strong className='strong-login' onClick={() => setRegistro(false)}>Inicia sesión aquí!</strong>
                    </p>
                </div>

                <div className="form__group field">
                    <input type="email" className="form__field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label className="form__label">Email</label>
                </div>

                <div className="form__group field">
                    <input type="text" className="form__field" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                    <label className="form__label">Usuario</label>
                </div>

                <div className="form__group field">
                    <input type="password" className="form__field" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                    <label className="form__label">Contraseña</label>
                </div>

                <div className="form__group field">
                    <input type="password" className="form__field" placeholder="Confirmar Contraseña" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} required />
                    <label className="form__label">Confirmar Contraseña</label>
                </div>

                <div>
                    <button type='submit' className='btn-34'>Registrarse</button>
                </div>

                {/* Mostrar mensaje de error o éxito */}
                {mensaje && <p className="mensaje">{mensaje}</p>}
            </form>
        </div>
    );
}

export default RegistroDos;
