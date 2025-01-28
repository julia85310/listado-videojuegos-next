'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link'

export default function ListaVideojuegosPage(){

    const [videojuegos, setVideojuegos] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        let url = "http://localhost:3000/api/videojuegos"; 

        const res = await fetch(url);
        const data = await res.json();
        setVideojuegos(data);
    }

    async function deleteVideojuego(videojuego){
        const result = window.confirm(`¿Deseas eliminar '${videojuego.titulo}'?`);
        if (!result) {
          return;
        }
        try {
          const res = await fetch("http://localhost:3000/api/videojuegos", {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: videojuego.id}),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            fetchData();
            alert(`Videojuego '${videojuego.titulo}' eliminado`);
          }
        } catch (error) {
        }
    }

    async function marcarCompletado(videojuego){
        const nuevoVideojuego = {...videojuego, completado:!videojuego.completado};
        try {
            const res = await fetch("http://localhost:3000/api/videojuegos", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoVideojuego),
            });

            const data = await res.json();

            if (res.ok) {
                fetchData();
                alert('Actualizado');
            } else {
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }


    return <div>
        <h1>Biblioteca de videojuegos</h1>
        {videojuegos.length == 0  && <p>No se ha encontrado ningun videojuego</p>}
        <Link style={{ color: "blue" }} href={"/videojuegos/form-add-videojuegos"}>Añade un videojuego aqui</Link><br></br>
        {videojuegos.length != 0 &&
            <div>
            <p>Filtrar por titulo: <input type='text' value={filtro} onChange={(e) => setFiltro(e.target.value)}></input></p>
            <ul>
                {videojuegos.map((videojuego) =>
                    {
                        if (!filtro || videojuego.titulo.includes(filtro)){
                            return  <li key={videojuego.id}>
                                <Link href={"/videojuegos/" + videojuego.id }>
                                <p style={{fontWeight: 'bold'}}>{videojuego.titulo}</p>
                                <p>Plataforma: {videojuego.plataforma}</p>
                                </Link> 
                                {!videojuego.completado && <button onClick={() => marcarCompletado(videojuego)}>Marcar como completado</button>}
                                <button onClick={() => deleteVideojuego(videojuego)}>Eliminar</button>
                            </li>
                        }
                    }
                )}
            </ul>
        </div>}
    </div>
}
