import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, clearGenres } from '../actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'



export default function Nav({ handleFilterCreated, handleOrder,
    handleOrderGenres, handleReseteo }) {
    const dispatch = useDispatch()

    const allGenres = useSelector((state) => state.genres)



    useEffect(() => {
        dispatch(getGenres())
        return () => {
            clearGenres()
        }


    }, []) //  eslint-disable-line react-hooks/exhaustive-deps




    return (
        <div className='container'>



            <div className='item' >  <button className='bth' onClick={e => handleReseteo(e)} > Cargar los Videogames</button> </div>
            <div className='item'>  <button className='bth'> <Link to="/create"> Crear Videogames</Link>
            </button>   </div>

            <div className='item'>
                <select className='slh' onChange={handleOrder} >
                    <option > Ordenar por: </option>
                    <option value="az" > A - Z </option>
                    <option value="za"> Z - A </option>
                    <option value="mr" > Mejores rating</option>
                    <option value="pr" > Peores rating</option>
                </select>
            </div>
            <div className='item'>
                <select className='slh' onChange={handleFilterCreated}>
                    <option value="default" >  Videogames </option>
                    <option value="all" > Todos </option>
                    <option value="api" > Existentes </option>
                    <option value="created">  Creados x Usuario </option>
                </select>
            </div>

            <div className='item'>

                <select className='slh' onChange={e => handleOrderGenres(e)}>
                    <option value="gen"> Genero </option>

                    {allGenres.map((e) => (
                        <option key={e.id} value={e.name}> {e.name}</option>
                    ))}
                </select>
            </div>


        </div>

    );
}

