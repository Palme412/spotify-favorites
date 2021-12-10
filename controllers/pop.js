const express = require('express');
const router = express.Router();
const { Pop } = require('../models');

router.get('/', function (req, res) {
    Pop.findAll()
        .then(function (popList) {
            res.render('pop/index', { pop: popList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured' });
        });
});

module.exports = router;