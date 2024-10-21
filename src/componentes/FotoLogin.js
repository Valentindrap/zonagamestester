import './FotoLogin.css';
import imglogin from '../img/Login-photo.png'

function FotoLogin(){
    return(
        <div className='container-photo-login'>
            <img src={imglogin} alt='login-photo' className='login-photo'></img>
            <p className='play-text'>No compartas tu<br/> contraseña </p>
            <p className='play-text-mini'>Jugar seguro es simple </p>
        </div>
    )
}

export default FotoLogin;