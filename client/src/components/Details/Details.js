import React from "react";

import { detailsId, clearId, } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Detail.css";
import Loader from "../Helpers/Loader";

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();
    let addres = params.id;
    let imge =
        "https://img.freepik.com/vector-gratis/consola-juegos-letras-letrero-neon-fondo-ladrillo_1262-11854.jpg?size=338&ext=jpg";

    useEffect(() => {
        dispatch(detailsId(addres));

        // dispatch(clearComponente())

        return () => {
            dispatch(clearId());
        };
    }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    const dVG = useSelector((state) => state.details);

    return dVG.length === 0 ? (
        <Loader />
    ) : (
        <div className="principal">
            <div className="c-details">
                <div className="iitem1">
                    <h2> {dVG.name} </h2>
                </div>
                <div className="img-detail">
                    <img
                        className="img-detail1"
                        src={dVG.img ? dVG.img : imge}
                        alt="imagen de video games"
                    />
                </div>
                <div className="iitem3">
                    <h3>
                        Fecha de lanzamiento <br />
                        {dVG.released}{" "}
                    </h3>
                    <h3>
                        {" "}
                        Rating <br />
                        {dVG.rating}{" "}
                    </h3>
                    <h3>
                        Generos
                        <br /> {dVG.genres}
                    </h3>
                    <h3 className="nto1">
                        Plataformas <br />
                        {dVG.platforms}
                    </h3>
                </div>
            </div>
            <div className="c-details1">
                <h5 className="description"> {dVG.description} </h5>
                <Link to="/home">
                    <button className="bottom"> VOLVER</button>
                </Link>
            </div>
        </div>
    );
}

