import React from 'react';
import { Link } from 'react-router-dom';
import images from "../img/control.jpg"
import './LangPag.css'
export default function LandingPage() {
    return (
        <>
            <img className='selectorImg' src={images} alt='no se ve ' />
            <h1>hola vamos a ver VIDEOS GAMES</h1>
            <Link to="/home"><button>Ingresar</button> Home </Link>
        </>
    );
}


