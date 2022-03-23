import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getGenres, getPlatforms, postVideoGames } from '../actions';
import { useDispatch, useSelector } from 'react-redux';




export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    }


    return errors;



};








export default function Form() {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const allGenres = useSelector((state) => state.genres);
    const allPlatforms = useSelector((state) => state.platforms);

    let [error, setError] = useState('');
    const [input, setInput] = useState({

        name: " ",
        description: " ",
        rating: " ",
        platforms: [],
        genres: []

    })


    useEffect(() => {
        dispatch(getGenres());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(getPlatforms())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        let objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError);

    }

    // function handleSelect(e) {
    //     setInput({
    //         ...input,
    //         [e.target.name]: input[e.target.name].concat(e.target.value)
    //     })
    // }



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

    function handleDelete(e) {
        setInput({
            ...input,
            // [e.target.name]: input.platforms.filter(el => el !== e)
            platforms: input.platforms.filter(el => el !== e),
            genres: input.genres.filter(el => el !== e)

        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            [e.target.name]: input[e.target.name].concat(e.target.value)
        })

        let objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError);
    }


    return (
        <div>
            <Link to='/home'> <button> VOLVER</button> </Link>

            <h1>Crea tu Video Games</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {error.name && (<p>{error.name} </p>)}
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text"
                        value={input.description}
                        name="description"
                        maxLength={250}
                        onChange={handleChange}
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

                    />
                </div>
                <div>
                    <label>Released: </label>
                    <input type="date"
                        value={input.released}
                        name="released"
                        onChange={handleChange}
                        placeholder="Released"
                    /> </div>



                <div>

                    <label>Generos: </label>
                    <select name='genres' onChange={e => handleSelect(e)}>
                        {allGenres.map((e, index = 1) => (
                            <option key={index} value={e.name}> {e.name}</option>
                        ))}
                    </select>
                    <ul><li>{input.genres.map(ele => < >  {ele + "  "}   <button onClick={() => handleDelete(ele)}> x</button> </>)} </li></ul>
                </div>
                {/* <select onChange={handleSelect} value={input.name} name="genres" >
                        {allGenres.map(el => (
                            <option key={el.id} >{el.name} </option>

                        ))}
                    </select> */}



                <div>
                    <label>Platforms: </label>
                    <select name="platforms" onChange={e => handleSelect(e)}>
                        {allPlatforms.map((e, index = 1) => (
                            // <div  key={e.id}>
                            <option key={index} value={e}>{e} </option>
                            // </div>
                        ))}
                    </select>

                    <ul><li>{input.platforms.map(e => <>  {e + "  "} <button onClick={() => handleDelete(e)}> x</button> </>)}   </li>
                    </ul>

                </div>

                <button type='submit' >  Crear Personaje </button>

            </form >

        </div >
    );
}

;