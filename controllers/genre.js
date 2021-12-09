const express = require('express');
const router = express.Router();
const { Genre } = require('../models');

router.get('/', function (req, res) {
    Genre.findAll()
        .then(function (genreList) {
            // console.log('Found genres', genreList);
            res.render('genre/index', { genre: genreList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured' });
        });
});

module.exports = router;