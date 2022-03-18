import React from 'react';
import './Buscador.css';
import Filtros from './Filtros';
export default function Search() {
    return (< div className='search'>

        <form >
            <div>
                <label >Buscador: </label>
                <input
                    type="text"
                    id="title"
                    autoComplete="off"
                />
            </div>
            <button type="submit">BUSCAR...</button>
        </form>

        < h1 > Soy un nav </h1 >

        <Filtros />

    </div>
    )
}

