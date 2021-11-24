import React from "react";
import styles from "./Card.module.css";
import {Link} from "react-router-dom"

export default function Card({ name, genres, image, id }) {
    /* console.log("genres", genres);
    console.log("name", name);
    console.log("image", image); */
    return(
        <div className={styles.contenedorr}>
            <h2 className={styles.titulo}>
                <Link to={`/home/videogame/${id}`} className={styles.link2}>
                    <span className={styles.link}></span>{name}
                </Link></h2>
            <h5 className={styles.generos}>{genres && genres.map((genre) => {
                return(
                    <p key={genre.id}>{genre.name}</p>
                )
            })}</h5>
            <img src={image} alt={name} width="400px" height="250px" className={styles.img}/>
        </div>
    );
}