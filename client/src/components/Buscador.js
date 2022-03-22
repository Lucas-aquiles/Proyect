import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchVideoGames } from '../actions';


import './Buscador.css';




export default function Search() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        // setName(e.target.value)
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        setName({ ...name })

        dispatch(searchVideoGames(name))
    }



    return (< div className='search'>

        <form >
            <div>
                <label >Buscador: </label>
                <input
                    value={name.name}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    placeholder='Buscar..'
                />
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}   >BUSCAR...</button>
        </form>

        < h1 > Soy un nav </h1 >



    </div>
    )
}

