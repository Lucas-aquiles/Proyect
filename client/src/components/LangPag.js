import React from 'react';
import { Link } from 'react-router-dom';
import './LangPag.css'
export default function LandingPage() {
    return (
        <div className='cont'>
            <div className='ite'>
                <Link to="/home"><button className='bt'>Ingresar</button>  </Link>
            </div>
        </div>
    );
}


