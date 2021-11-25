import axios from 'axios';

export function getVideogames(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/videogames',{

        });
        console.log(json.data);
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data,
        });
    }
}

export function getNameVideogame(name) {
    return async function (dispatch) {
        try{
            var json = await axios('http://localhost:3001/videogames?name=' + name);
            return dispatch({
                type: "GET_NAME_VIDEOGAME",
                payload: json.data
            })
            } catch(error){
                return dispatch({
                    type:"GET_NAME_VIDEOGAME",
                    payload:[] // esto es para cuando le paso el action.payload en el reducer.
                })
        }
    }
}

export function filterVideoGamesByGenre(payload){
    console.log(payload)
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function filterCreated(payload){
    return {
        type: "FILTER_CREATED", 
        payload
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByRating(payload){
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}

export function getGenres() {
    return async function (dispatch) {
        var info = await axios('http://localhost:3001/genres', {
        });
        return dispatch({
            type: "GET_GENRES",
            payload: info.data
        });
    };
}

export function postVideogame(payload){
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogame', payload);
        console.log(response);
        return response;
    }
}

export function getDetail(id) {
    return async function(dispatch){
        try{
        var json = await axios.get('http://localhost:3001/videogame/' + id);
        return dispatch({
            type: "GET_DETAIL",
            payload: json.data
        })}
        catch(error){
            console.log(error)
        }
    }
}