
const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail: {},
    platforms: [],
    loading: false
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {    
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case "FILTER_BY_GENRE":
            const allVideogames = state.allVideogames;
            console.log(allVideogames)
            const statusFiltered = action.payload === "todos" ? allVideogames : 
            allVideogames.filter(game => game.genres.find(genre => genre.name === action.payload))
            return{
                ...state,
                videogames: statusFiltered
            }
        case "FILTER_CREATED":
            const allVideogames2 = state.allVideogames;
            const createdFilter = action.payload === "created" ? allVideogames2.filter(el => el.createdInDb) : 
            allVideogames2.filter(el => !el.createdInDb);
            return{
                ...state,
                videogames: action.payload === "All" ? state.allVideogames : createdFilter
            }
        case "ORDER_BY_NAME":
            let sortedArr = action.payload === "asc" ? state.videogames.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : 
            state.videogames.sort(function(a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                videogames: sortedArr
            }
            case "ORDER_BY_RATING":
                let sortedArr2 = action.payload === "asc" ? state.videogames.sort(function(a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }) : 
                state.videogames.sort(function(a, b) {
                    if(a.rating > b.rating) {
                        return -1;
                    }
                    if(b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    videogames: sortedArr2
                }
            case "GET_NAME_VIDEOGAME":
                return {
                    ...state,
                    videogames: action.payload
                }
            case "GET_GENRES":
                console.log(action.payload);
                return {
                    ...state,
                    genres: action.payload
                }
            case "POST_VIDEOGAME":
                return {
                    ...state,
                }
            case "GET_DETAIL":
                console.log(action.payload);
                return {
                    ...state,
                    detail: action.payload
                }
            case "SET_LOADING":
                return {
                    ...state,
                    loading: action.payload
                }
        default:    
            return state;
    }

}

export default rootReducer;