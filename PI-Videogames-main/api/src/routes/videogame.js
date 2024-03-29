const { Router } = require('express');
const { Videogame, Genre } = require("../db")   
const axios = require('axios'); 

const router = Router();


router.post("/", async (req, res) => {
    let { name, description, released, rating, genres, platforms } = req.body;
    let genresIds = genres.map((g) => g.id);
    try {
        const videogame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image: 'https://media0.giphy.com/media/11FuEnXyGsXFba/giphy.gif?cid=ecf05e47js88ohxfm8o0sgevh1g6e951ffhv6npyl07huekd&rid=giphy.gif&ct=g'
      });
      videogame.setGenres(genresIds); 
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
                attributes: ["name"],
                /* through:{
                  attributes:[]
                } */
              },
            ],
          });
          res.json(videogame);
        } catch (e) {
          res.status(500).send("Error de la Base de Datos: ", e);
        }
      } else {
    try {
        //PARA DAR DETALLE DEL GAME POR API
        let {data: videogame}  = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=1e3889c41b0049f2b108f6054483daf4`
        );
        let game = {
          id: videogame.id,
          urlImg: videogame.background_image,
          name: videogame.name,
          genres: videogame.genres.map((e) => ({name: e.name})),
          rating: videogame.rating,
          platforms: videogame.platforms.map((e) => e.platform.name),
          released: videogame.released,
          description: videogame.description_raw,
        };
        res.json(game);
      } catch (e) {
        res.status(500).send("Error de la API: ", e);
      }
    } 
    });

module.exports = router;