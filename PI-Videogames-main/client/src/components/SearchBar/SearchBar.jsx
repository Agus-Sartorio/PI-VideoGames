import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../../actions";
import styles from "./SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameVideogame(name));
        setName("");
    }

    return (
        <form className={styles.buscar} onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Buscar..."
            onChange={(e) => handleInputChange(e)}
            value={name}
            />
            <button type="submit" className={styles.btn}><i class="fas fa-search"></i></button>
        </form>
    )
}