import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGenres, postVideogame } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreateVideoGame.module.css'

function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = "Se requiere un nombre";
    } else if(!input.description){
        errors.description = "Se requiere una descripción";
    } else if(!input.released){
        errors.released = "Se requiere una fecha de lanzamiento";
    } else if(input.rating < 0 || input.rating > 5){
        errors.rating = "Se requiere una calificación entre 0 y 5";
    } if(!input.platforms.length){
        errors.platforms = "Se requiere al menos una plataforma";
    }
    return errors;
}

export default function CreateVideoGame() {
    const dispatch = useDispatch();
    /* const history = useHistory(); */
    const genres = useSelector((state) => state.genres);
    const  [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
    })

    console.log(input.genres);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input);
    }

    function handleSelect(e) {
        /* console.log(e.target.value); */
        const foundGenre = genres.find((genre) => genre.id === Number(e.target.value)); 
        const genreObj = {name: foundGenre.name, id: e.target.value};
        setInput({
            ...input,
            genres: [...input.genres, genreObj]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postVideogame(input));
        alert("Videojuego creado con exito!");
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: [],
        })
    }



    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return (
        <div className={styles.cont}>
            <Link to="/home" className={styles.return}><button className={styles.volver}>GAMINGPEDIA</button></Link>
            <div className={styles.all}>
            <div className={styles.div}>
            <h1 className={styles.tittle}>Creá tu videojuego!</h1>
            </div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.label1}>
                    <label className={styles.label1}>Nombre:</label>
                    <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}   
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                    />   
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}  
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input
                    type="text"
                    value={input.released}
                    name="released"
                    onChange={(e) => handleChange(e)}
                    />   
                    {errors.released && (
                        <p>{errors.released}</p>
                    )}
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type="text"
                    value={input.rating}
                    name="rating"
                    onChange={(e) => handleChange(e)}
                    />   
                    {errors.rating && (
                        <p>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label>Plataformas:</label>
                    <input
                    type="text"
                    value={input.platforms}
                    name="platforms"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.platforms && (
                        <p>{errors.platforms}</p>
                    )}
                </div>
                <div>
                <select onChange={(e) => handleSelect(e)}>
                    {genres.map((gen) => {
                    return <option value={gen.id}>{gen.name}</option>
                    })}   
                </select>
                <ul><p>{input.genres.map(el => el.name + ", ")}</p></ul>
                </div>
                <div className={styles.botonn}>
                <button className={styles.botonn} type="submit" disabled={
                    Object.keys(errors).length > 0 || input.genres.length === 0 || input.name === "" }>Crear videojuego
                </button>
                </div>
            </form>
            </div>
        </div>
    )
}