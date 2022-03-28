import React from 'react';
import { Link } from 'react-router-dom';
import images from "../img/patron.png"
import './LangPag.css'
export default function LandingPage() {
    return (
        <div>
            <img className='selectorImg' src={images} alt='no se ve ' />
            <div>
                <Link to="/home"><button>Ingresar</button>  </Link>
            </div>
        </div>
    );
}


