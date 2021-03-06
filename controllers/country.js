const express = require('express');
const router = express.Router();
const { Country } = require('../models');

router.get('/', function (req, res) {
    Country.findAll()
        .then(function (countryList) {
            res.render('country/index', { country: countryList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured' });
        });
});

module.exports = router;