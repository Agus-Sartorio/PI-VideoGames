const { Router } = require('express');
/* const  getAllVideogames  = require('../../controllers') */
/* const { getAllGenres } = require('../../controllers/genres') */
const { Videogame, Genre } = require("../db")
const axios = require('axios');


const router = Router();

/* console.log(getAllVideogames); */

const getApiInfo = async () => {
    try {
       const apiUrl = await axios.get('https://api.rawg.io/api/games?key=1e3889c41b0049f2b108f6054483daf4');
       const apiUrl2 = await axios.get('https://api.rawg.io/api/games?key=1e3889c41b0049f2b108f6054483daf4&page=2');
       const apiUrl3 = await axios.get('https://api.rawg.io/api/games?key=1e3889c41b0049f2b108f6054483daf4&page=3');
       const apiUrl4 = await axios.get('https://api.rawg.io/api/games?key=1e3889c41b0049f2b108f6054483daf4&page=4');
       const apiUrl5 = await axios.get('https://api.rawg.io/api/games?key=1e3889c41b0049f2b108f6054483daf4&page=5');
       const totalInfo = apiUrl.data.results.concat(apiUrl2.data.results, apiUrl3.data.results, apiUrl4.data.results, apiUrl5.data.results);
       /* console.log(apiUrl.data.results); */
       const apiInfo = await totalInfo.map(el => {
           return {
               id: el.id,
               name: el.name,
               genres : el.genres.map(e => {
                   return {
                       name: e.name,
                       id: e.id
                   }
               }),
               platforms: el.platforms.map(e => {
                   return {
                       name: e.platform.name
                   }
               }),
               image: el.background_image,
               rating: el.rating,
               description: el.description,
               released: el.released, 
           }
       }) 
       /*  console.log(apiInfo); */
        return apiInfo; 
   } catch (error) {
       console.log(error);
   }
};

const getDbInfo = async () => {
   return await Videogame.findAll({
       include: {
           model: Genre,
           attributes: ["name"],
           through: {
               attributes: [],
           },
       }
   })
}

const getAllVideogames = async () => {
   let apiInfo = await getApiInfo();
   let dbInfo = await getDbInfo();
   const infoTotal = dbInfo.concat(apiInfo);
   return infoTotal;
}

router.get("/", async (req, res) => {
    const  { name }  = req.query;
    let videoGamesTotal = await getAllVideogames();
    if(name) {
        let gameName = await videoGamesTotal.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
        gameName.length ?
        res.status(200).send(gameName) :
        res.status(404).send("Juego no encontrado");
    } else { 
        /* console.log("hola"); */
        res.status(200).send(videoGamesTotal);
    }
})

    module.exports = router;