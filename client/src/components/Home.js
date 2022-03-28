import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, filterOrigin, orderByName, orderByRating, getGenres, orderByGenres } from '../actions';
import Card from './Card.js';
import Search from './Buscador.js';
import Paginado from './Paginado'

export default function Home() {

    var imge = "https://img.freepik.com/vector-gratis/consola-juegos-letras-letrero-neon-fondo-ladrillo_1262-11854.jpg?size=338&ext=jpg";
    const dispatch = useDispatch()
    const allVideoGames = useSelector((state) => state.videogames)
    const allGenres = useSelector((state) => state.genres)
    const [orden, setOrden] = useState('');
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
        dispatch(getGenres())
    }, []) //  eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        dispatch(getVideoGames())
    }, []) //  eslint-disable-line react-hooks/exhaustive-deps

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterOrigin(e.target.value))

    }
    function handleOrder(e) {
        if (e.target.value === "az" || e.target.value === "za") {
            e.preventDefault();
            dispatch(orderByName(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
        }
        if (e.target.value === "mr" || e.target.value === "pr") {
            e.preventDefault();
            dispatch(orderByRating(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
        }
    }


    function handleOrderGenres(e) {
        if (e.target.value === "gen") {
            dispatch(getVideoGames())
        } else {
            e.preventDefault();
            dispatch(orderByGenres(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
        }

    }
    function handleReseteo(e) {
        e.preventDefault();
        dispatch(getVideoGames())
        setOrden("Todos los VG")

    }


    return (


        <div>

            <Search />
            <button onClick={e => handleReseteo(e)} >Cargar los Videogames</button>
            <div>
                <Link to="/create"> Crear videogames</Link>
                <div>
                    <select onChange={handleOrder} >
                        <option value="orden"> Ordenar por: </option>
                        <option value="az" > A - Z </option>
                        <option value="za"> Z - A </option>
                        <option value="mr" > Mejores rating</option>
                        <option value="pr" > Peores rating</option>
                    </select>
                </div>
                <select onChange={handleFilterCreated}>
                    <option value="vgs">  Videogames </option>
                    <option value="all" > TODOS </option>
                    <option value="api" > EXISTENTES </option>
                    <option value="created">  Creados x Usuario </option>
                </select>
                <div>

                    <select onChange={e => handleOrderGenres(e)}>
                        <option value="gen"> Genero </option>

                        {allGenres.map((e) => (
                            <option key={e.id} value={e.name}> {e.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className=" box grid-responsive">
                <Paginado videogamePerPage={videogamePerPage}
                    allVideoGames={allVideoGames.length}
                    paginado={paginado}
                /> </div>
            {/* 0 - 15  // 15-30 // 30/45   */}
            <article className=" box grid-responsive">
                {currentVideoGames.map(e => <Card key={e.id} name={e.name} img={e.img ? e.img : imge} genres={e.genres} id={e.id} />)}
            </article>
        </div>
    );
}
