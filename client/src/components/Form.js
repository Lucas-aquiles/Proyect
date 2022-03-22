import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getGenres, getPlatforms, postVideoGames } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


export default function Form() {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const allGenres = useSelector((state) => state.genres);
    const allPlatforms = useSelector((state) => state.platforms);


    const [input, setInput] = useState({

        name: " ",
        description: " ",
        rating: " ",
        platforms: [],
        genres: []

    })


    useEffect(() => {
        dispatch(getGenres());
    }, [])
    useEffect(() => {
        dispatch(getPlatforms())
    }, [])


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            [e.target.name]: input[e.target.name].concat(e.target.value)
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postVideoGames(input))
        alert("Personaje Creado")
        setInput({
            name: " ",
            description: " ",
            rating: " ",
            released: " ",
            platforms: [],
            genres: []

        })
        navigate('/home')
    }
    return (
        <div>
            <Link to='/home'> <button> VOLVER</button> </Link>

            <h1>Crea tu Video Games</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                        required="required"
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text"
                        value={input.description}
                        name="description"
                        maxLength={250}
                        onChange={handleChange}
                        required="required"
                    />
                </div>
                <div>
                    <label>Rating: </label>
                    <input type="number"
                        value={input.rating}
                        name="rating"
                        onChange={handleChange}
                        placeholder="Rating"
                        min="0"
                        max="10"
                        required="required"

                    />
                </div>
                <div>
                    <label>Released: </label>
                    <input type="date"
                        value={input.released}
                        name="released"
                        onChange={handleChange}
                        placeholder="Released"
                        required="required"
                    /> </div>

                <div>
                    <label>Generos: </label>
                    <select value={input.genres} name="genres" required="required"
                        onChange={handleSelect}
                    >
                        {allGenres.map(e => (
                            <option value={e.name}>{e.name} </option>
                        ))}
                    </select>
                    <ul><li>{input.genres.map(e => e + ",")} </li></ul>
                </div>

                <div>
                    <label>Platforms: </label>
                    <select value={input.platforms} name="platforms" required="required"

                        onChange={handleSelect}
                    >
                        {allPlatforms.map(e => (
                            <option value={e}>{e} </option>
                        ))}
                    </select>
                    <ul><li>{input.platforms.map(e => e + ",")} </li></ul>

                </div>
                <button type='submit' >  Crear Personaje </button>

            </form>

        </div>
    );
}

;