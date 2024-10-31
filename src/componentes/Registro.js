import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

function Registro({ setRegistro }) {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, contrasena }),
        });
    
        const data = await response.json();
    
        if (data.mensaje === "Inicio de sesión exitoso") {
            localStorage.setItem('token', data.token); // Almacena el token
            setMensaje("Inicio de sesión exitoso");
            setTimeout(() => {
                navigate('/perfil'); // Redirigir al perfil
            }, 1500);
        } else {
            setMensaje(data.mensaje);
        }
    }
    
    
    return (
        <div className="container-registro">
            <form onSubmit={handleSubmit}>
                <div>
                    <p className='session-text'>Iniciar Sesión</p>
                    <p className='session-text-mini'>
                        Oye! Si no tienes una cuenta<br />
                        <strong className='strong-login' onClick={() => setRegistro(true)}>¡Regístrate Aquí!</strong>
                    </p>
                </div>

                <div className="form__group field">
                    <input
                        type="email"
                        className="form__field"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="form__label">Email</label>
                </div>

                <div className="form__group field">
                    <input
                        type="password"
                        className="form__field"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                    <label htmlFor="contrasena" className="form__label">Contraseña</label>
                </div>

                <div>
                    <input type="checkbox" id="recordar" name="recordar" className="recordar" />
                    <label htmlFor="recordar"> Recordar contraseña</label>
                </div>

                <div>
                    <button type='submit' className='btn-34'>Ingresar</button>
                </div>

                {mensaje && <p className="mensaje">{mensaje}</p>}
            </form>
        </div>
    );
}

export default Registro;
