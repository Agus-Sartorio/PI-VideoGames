const axios = require('axios');
/* const Genre = require('../src/models/Genre'); */
const { Genre } = require("../src/db")

const getAllGenres = async () => {
    try {
       const apiUrl = await axios.get('https://api.rawg.io/api/genres?key=1e3889c41b0049f2b108f6054483daf4');
       var apiGenres = [];
       for(var i = 0; i < apiUrl.data.results.length; i++){
           var genres = apiUrl.data.results[i];
           const genreObj = {
               name: genres.name,
               id: genres.id
           }
               apiGenres.push(genreObj);
           }
         apiGenres.map(uniqueGenre => { //???????????????????
             Genre.findOrCreate({
                 where: {
                        name: uniqueGenre.name,
                        id: uniqueGenre.id
                 }
             })
         })
   } catch (error) {
       console.log(error);
   }
};

module.exports = getAllGenres;