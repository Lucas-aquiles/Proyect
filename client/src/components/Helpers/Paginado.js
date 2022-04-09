import React, { useState } from 'react';
import './Paginado.css'

export default function Paginado({ videogamePerPage, allVideoGames, paginado }) {

    const [numero, setNumero] = useState("1")





    const pageNumber = []
    for (let i = 1; i <= Math.ceil(allVideoGames / videogamePerPage); i++) {

        pageNumber.push(i)
    }



    return (
        <div className='divpag'>

            {pageNumber && pageNumber.map(number => (
                <button key={number} className='boton' onClick={() => {
                    paginado(number);
                    setNumero(number)
                }}>
                    {number}
                </button>

            ))}  <p className='pag'>Pagina {numero}</p>

        </div>



    );
}


