import React from 'react';
import './Paginado.css'

export default function Paginado({ videogamePerPage, allVideoGames, paginado }) {
    const pageNumber = []          //   15           // 100       /  f( setea setCurrentPAge)

    for (let i = 1; i <= Math.ceil(allVideoGames / videogamePerPage); i++) {
        //100/15 = 6.66 = 7


        pageNumber.push(i) // pushea 1
    }


    return (
        <nav>
            <ul className='paginado'>
                {pageNumber && pageNumber.map(number => (
                    <button key={number}>
                        <a onClick={() => paginado(number)}> {number}</a>
                    </button>

                ))}
            </ul>
        </nav>

    );
}


