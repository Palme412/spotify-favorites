require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const querystring = require('querystring');
const methodOverride = require('method-override');
const { Genre, Rap, Country, Pop, Rock } = require("./models");
const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

const axios = require('axios');
const { generateKey } = require('crypto');
let buff = new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
let authKey = buff.toString('base64');
let headers = {
  Authorization: `Basic ${authKey}`
}

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/views/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

app.use('/auth', require('./controllers/auth'));
app.use('/rap', require('./controllers/rap'));
app.use('/rock', require('./controllers/rock'));
app.use('/pop', require('./controllers/pop'));
app.use('/country', require('./controllers/country'));
app.use('/profile', require('./controllers/profile'));

// ========== SPOTIFY API ========== //

// app.get('/test-albums', function (req, res) {
//   // Make a AXIOS call (POST) to submit CLIENT_ID and CLIENT_SECRET
//   axios.post('https://accounts.spotify.com/api/token',
//     querystring.stringify({ grant_type: 'client_credentials' }),
//     {
//       headers: headers
//     })
//     .then(function (response) {
//       token = response.data.access_token
//       console.log('TOKEN', token);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//       // make another axios (GET) to get the data 
//       axios.get('https://api.spotify.com/v1/artists/2CIMQHirSU0MQqyYHq0eOx', config)
//         .then(function (response) {
//           console.log('DATA YAY!', response.data);
//           res.json({ data: response.data });
//           let alldata = response.data;
//           console.log(alldata);
//           tracksArr = alldata.tracks.items;
//           console.log(tracksArr)

//           for (let i = 0; i < tracksArr.length; i++) {
//             let artistsArrs = tracksArr[i].track.album.artists;

//             for (let j in artistsArrs) {
//               let artistDetails = artistsArrs[j];
//               artistName = artistDetails.name;
//               artistIDs = artistDetails.id;
//               console.log(artistName);
//               console.log(artistIDs);
//             }

//           }
//           res.render('whateverpage', { data: response.data });
//         })
//         .catch(err => {
//           console.log('ERROR', err);
//         });


//     })
//     .catch(function (err) {
//       console.log("error", err.message)
//     })
// });



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`???? You're listening to the smooth sounds of port ${PORT} ????`);
});



module.exports = server;
