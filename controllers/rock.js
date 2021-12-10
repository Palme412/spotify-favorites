const express = require('express');
const router = express.Router();
const { Rock } = require('../models');

router.get('/', function (req, res) {
    Rock.findAll()
        .then(function (rockList) {
            res.render('rock/index', { rock: rockList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured' });
        });
});

module.exports = router;