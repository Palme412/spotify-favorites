const express = require('express');
const router = express.Router();
const axios = require('axios');


const querystring = require('querystring');
let buff = new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
let authKey = buff.toString('base64');

axios.post('https://accounts.spotify.com/api/token',
    querystring.stringify({
        grant_type: 'client_credentials',
    }),
    {
        headers: {
            Authorization: `Basic ${authKey}`
        }

    }).then(function (response) {
        token = response.data.access_token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        // another axios call here for [song] [album] [artist] .....

        console.log(token)

    })
    .catch(function (err) {
        console.log("error", err.message)
    })

module.exports = router;