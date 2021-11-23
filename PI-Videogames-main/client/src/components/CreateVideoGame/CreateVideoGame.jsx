import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* import { useHistory } from 'react-router-dom'; */
import { getGenres, postVideogame } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = "Se requiere un nombre";
    } else if(!input.description){
        errors.description = "Se requiere una descripción";
    } else if(!input.releaseDate){
        errors.releaseDate = "Se requiere una fecha de lanzamiento";
    } else if(input.rating < 0 || input.rating > 5){
        errors.rating = "Se requiere una calificación entre 0 y 5";
    } else if(!input.genre){
        errors.genre = "Se requiere al menos un género";
    } if(!input.platforms){
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
        releaseDate: "",
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
            releaseDate: "",
            rating: "",
            platforms: [],
            genres: [],
        })
        /* history.push("/home"); */
    }

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Creá tu videojuego!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
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
                    value={input.releaseDate}
                    name="releaseDate"
                    onChange={(e) => handleChange(e)}
                    />   
                    {errors.releaseDate && (
                        <p>{errors.releaseDate}</p>
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
                <ul><li>{input.genres.map(el => el.name + " ,")}</li></ul>
                <button type="submit">Crear videojuego</button>

                </div>
            </form>
        </div>
    )
}