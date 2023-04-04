const path = require('path');
// const blockonomics = require('blockonomics').default;
const fs = require('fs');
const csv = require('fast-csv');
const Shop = require('../model/shop');
const MyItem = require('../model/myItem');
const Payment_history = require('../model/payment_history');
const axios = require('axios');
const request = require('request');
const WebSocket = require('ws');
const payment_history = require('../model/payment_history');


exports.getItems = async (req, res) => {
    try {
        let Items = await Shop.find();
        res.send(Items);

    } catch (err) {
        console.log(err);
    }
}

exports.setItems = async (req, res) => {
    try {
        fs.createReadStream('./data/bp.net.co_Product.csv')
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                let result = new Shop({
                    Name: row["Name"],
                    Type: row["Type"],
                    Category: row["Categories"],
                    Regular_price: row["Regular price"],
                    Sale_price: row["Sale price"],
                    Image: row["Images"]
                });
                Shop.findOne({
                    Name: row["Name"],
                    Type: row["Type"],
                    Category: row["Categories"],
                    Regular_price: row["Regular price"],
                    Sale_price: row["Sale price"],
                    Image: row["Images"]
                })
                    .then(res => !res && result.save())
                    .catch(err => console.log(err));
            })
            .on('end', () => {
                Shop.find()
                    .then(data => res.send(data))
                    .catch(err => console.log(err));
            });
    } catch (err) {
        console.log(err);
    }
}

exports.addItem = async (req, res) => {
    try {
        let result = new MyItem({
            ...req.body
        });

        let resu = await MyItem.findOne({
            Name: req.body.Name,
            Type: req.body.Type,
            Image: req.body.Image
        });
        if (resu) {
            let data = await MyItem.findOneAndUpdate({ _id: resu._id }, { count: resu.count + 1 });

            if (data) {
                data.count += 1;
                console.log(data);
                res.send(data);
            }
        }
        else {
            result.save().then(r => res.send(r));
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getMyItems = async (req, res) => {
    try {
        let data = await MyItem.find();
        if (data) {
            res.send(data)
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteItem = async (req, res) => {
    try {
        let data = await Shop.findOneAndDelete({
            Name: req.body.Name,
            Image: req.body.Image
        })
        if (data) {
            Shop
                .find()
                .then(result => res.send(result))
        }

    } catch (error) {
        console.log(error);
    }
}

exports.updateItem = async (req, res) => {
    try {
        let data = await Shop.findOneAndUpdate({
            Name: req.body.Details
        }, req.body);
        if (data) {
            Shop
                .find()
                .then(result => res.send(result))
        }
    } catch (error) {
        console.log(error);
    }
}

exports.payment = async (req, res) => {

    const ws = new WebSocket('wss://www.blockonomics.co/payment/bc1q0y6cjnx08tyr6r4ehy3eekv5vr5d3vtwzl8vm5');

    ws.on('open', function open() {
        console.log('WebSocket connection established.');
    });

    ws.on('message', function incoming(data) {
        const txs = JSON.parse(data);
        console.log('Received new transactions:', txs);
        res.json(txs);
        // const newData = new payment_history({

        // })
    });

    ws.on('close', function close() {
        console.log('WebSocket connection closed.');
    });

}

exports.getAddress = (req, res) => {
    const API_KEY = 'K1ohg4jwQpMDayTCKVVFjjODFW6jlpB3WYMhIuwskks';

    const options = {
        url: 'https://www.blockonomics.co/api/new_address?reset=1',
        headers: {
            'Authorization': 'Bearer ' + API_KEY
        },
        form: {
            'currency': 'BTC',
            'callback': '/callback?secret=810fd93fd45a3c75e2c8539c8c9dc6f9f84f41ce',
        }
    };

    request.post(options, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('New Bitcoin address created: ' + body);
            const data = JSON.parse(body);
            if (data && data.address) {
                res.send(data.address);
            } else {
                console.log('Error creating new Bitcoin address');
            }
        }
    });
}

exports.deleteMyItem = async (req, res) => {
    try {
        let data = await MyItem.findOneAndDelete({
            Name: req.body.Name,
            Image: req.body.Image
        })
        if (data) {
            MyItem
                .find()
                .then(result => res.send(result))
        }
    } catch (error) {
        console.log(error);
    }
}


