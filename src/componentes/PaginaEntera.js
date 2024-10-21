import CargaLogin from "./CargaLogin";
import PaginaPrincipal from "./PaginaPrincipal";


function PaginaEntera({goregistro, setGoregistro}){
    
    return(
        <div>

         { !goregistro?
            <PaginaPrincipal setGoregistro={setGoregistro}/>
            :
            <CargaLogin setGoregistro={setGoregistro}/>
        }

        </div>
    )
}

export default PaginaEntera