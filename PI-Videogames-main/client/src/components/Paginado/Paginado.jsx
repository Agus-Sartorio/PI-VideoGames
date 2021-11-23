import React from 'react';
import styles from "./Paginado.module.css";


export default function Paginado({ videogamesPerPage, allVideogames, paginado }){
    const pageNumbers = [];

    for( let i = 0; i <= allVideogames/videogamesPerPage; i++){
        pageNumbers.push(i + 1);
    }

    return (
        <nav className={styles.todo}>
            <ul className = "paginado">
                {pageNumbers && 
                pageNumbers.map(number => ( 
                    <p className = "number" key = {number} className = {styles.li}>
                    <a onClick={() => paginado(number)} className={styles.a}>{number}</a>
                    </p>
                ))
                }
            </ul>
        </nav>
    )
}