const { Router } = require('express');
/* const { getAllVideogames } = require('../../controllers')   */ 
const { Videogame, Genre } = require("../db")   
const axios = require('axios'); 
/* const { v4 } = require('uuid'); */

/* const router = Router(); */

const router = Router();


router.post("/", async (req, res) => {
    let { name, description, releaseDate, rating, genres, platforms, } = req.body;
    let genresIds = genres.map((g) => g.id); //?????
    try {
        console.log("uno")
        const videogame = await Videogame.create({
        /* id: v4(), */
        name,
        description,
        releaseDate,
        rating,
        platforms,
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif'
      });
      videogame.setGenres(genresIds);
      console.log("dos");
      return res.json(videogame);
    } catch (e) {
      return res.status(400).send(e);
    }
  });

router.get('/:id', async(req, res) => {
    let { id } = req.params;
    if (isNaN(id)) {
        try {
          let videogame = await Videogame.findByPk(id, {
            include: [
              {
                model: Genre,
                attributes: ["name"],//???????
                through: {
                  attributes: [],
                },
              },
            ],
          });
          generos = videogame.genres.map((e) => { //???????????
            return e.name;
          });
          let videogameNew = {
            name: videogame.name,
            description: videogame.description,
            rating: videogame.rating,
            genres: generos,
            platforms: videogame.platforms,
            image: videogame.image,
            released: videogame.release_date,
          };
          res.json(videogameNew);
        } catch (e) {
          res.status(404).send("Error de la Base de Datos: ", e);
        }
      } else {
    try {
        //PARA DAR DETALLE DEL GAME POR API
        let videogame = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=1e3889c41b0049f2b108f6054483daf4`
        );
        videogame = videogame.data;
        let game = {
          id: videogame.id,
          urlImg: videogame.background_image,
          name: videogame.name,
          genres: videogame.genres.map((e) => e.name),
          rating: videogame.rating,
          platforms: videogame.platforms.map((e) => e.platform.name),
          released: videogame.released,
          description: videogame.description_raw,
        };
        res.json(game);
      } catch (e) {
        res.status(404).send("Error de la API: ", e);
      }
    } 
    });

module.exports = router;