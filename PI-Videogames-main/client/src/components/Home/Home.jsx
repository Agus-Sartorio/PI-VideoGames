import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames, filterVideoGamesByGenre, filterCreated, orderByName, orderByRating } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card"
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import mando2 from "../../fondos/mando2.png"
import styles from "./Home.module.css";

export default function Home() {

    const dispatch = useDispatch(); // con el dispatch modifico el estado de la store, porque despacho acciones.
    const allVideogames = useSelector((state) => state.videogames); // con esto me traigo todo lo que esta en el estado de videogames del reducer
    const allVideogamesCopy = useSelector((state) => state.allVideogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const [orden, setOrden] = useState()
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => { // para traer desde la store al componente
        dispatch(getVideogames()); // esto es lo mismo que que el mapDispatchToProps.
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterGenre(e){
        dispatch(filterVideoGamesByGenre(e.target.value));
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div className={styles.todo}>
            <button onClick={e => {handleClick(e);}} className={styles.recargar}>
             GAMINGPEDIA
            </button>
            <SearchBar className={styles.searchBar}/>
            {
                !allVideogames.length && !allVideogamesCopy.length &&
                <div className={styles.padre}>
                <img src={mando2} alt="" className={styles.loader} />
                </div>
            }
            {allVideogames.length > 0 && 
            <Link to = "./videogame" className={styles.link}>Create videogame</Link>}
            {
                    !allVideogames.length && allVideogamesCopy.length > 0 && 
                    <div className={styles.error}>
                        <h2 className={styles.h2error}>No hay ningun juego para mostrar \ (o_o) / </h2>
                        <img src="https://media4.giphy.com/media/xf20D8HzvTQzu/giphy.gif" alt="" className={styles.imgError} />
                    </div>
                }
                { allVideogames.length > 0 &&
            <div className={styles.filtros}>
                <select onChange={e => handleSort(e)} className={styles.ord1}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select onChange={e => handleSortRating(e)} className={styles.ord2}>
                    <option value="asc">Rating ascendente</option>
                    <option value="desc">Rating descendente</option>
                </select>
                <select onChange={e => handleFilterGenre(e)} className={styles.ord3}>
                    <option value="todos">Filtrar por Género</option>
                    <option value="Action">Acción</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Aventura</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Estrategia</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulación</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Juego de Plataformas</option>
                    <option value="Racing">Carreras</option>
                    <option value="Massively Multiplayer">Multijugador Masivo</option>
                    <option value="Sports">Deportes</option>
                    <option value="Fighting">Peleas</option>
                    <option value="Family">Familia</option>
                    <option value="Board Games">Juegos de Mesa</option>
                    <option value="Educational">Educativo</option>
                    <option value="Card">Tarjetas</option>
                </select>
                <select onChange={e => handleFilterCreated(e)} className={styles.ord4}> 
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
                </div>
                }
                <div className={styles.contenedor}>
                {
                    currentVideogames?.map((v) => {
                        return <Card name={v.name}  genres={v.genres} id={v.id} image={v.image} key={v.id} />
                    })
                }
                { 
                 allVideogames.length > 15 && <Paginado 
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}
                />
                }    
                </div>  
        </div>
    )

}