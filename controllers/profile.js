const express = require('express');
const router = express.Router();
const { User } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function (req, res) {
    User.findByPk(Number(req.user.id))
        .then(function (User) {
            User = User.toJSON();
            res.render('profile/profile', { User })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, try again' });
        });
});


router.get('/:id/edit', isLoggedIn, function (req, res) {
    let userIndex = Number(req.params.id);
    User.findByPk(userIndex)
        .then(function (User) {
            if (User) {
                User = User.toJSON();
                res.render('profile/edit', { User });
            } else {
                console.log("This user does not exist");
                res.render("404", { message: 'User does not exist' });
            }
        })
        .catch(function (error) {
            console.log('Error', error);
        })
});


router.put('/:id/edit', isLoggedIn, function (req, res) {
    let userIndex = Number(req.params.id);
    User.update({
        name: req.body.name,
        email: req.body.email
    }, {
        where: { id: userIndex }
    })
        .then(function (result) {
            if (result) {
                res.redirect('/profile')
            } else {
                console.log("This profile does not exist");
                res.render("404", { message: 'profile does not exist' });
            }
        })
        .catch(function (error) {
            console.log('Error', error);
        })
});


module.exports = router;