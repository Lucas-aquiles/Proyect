import React from 'react';
import { Link } from 'react-router-dom'
import './Card.css'


export default function Card({ name, img, genres, id }) {


    return (

        <div className='conta'   >

            <img className='img' src={img} alt="" />

            <div className='ite'>
                <Link to={`/details/${id}`}>   <h4 className='name'>{name}</h4> </Link>
            </div>
            <div>
                <h5 className='h5' >{genres} </h5>
            </div>
        </div>





    );
}

