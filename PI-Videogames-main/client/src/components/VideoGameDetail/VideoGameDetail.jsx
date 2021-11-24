import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import styles from "./VideoGameDetail.module.css"

export default function VideoGameDetail(props) {
    const dispatch = useDispatch();
    const parametros = useParams(); // me toma los params de la url

    useEffect(() => {
        dispatch(getDetail(parametros.id));
    }, [dispatch]);

    const myVideogame = useSelector((state) => state.detail);
    return (
        <div className={styles.todo}>
            {
                myVideogame ?
                <div className={styles.cont}>
                    <h1 className={styles.h1}>{myVideogame.name}</h1>
                    <img className={styles.img} src={myVideogame.urlImg ? myVideogame.urlImg : myVideogame.image } alt={myVideogame.name} width="500px" height="700px" />
                    <h4 className={styles.h4}>Generos: </h4>
                    {myVideogame.genres?.map((g) => <p>{g.name}</p>)}
                    <p className={styles.rating}>Rating: {myVideogame.rating}</p>
                    <p className={styles.plataformas}>Plataformas: {myVideogame.platforms + " "}</p>
                    <p className={styles.lanzamiento}>Lanzamiento: {myVideogame.released}</p>
                    <p className={styles.text}>Descripción: {myVideogame.description}</p>
                </div> : 
                <h1>Juego no encontrado</h1>
            }
            <div className={styles.button}>
            <Link to="/home" >
                <button className={styles.btn}>Volver</button>
            </Link>
            </div>
        </div>
    )
}