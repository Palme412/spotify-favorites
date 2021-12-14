const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', function (req, res) {
    User.findAll()
        .then(function (userList) {
            // console.log('Found all profile', profileList);
            res.render('profile/profile', { User: userList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, try again' });
        });
});





// router post bio

router.get('profile/edit', function (req, res) {
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


router.post('/profile/edit', function (req, res) {
    let userIndex = Number(req.params.id);
    User.findByPk(userIndex)
        .then(function (user) {
            if (user) {
                user = user.toJSON();
                res.render('profile/profile', { user });
            } else {
                console.log("This profile does not exist");
                res.render("404", { message: 'profile does not exist' });
            }
        })
        .catch(function (error) {
            console.log('Error', error);
        })
});

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