import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { findAllCategoryApi } from "../../api/categoryApi"

function CategoriaPage(){
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

useEffect(()=>{
    async function getCategories(){
        const data = await findAllCategoryApi()
        console.log(data)
        setCategories(data)
    }
    getCategories()

},[])

    return <>
        <h3>Categoria</h3>
        <button className="bg-gray-500 text-white p-2 m-2 rounded" onClick={()=>{navigate('/dashboard',{replace:true})}}>Dashboard</button>
        <h4>Lista de categorias</h4>
        <ul>
            {categories?.map((item, index)=>(
                <li key={index}>[{item.id}] {item.name}</li>
            ))}
        </ul>
    </>
}

export default CategoriaPage