import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function MenuPage(){
    const navigate = useNavigate()
    const {logout, user} = useAuth()

    const name = user?.username || '';
    const rol = user?.role || '';

    const salir = ()=>{
        logout();
        navigate('/', {replace:true})
    }
    const toCategoria=()=>{
        navigate('/categoria',{replace:true})
    }

    return <>
        <h3>Dashboard de {name} con rol de {rol}</h3>
        <button className="bg-blue-500 text-white p-2 m-2 rounded" onClick={toCategoria}>Categoria</button>
        <button className="bg-red-500 text-white p-2 m-2 rounded" onClick={salir}>Salir</button>
    </>
}

export default MenuPage