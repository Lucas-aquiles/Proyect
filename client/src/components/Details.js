import React from "react";
import { detailsId } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();
    let addres = params.id;
    let imge = "https://img.freepik.com/vector-gratis/consola-juegos-letras-letrero-neon-fondo-ladrillo_1262-11854.jpg?size=338&ext=jpg";

    useEffect(() => {
        dispatch(detailsId(addres));
    }, [dispatch]);// eslint-disable-line react-hooks/exhaustive-deps

    const dVG = useSelector((state) => state.details);

    return (
        <div>
            <h2> {dVG.name} </h2>
            <img src={dVG.img ? dVG.img : imge} width="600px" height="500px" alt="imagen de video games" />
            <h5> {dVG.description} </h5>
            <h3> Fecha de lanzamiento : {dVG.released} </h3>
            <h3> Rating : {dVG.rating} </h3>
            <h3>Generos : {dVG.genres}</h3>
            <h3>Plataformas : {dVG.platforms}</h3>
            <Link to="/home">
                <button> VOLVER</button>
            </Link>
        </div>
    );
}
