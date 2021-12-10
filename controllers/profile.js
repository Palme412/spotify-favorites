const express = require('express');
const router = express.Router();
const { Profile } = require('../models');

router.get('/', function (req, res) {
    Profile.findAll()
        .then(function (profileList) {
            // console.log('Found all profile', profileList);
            res.render('profile/profile', { profile: profileList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, try again' });
        });
});

// router.get('/new', function (req, res) {
//     res.render('profiles/new');
// });

// router.get('/edit:id', function (req, res) {
//     let profileIndex = Number(req.params.id);
//     Profile.findByPk(profileIndex)
//         .then(function (profile) {
//             if (profile) {
//                 profile = profile.toJSON();
//                 res.render('profiles/edit', { profile });
//             } else {
//                 console.log("This profile does not exist");
//                 res.render("404", { message: 'profile does not exist' });
//             }
//         })
//         .catch(function (error) {
//             console.log('Error', error);
//         })
// });

// router.get('/:id', function (req, res) {
//     // console.log('PARAMS', req.params);
//     let profileIndex = Number(req.params.id);
//     // console.log('Is this a number?', profileIndex);
//     Profile.findByPk(artistIndex)
//         .then(function (profile) {
//             if (profile) {
//                 profile = profile.toJSON();
//                 console.log("Is this an profile", profile);
//                 res.render('profile/show', { profile });
//             } else {
//                 console.log("This profile does not exist");
//                 res.render('404', { message: "profile does not exist" });
//             }
//         })
//         .catch(function (error) {
//             console.log('Error', error);
//         });
// });

// router.post('/', function (req, res) {
//     // console.log('Submitted Form', req, res);
//     Profile.create({
//         title: req.body.title,
//         monthlyListeners: Number(req.body.monthlyListeners),
//         followers: Number(req.body.followers)
//     })
//         .then(function (newProfile) {
//             newProfile = newProfile.toJSON();
//             // console.log('New Profile', newProfile);
//             res.redirect(`/profile/${newProfile.id}`);
//         })
//         .catch(function (error) {
//             console.log('ERROR', error);
//             res.render('404', { message: "Artist was not added" });
//         })
// });

// router.put('/:id', function (req, res) {
//     // console.log('Edit form submitted', req.body);
//     // console.log('Here is the id', req.params.id);
//     let profileIndex = Number(req.params.id);
//     Profile.update({
//         title: req.body.name,
//         monthlyListeners: Number(req.body.monthlyListeners),
//         followers: Number(req.body.followers)
//     }, { where: { id: profileIndex } })
//         .then(function (response) {
//             console.log('After update', response);
//             res.redirect(`/artists/${profileIndex}`);
//         })
//         .catch(function (error) {
//             console.log('ERROR', error);
//             res.render('404', { message: 'Update was not successful' });
//         })
// });

module.exports = router;