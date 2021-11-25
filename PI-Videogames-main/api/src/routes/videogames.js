const { Router } = require('express');
const  getAllVideogames = require('../../controllers')

const router = Router();

router.get("/", async (req, res) => {
    const  { name }  = req.query;
    let videoGamesTotal = await getAllVideogames();
    if(name) {
        let gameName = videoGamesTotal.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
        if(gameName.length > 15) gameName = gameName.slice(0, 15)
        gameName.length ?
        res.status(200).send(gameName) :
        res.status(404).send("Juego no encontrado");
    } else { 
        /* console.log("hola"); */
        res.status(200).send(videoGamesTotal);
    }
})

    module.exports = router;