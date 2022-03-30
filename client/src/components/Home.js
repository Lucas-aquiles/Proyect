import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, filterOrigin, orderByName, orderByRating, getGenres, orderByGenres } from '../actions';
import Card from './Card.js';
import Search from './Buscador.js';
import Paginado from './Paginado'
import ImgPrueba from './ImgPrueba';
import Loader from './Loader';
import Scroll from './ScrollToTop';


export default function Home() {
    var imge = "https://img.freepik.com/vector-gratis/consola-juegos-letras-letrero-neon-fondo-ladrillo_1262-11854.jpg?size=338&ext=jpg";
    const dispatch = useDispatch()
    const allVideoGames = useSelector((state) => state.videogames)
    const allGenres = useSelector((state) => state.genres)

    // const [loading, setLoading] = useState(false)


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
        dispatch(getVideoGames());


    }, []) //  eslint-disable-line react-hooks/exhaustive-deps

    function handleFilterCreated(e) {
        // e.preventDefault();
        dispatch(filterOrigin(e.target.value))

    }
    function handleOrder(e) {
        if (e.target.value === "az" || e.target.value === "za") {
            // e.preventDefault();
            dispatch(orderByName(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
        }
        if (e.target.value === "mr" || e.target.value === "pr") {
            // e.preventDefault();
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
        setCurrentPage("1")
        // setLoading(false)
        setOrden("Todos los VG");

    }


    return (

        <div className="cuerpo">


            <div className='container' > <Search />  </div>
            <div className='container'>

                <div className='item' >  <button className='bth' onClick={e => handleReseteo(e)} > Cargar los Videogames</button> </div>
                <div className='item'>  <button className='bth'> <Link to="/create"> Crear Videogames</Link>
                </button>   </div>

                <div className='item'>
                    <select className='slh' onChange={handleOrder} >
                        <option selected> Ordenar por: </option>
                        <option value="az" > A - Z </option>
                        <option value="za"> Z - A </option>
                        <option value="mr" > Mejores rating</option>
                        <option value="pr" > Peores rating</option>
                    </select>
                </div>
                <div className='item'>
                    <select className='slh' onChange={handleFilterCreated}>
                        <option selected>  Videogames </option>
                        <option value="all" > Todos </option>
                        <option value="api" > Existentes </option>
                        <option value="created">  Creados x Usuario </option>
                    </select>
                </div>

                <div className='item'>

                    <select className='slh' onChange={e => handleOrderGenres(e)}>
                        <option selected value="gen"> Genero </option>

                        {allGenres.map((e) => (
                            <option key={e.id} value={e.name}> {e.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="container1">
                <div className="item2">
                    <Paginado videogamePerPage={videogamePerPage}
                        allVideoGames={allVideoGames.length}
                        paginado={paginado}
                    />   </div> </div>


            {/* 0 - 15  // 15-30 // 30/45   */}
            <article className=" car box grid-responsive">
                {/* {loading && <Loader />} */}

                {currentVideoGames.length === 0 ? <ImgPrueba /> : currentVideoGames.map(e => <Card key={e.id} name={e.name} img={e.img ? e.img : imge} genres={e.genres} id={e.id} />)}
            </article>
            <div className=" pag   box grid-responsive">
                <Paginado videogamePerPage={videogamePerPage}
                    allVideoGames={allVideoGames.length}
                    paginado={paginado}
                />        </div>
            <div className='container'> <Scroll showBelow={250} />  </div>

        </div>
    );
}


