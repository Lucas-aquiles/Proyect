import React from 'react';


export default function Card({ name, img, genres }) {
    return (
        <>
            <h3>  {name}   </h3>
            <img src={img} width="200" height="200" alt="" />
            <h5> {genres}</h5>






        </>


    );
}

