import React from 'react';
import './Loader.css'
// import { useState } from 'react';


export default function Loader() {
    // const [cargar, setCargar] = useState(false)
    // setTimeout(traerImg, 1)

    // function traerImg() {
    //     setCargar(true)
    // }

    return (
        <div className='contenedor'>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

