import React from 'react';
import { Link } from 'react-router-dom';
import './LangPag.css'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import Loader from "./Loader"
import { getVideoGames, getGenres, getPlatforms } from '../../actions';


export default function LandingPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideoGames());
        dispatch(getPlatforms());
        dispatch(getGenres());


        // return () => {
        //     dispatch(clearComponente());

        // };
    }, []) //  eslint-disable-line react-hooks/exhaustive-deps







    return (
        <div className='cont'>

            <div className='ite'>
                <Link to="/home"><button className='bt'>Ingresar</button>  </Link>
            </div>
        </div>
    );
}


