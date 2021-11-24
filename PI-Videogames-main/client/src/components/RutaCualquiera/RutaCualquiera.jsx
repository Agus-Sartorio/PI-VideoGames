import React from 'react';
import { Link } from "react-router-dom";
import styles from "./RutaCualquiera.module.css"

export default function RutaCualquiera(){
    return (
        <div className={styles.todo}>
            <Link to="/home" className={styles.link}><button className={styles.recargar}>GAMINGPEDIA</button></Link>
            <div className={styles.error}>
                        <h2 className={styles.h2error}>No hay ninguna ruta con este nombre \ (o_o) / </h2>
                        <img src="https://media4.giphy.com/media/xf20D8HzvTQzu/giphy.gif" alt="" className={styles.imgError} />
                    </div>
        </div>
    )
}