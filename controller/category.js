const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const Shop = require('../model/shop');

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
        let data = [];
        fs.createReadStream('./data/bp.net.co_Product.csv')
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                data.push({
                    Name: row["Name"],
                    Type: row["Type"],
                    Category: row["Categories"],
                    Regular_price: row["Regular price"],
                    Sale_price: row["Sale price"],
                    Image: row["Images"]
                });
                let result = new Shop({
                    Name: row["Name"],
                    Type: row["Type"],
                    Category: row["Categories"],
                    Regular_price: row["Regular price"],
                    Sale_price: row["Sale price"],
                    Image: row["Images"]
                });
                result.save();
            })
            .on('end', () => {
                res.send(Shop.find());
            });
    } catch (err) {
        console.log(err);
    }
}

exports.addItem = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}


