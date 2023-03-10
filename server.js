const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shop = require('./router/shop');
const admin = require('./router/admin');
const cors = require('cors');

const db = require('./keys/config').mongoURI;

const app = express();

app.get('/', (req, res) => {
    res.json({ msg: "success" })
})

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Mongodb connection
mongoose.connect(db)
    .then(() => console.log("Mongodb connected!"))
    .catch(err => console.log(err));

// app

app.use('/shop', shop);
app.use('/admin', admin);

const port = process.env.PORT || 8000;

app.listen(port, (() => {
    console.log(`Server is running on ${port}`);
}))