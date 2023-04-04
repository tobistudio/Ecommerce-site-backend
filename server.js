const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shop = require('./router/shop');
const admin = require('./router/admin');
const blockonomics = require('blockonomics');
const path = require('path');

const cors = require('cors');

const db = require('./keys/config').mongoURI;

const app = express();

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'build')))

// Mongodb connection
mongoose.connect(db)
    .then(() => console.log("Mongodb connected!"))
    .catch(err => console.log(err));

app.post('/callback', function (req, res) {
    const payload = req.body;
    if (payload && payload.txid) {
        const txid = payload.txid;
        console.log('Payment received. Transaction ID: ' + txid);
        // Update the order status, deliver the goods, etc.
    } else {
        console.log('Invalid callback payload');
    }
    res.sendStatus(200);
});
// app

app.use('/shop', shop);
app.use('/admin', admin);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 8000;

app.listen(port, (() => {
    console.log(`Server is running on ${port}`);
}))