import React, { useState } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames } from '../actions';
import Card from './Card.js';
import Search from './Buscador.js';
import Paginado from './Paginado'

export default function Home() {

    const dispatch = useDispatch()
    const allVideoGames = useSelector((state) => state.videogames)
    const [currentPage, setCurrentPage] = useState(1);                                           // 1      // 2
    const [videogamePerPage, setVideogamePerPage] = useState(15)                                 // 15 //  15
    const indexOfLastVideoGames = currentPage * videogamePerPage                               // 1  * 15   // 30
    const indexOfFirstVideoGames = indexOfLastVideoGames - videogamePerPage                    // 15 - 15 =0// 15
    const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGames, indexOfLastVideoGames)//100( 0, 15)//100(15,30)
    // 0 a 14  
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect(() => {
        dispatch(getVideoGames())
    }, [])



    return (


        <div>
            <Search />
            <Paginado videogamePerPage={videogamePerPage}
                allVideoGames={allVideoGames.length}
                paginado={paginado}
            />
            {/* 0 - 15  // 15-30 // 30/45   */}
            {currentVideoGames.map(e => <Card key={e.id} name={e.name} img={e.img} genres={e.genres} />)}




        </div>

    );
}

