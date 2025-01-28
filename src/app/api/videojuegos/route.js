import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hiltuhxwiptrgbnerjrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbHR1aHh3aXB0cmdibmVyanJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDgzMTUsImV4cCI6MjA1MjY4NDMxNX0.mHcAkPWO7_NDTIbUZ5xWyoeHrfGsUz_fYy6VgIuWTm0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
    try {
      const { data: videojuegos, error } = await supabase.from('videojuego').select('*').order('titulo', { ascending: true });
  
      if (error) {
        return new Response(
          JSON.stringify({ error: 'Error al obtener los datos', details: error.message }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(JSON.stringify(videojuegos), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
}

export async function DELETE(request){
    const body = await request.json();
    
    try{
      const {data: data, error} = await supabase.from('videojuego').delete().eq('id', body.id);
  
      if (error) {
        return new Response(
          JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
}

export async function POST(request) {
    const body = await request.json();
    const res = comprobaciones(body);
  
    if(res instanceof Response){
      return res;
    }
  
    try {
      const { data: data, error } = await supabase.from('videojuego').insert([res]);
      if (error) {
        return new Response(
          JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
}

function comprobaciones(body){
    if(!body.titulo){
        return new Response(
        JSON.stringify({ error: 'Titulo requerido'}),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    if(!body.plataforma){
        return new Response(
        JSON.stringify({ error: 'Plataforma requerida'}),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    if(!body.genero ){
        return new Response(
        JSON.stringify({ error: 'Género requerido'}),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    if(!body.fecha_lanzamiento ){
        return new Response(
        JSON.stringify({ error: 'Fecha de lanzamiento requerida'}),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    return body;
}
  
export async function PUT(request) {
    const body = await request.json();
    const res = comprobaciones(body);
  
    if(res instanceof Response){
      return res;
    }

    try {
      const { data: data, error } = await supabase.from('videojuego').
      update({
            titulo: body.titulo,
            plataforma: body.plataforma,
            genero: body.genero,
            fecha_lanzamiento: body.fecha_lanzamiento,
            completado: body.completado
        })
      .eq('id', body.id);
      
      if (error) {
        return new Response(
          JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
}
    
  