'use client'
import Link from 'next/link'
import {use, useState, useEffect} from 'react';
export default function VideojuegoPage({params}){
    const {id} = use(params);
    const [videojuego, setVideojuego] = useState({});
    
    useEffect(() => {
        fetchData();
    }, [])
    
    async function fetchData() {
        const url = "/api/videojuegos/videojuego?id=" + id
        const res = await fetch(url);
        const data = await res.json();
        setVideojuego(data);
    }


    if (!videojuego) {
        return <h1>Videojuego no encontrado</h1>;
    }
    
    return <div>
            <h1>{videojuego.titulo}</h1>
            <p>    Plataforma: {videojuego.plataforma}</p>
            <p>    Género: {videojuego.genero}</p>
            <p>    Fecha de lanzamiento: {videojuego.fecha_lanzamiento}</p>
            <p>    Estado de completado: {videojuego.completado? <>Sí</>:<>No</>} </p>
            <Link href={"/videojuegos/form-edit-videojuegos/" + videojuego.id}><button>Editar</button></Link> 
            <Link href={"/videojuegos"}><button>Volver a la página principal</button></Link> 
    </div>
}
