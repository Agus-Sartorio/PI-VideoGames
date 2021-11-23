const { Genre } = require('../db');
const { Router } = require('express');

const router = Router();

router.get("/", async (req, res) => {
    try {
        const generos = await Genre.findAll();
        console.log("-------------------------------", generos);
        res.json(generos);
    } catch (error) {
        res.sendStatus(500);
    }

    })

    module.exports = router;