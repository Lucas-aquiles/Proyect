import React from 'react';
import { useEffect } from 'react';

import { getGenres, getPlatforms } from '../actions';
import { useDispatch, useSelector } from 'react-redux';



export default function FormRama({ handleChange, handleSelect1, handleSelect, genres, platforms,
    handleDelete, handleDelete1, name, description, rating, released, errorName,
    errorDescription, errorRating, errorReleased, errorGenres, errorPlatforms
}) {


    const dispatch = useDispatch()
    const allGenres = useSelector((state) => state.genres);
    const allPlatforms = useSelector((state) => state.platforms);




    useEffect(() => {
        dispatch(getGenres());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(getPlatforms())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps




    var contador = 1
    var sumador = 1
    var tercera = 1
    return (
        <div>

            <label>Nombre:
                <input type="text"
                    value={name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Nombre"
                />
            </label>
            {errorName && (<p>{errorName} </p>)}
            <br />

            <label>Description:
                <textarea type="text"
                    value={description}
                    name="description"
                    maxLength={250}
                    onChange={handleChange}
                    placeholder="Description"
                /></label>
            {!errorName && errorDescription && (<p>{errorDescription} </p>)}
            <br />
            <label>Rating:
                <input type="number"
                    value={rating}
                    name="rating"
                    onChange={handleChange}
                    placeholder="Rating"
                    max={10}
                    min={0}

                /></label>
            {!errorDescription && errorRating && (<p>{errorRating} </p>)}

            <br />
            <label>Released:
                <input type="text"
                    value={released}
                    name="released"
                    onChange={handleChange}
                    placeholder="Released = DD/MM/AAAA;" />
            </label>
            {!errorRating && errorReleased && (<p>{errorReleased} </p>)}

            <br />
            <label>Generos:
                <select name='genres' onChange={e => handleSelect(e)} defaultValue=""  >
                    <optgroup label="Generos">
                        {allGenres.map((e) => (
                            <option key={e.id} value={e.name} defaultValue> {e.name}</option>
                        ))}
                    </optgroup>
                </select> </label>

            <button value="genres" onClick={(e) => handleDelete(e)}> x</button>
            {!errorReleased && errorGenres && (<p>{errorGenres} </p>)}

            <ul>{genres.map(ele => <li key={contador++}>  {ele}    </li>)} </ul>

            <br />
            <label>Platforms:
                <select name="platforms" onChange={(e) => handleSelect1(e)}>
                    <optgroup label="Plataformas">
                        {allPlatforms.map((element) => (
                            // <div  key={e.id}>
                            <option key={sumador++} value={element}> {element} </option>
                            // </div>
                        ))}
                    </optgroup>

                </select>
            </label>

            <button value="platforms" onClick={(e) => handleDelete1(e)}> x</button>
            {!errorGenres && errorPlatforms && (<p>{errorPlatforms} </p>)}


            <ul> {platforms.map((e) => <li key={tercera++}>  {e}    </li>)}</ul>

        </div>




    );
}

