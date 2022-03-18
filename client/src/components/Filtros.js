import React from 'react';
import { Link } from 'react-router-dom';

export default function Filtros() {
    return (<div>


        <Link to="/videogames"> Crear videogames</Link>


        <div>
            <select>
                <option value="asc" > Ascendente </option>
                <option value="des"> Descendente </option>
            </select>
        </div>
        <div>
            <select>
                <option value="az" > A - Z </option>
                <option value="za"> Z - A </option>
            </select>
        </div>
        <div>
            <select>
                <option value="mr" > Mejores rating</option>
                <option value="pr" > Peores rating</option>
            </select>
        </div>





        <select>
            <option value="vgE" > Videogames Existente </option>
            <option value="vgC"> Videogames Creados x Usuario </option>
        </select>
        <div>
            <select>
                <option value="genres" > Genero </option>

            </select>
        </div>

        <div>
            <button>     </button>

        </div>





    </div>);
}

;