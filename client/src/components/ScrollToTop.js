import { useState, useEffect } from "react";
import React from 'react';
import manito from "../img/manito.png"
export default function Scroll(showBelow) {
    const [show, setShow] = useState(showBelow ? false : true)


    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }

    })


    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }



    return (
        <div>

            <button onClick={handleClick}>  <img width="20px" height="20px" src={manito} alt="manito" /> </button>

        </div>



    );
}






