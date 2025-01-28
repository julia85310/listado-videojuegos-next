'use client'
import {use, useState, useEffect} from 'react';
import { permanentRedirect, redirect  } from 'next/navigation'
export default function AddVideojuegoPage({params}){
    const [formData, setFormData] = useState({});
    const [videojuego, setVideojuego] = useState({});
    const {id} = use(params);
    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const url = "/api/videojuegos/videojuego?id=" + id
        const res = await fetch(url);
        const data = await res.json();
        setFormData(data);
        setVideojuego(data);
    }

    async function updateVideojuego(e){
        e.preventDefault();
        if(!comprobaciones()){
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/videojuegos", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Actualizado');
                redirect("http://localhost:3000/videojuegos/" + formData.id);
            } else {
                setFormData(videojuego);
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }

    function comprobaciones(){
        let todoGuay = true;
        if(!formData.titulo ){
            alert('Titulo requerido');
            todoGuay = false;
        }else if(!formData.plataforma){
            alert('Plataforma requerida');
            todoGuay = false;
        }else if(!formData.genero){
            alert('Género requerido');
            todoGuay = false;
        }else if(!formData.fecha_lanzamiento){
            alert('Fecha de lanzamiento requerida');
            todoGuay = false;
        }else if (!formData.fecha_lanzamiento instanceof Date){
            alert('Fecha de lanzamiento inválida');
            todoGuay = false;
         }
        return todoGuay;
    }

    return <div>
        <h1>Actualizar videojuego</h1>
        <main>
            <form onSubmit={(e) => updateVideojuego(e)}>
                <label>Titulo: <input type="text" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} required></input></label><br></br>
                <label>Plataforma: <input type="text" value={formData.plataforma} onChange={(e) => setFormData({...formData, plataforma: e.target.value})} required></input></label><br></br>
                <label>Género: <input type="text" value={formData.genero} onChange={(e) => setFormData({...formData, genero: e.target.value})} required></input></label><br></br>
                <label>Fecha de lanzamiento: <input type="date" value={formData.fecha_lanzamiento} onChange={(e) => setFormData({...formData, fecha_lanzamiento: e.target.value})} required></input></label><br></br>
                <label><input type='checkbox' checked={formData.completado} onChange={(e) => setFormData({...formData, completado: e.target.value})}></input>Completado</label><br></br>
                <input type='submit' className='submit' value='Actualizar videojuego'></input>
            </form>
        </main>
    </div>
}