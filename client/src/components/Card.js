import React from 'react';
import { Link } from 'react-router-dom'


export default function Card({ name, img, genres, id }) {
    return (
        <div >
            <Link to={`/details/${id}`}> Ver</Link>
            <h3>  {name}   </h3>
            <img src={img} width="200" height="200" alt="" />
            <h5> {genres} </h5>






        </div>


    );
}

