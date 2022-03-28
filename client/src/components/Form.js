import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { postVideoGames } from '../actions';
import { useDispatch } from 'react-redux';
import FormRama from './FormGyP';


export default function Form() {

    const dispatch = useDispatch()
    let navigate = useNavigate();

    let [botonActivo, setBotonActivo] = useState(false);
    let [error, setError] = useState('');
    console.log(error)
    const [input, setInput] = useState({
        name: " ",
        description: " ",
        rating: " ",
        released: " ",
        platforms: [],
        genres: []
    })





    function handleSubmit(e) {
        e.preventDefault();
        if ((input.name === "" || input.description === "" || input.rating === " " || input.released === " " || input.platforms.length === 0 || input.genres.length === 0)) {
            return alert("No se puede enviar , complete las categorias");
        } else {
            dispatch(postVideoGames(input));
            alert("Personaje Creado");
            setInput({
                name: " ",
                description: " ",
                rating: " ",
                released: " ",
                genres: [],
                platforms: [],
            })
            navigate('/home')
        }
    }



    function handleSelect(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: input[e.target.name].concat(e.target.value)
        })
        let objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError);
    }

    function handleSelect1(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: input[e.target.name].concat(e.target.value)
        })
        let objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError);
    }



    function handleDelete(e) {
        e.preventDefault()
        setInput({
            ...input,
            genres: []

        })
    }
    function handleDelete1(e) {
        e.preventDefault()
        setInput({
            ...input,
            platforms: []

        })
    }

    function handleChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        let objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError);
    }
    function validate(input) {
        let errors = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexRating = /^[0-9]$/;
        let regexDescription = /^.{1,255}$/;
        let regexFecha = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
        let formularioValidado = true;


        if (!input.name.trim()) {
            formularioValidado = false;
            errors.name = 'Nombre es requerido';
        } else if (!regexName.test(input.name.trim())) {
            errors.name = "El campo nombre solo acepta letras y espacios en blanco";
        }
        if (!input.description.trim()) {
            formularioValidado = false;
            errors.description = "Descripcion es requerido"
        } else if (!regexDescription.test(input.description.trim())) {
            formularioValidado = false;
            errors.description = "El campo comentarios no debe exceder los 255 caracteres";
        }
        if (!input.rating.trim()) {
            formularioValidado = false;
            errors.rating = "Rating es requerido"
        } else if (!regexRating.test(input.rating.trim())) {
            formularioValidado = false;
            errors.rating = "Rating es requerido , del 0 al 9";
        }
        if (!input.released.trim()) {
            formularioValidado = false;
            errors.released = "Released es requerido"
        } else if (!regexFecha.test(input.released.trim())) {
            errors.released = "Released es requerido , formato = 28/02/2021, solo acepta numeros"
        }

        if (input.genres.length === 0) {
            formularioValidado = false;
            errors.genres = "Genero es requerido"
        }
        if (input.platforms.length === 0) {
            formularioValidado = false;
            errors.platforms = "Platsforms es requerido"
        }

        if (formularioValidado === true) {
            setBotonActivo(true)
        }

        return errors;
    };

    return (

        <div>
            <Link to='/home'><button> VOLVER</button></Link>
            <h1>Crea tu Video Games</h1>
            <form onSubmit={e => handleSubmit(e)}>

                <FormRama handleSelect={handleSelect} handleSelect1={handleSelect1} name={input.name} description={input.description} rating={input.rating}
                    released={input.released}
                    genres={input.genres} platforms={input.platforms}
                    handleDelete={handleDelete} handleDelete1={handleDelete1} handleChange={handleChange}

                    errorName={error.name} errorDescription={error.description} errorRating={error.rating} errorReleased={error.released}
                    errorGenres={error.genres} errorPlatforms={error.platforms} />

                <button type='submit' disabled={!botonActivo}>  Crear Personaje </button>

            </form >




        </div>
    );
}