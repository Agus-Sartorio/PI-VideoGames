import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import video from "../../fondos/video.mp4";

export default function LandingPage() {
    return(
        <div className = {styles.contenedor}>
            <video muted autoPlay loop >
                <source src={video}
                type="video/mp4" />
            </video>
            <h1 className={styles.titulo}>Personal Project VideoGames</h1>
            <p className={styles.p1}>Videojuegos de todas las plataformas</p>
            <p className={styles.p2}>Creá tu propio juego!</p>
            <Link to = "./home">
                <button className={styles.boton}>Continuar</button>
            </Link>
            <div className={styles.capa}></div>
        </div>
    )
}