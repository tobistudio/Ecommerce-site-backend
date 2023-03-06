const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const Shop = require('../model/shop');
const MyItem = require('../model/myItem');

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

            if(data) {
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
        let data = await MyItem.findOneAndDelete({
            Name: req.body.Name,
            Type: req.body.Type,
            Image: req.body.Image
        })
        MyItem
            .find()
            .then(result => res.send(result))
    } catch (error) {
        console.log(error);
    }
}

