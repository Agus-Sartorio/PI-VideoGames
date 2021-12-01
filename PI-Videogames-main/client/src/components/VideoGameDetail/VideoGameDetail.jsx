import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import mario from "../../fondos/mario.gif"
import styles from "./VideoGameDetail.module.css"

export default function VideoGameDetail(props) {
    const dispatch = useDispatch();
    const parametros = useParams(); // me toma los params de la url

    useEffect(() => {
        dispatch(getDetail(parametros.id));
    }, [dispatch]);

    const myVideogame = useSelector((state) => state.detail);
    const loader = useSelector((state) => state.loading);
    console.log(myVideogame)
    return (
        <div className={styles.todo}>
            
            {
                loader &&
                <div className={styles.padre}>
                <img src={mario} alt="" className={styles.loader} />
                </div>
            }
            {
                !loader &&
                <div>
                    <Link to="/home" className={styles.retornar}><button className={styles.back}>GAMINGPEDIA</button></Link>
                <div className={styles.cont}>
                    <h1 className={styles.h1}>{myVideogame.name}</h1>
                    <img className={styles.img} src={myVideogame.urlImg ? myVideogame.urlImg : myVideogame.image } alt={myVideogame.name} width="500px" height="700px" />
                    <h4 className={styles.h4}>Generos: </h4>
                    {myVideogame.genres?.map((g) => <li className={styles.h5}>{g.name}</li>)}
                    <p className={styles.rating}>Rating: {myVideogame.rating}</p>
                    <p className={styles.plataformas}>Plataformas: {myVideogame.platforms + " "}</p>
                    <p className={styles.lanzamiento}>Lanzamiento: {myVideogame.released}</p>
                    <p className={styles.text}>Descripción: {myVideogame.description}</p>
                    <div className={styles.button}>
            <Link to="/home" >
                <button className={styles.btn}>Volver</button>
            </Link>
            </div>
                </div> 
                </div>
            }
            
        </div>
    )
}