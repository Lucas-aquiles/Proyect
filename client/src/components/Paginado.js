import React from 'react';
import './Paginado.css'

export default function Paginado({ videogamePerPage, allVideoGames, paginado }) {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(allVideoGames / videogamePerPage); i++) {

        pageNumber.push(i)
    }


    return (
        <div>

            {pageNumber && pageNumber.map(number => (
                <button key={number} className='boton' onClick={() => paginado(number)}>
                    {number}
                </button>

            ))}

        </div>

    );
}


