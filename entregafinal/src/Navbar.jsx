import { useContext } from 'react'
import temaContext from "./context"
import Carrito from  "./Carrito"
import './styles/navbar.css'

function Navbar() {
    const {tema, cambiarTema} = useContext(temaContext);
    return(
        <div className='navegador'>
            <a href="">Inicio</a>
            <a href="">Nosotros</a>
            <a href="">Redes sociales</a>
            <Carrito/>
            <button onClick={cambiarTema} style={{background:tema.background, color:tema.font}}>Cambiar tema</button>
        </div>
    )
}

export default Navbar