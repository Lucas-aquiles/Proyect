import React, { useState } from 'react';
import './Home.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, allVideo, filterOrigin, orderByName, orderByRating, orderByGenres, clearComponente, getVideoGamesBd, DeleteIdDb } from '../../actions';
import Card from '../Card/Card.js';
import Search from '../Search/Buscador';
import Paginado from '../Helpers/Paginado'
import Scroll from '../Helpers/ScrollToTop';
import Nav from '../Nav/Nav';
import Loader from '../Helpers/Loader';


export default function Home() {
    var imge = "https://img.freepik.com/vector-gratis/consola-juegos-letras-letrero-neon-fondo-ladrillo_1262-11854.jpg?size=338&ext=jpg";
    const dispatch = useDispatch()

    const allVideoGames = useSelector((state) => state.videogames)
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamePerPage, setVideogamePerPage] = useState(15)
    const indexOfLastVideoGames = currentPage * videogamePerPage
    const indexOfFirstVideoGames = indexOfLastVideoGames - videogamePerPage
    const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGames, indexOfLastVideoGames)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };



    // useEffect(() => {
    //     dispatch(getVideoGames());


    // return () => {
    //     dispatch(clearComponente());

    // };
    // }, []) //  eslint-disable-line react-hooks/exhaustive-deps

    function handleFilterCreated(e) {
        if (e.target.value === "default") {
            dispatch(allVideo())
            setCurrentPage("1")
        }
        if (e.target.value === "created") {
            dispatch(getVideoGamesBd())
        }
        else {
            // e.preventDefault();
            dispatch(filterOrigin(e.target.value))
        }

    }
    function handleOrder(e) {
        if (e.target.value === "az" || e.target.value === "za") {
            dispatch(orderByName(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
            e.preventDefault();

        }
        if (e.target.value === "mr" || e.target.value === "pr") {
            // e.preventDefault();
            dispatch(orderByRating(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
            e.preventDefault();

        }
    }


    function handleOrderGenres(e) {
        if (e.target.value === "gen") {
            dispatch(allVideo())
            setCurrentPage("1")
        } else {
            e.preventDefault();
            dispatch(orderByGenres(e.target.value));
            setCurrentPage(1);
            // setOrden(`Ordenado ${e.target.value}`)
        }

    }
    function handleReseteo(e) {
        e.preventDefault();
        dispatch(getVideoGames());
        setCurrentPage("1")
        setOrden("Todos los VG");

    }




    return currentVideoGames.length === 0 ? (<Loader />) : (
        <div className="cuerpo">

            <div className='container' > <Search />  </div>

            <div className='container'>

                <Nav handleFilterCreated={handleFilterCreated} handleOrder={handleOrder}
                    handleOrderGenres={handleOrderGenres} handleReseteo={handleReseteo} />
            </div>
            <div className="container1">
                <div className="item2">
                    <Paginado videogamePerPage={videogamePerPage}
                        allVideoGames={allVideoGames.length}
                        paginado={paginado}
                    />   </div> </div>


            <article className=" car box grid-responsive">
                {currentVideoGames.map(e => <Card key={e.id} name={e.name}
                    img={e.img ? e.img : imge} genres={e.genres} id={e.id} />)}
            </article>


            {/* <div className=" pag   box grid-responsive">
                <Paginado videogamePerPage={videogamePerPage}
                    allVideoGames={allVideoGames.length}
                    paginado={paginado}
                />        </div> */}
            <div className='container'> <Scroll showBelow={250} />  </div>

        </div>
    );
}


