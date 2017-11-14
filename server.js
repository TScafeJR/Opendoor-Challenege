"use strict";

const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pg = require('pg');
var pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable missing. Did you run 'source env.sh'?");
  process.exit(1);
}

if (!pool) {
  console.error('pg.Pool is not set up, edit app.js and setup the pool');
  process.exit(1);
}

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error running query', err);
  } else {
    console.log('Success, you are connected to Postgres');
  }
});

app.get('/listings/', (req, res) => {

    let minP = req.query.minprice || 0
    let maxP = req.query.maxprice || 200000000
    let minBe = req.query.minbed || 0
    let maxBe = req.query.maxbed || 200000000
    let minB = req.query.minbath || 0
    let maxB = req.query.maxbath || 200000000

    pool.query(`SELECT * FROM challenges where price > $1 and price < $2 and
    bedrooms > $3 and bedrooms < $4 and bathrooms > $5 and bathrooms < $6;`, [minP, maxP, minBe, maxBe, minB, maxB])
    .then(rooms =>{
        res.json({
            "type": "FeatureCollection",
            "features": rooms.rows
        })
    })
    .catch(function(error){
        console.log(`there was an error: \n ${error}`)
    }) 
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}.`);
});


