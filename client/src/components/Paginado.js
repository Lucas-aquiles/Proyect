import React from 'react';
import './Paginado.css'

export default function Paginado({ videogamePerPage, allVideoGames, paginado }) {
    const pageNumber = []          //   15           // 100       /  f( setea setCurrentPAge)
    for (let i = 1; i <= Math.ceil(allVideoGames / videogamePerPage); i++) {
        //100/15 = 6.66 = 7
        //            7 . 6 . 5. 4 .3 .2 .1

        pageNumber.push(i) // pushea 1
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


