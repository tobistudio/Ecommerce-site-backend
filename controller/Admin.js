const path = require('path');
const csv = require('fast-csv');
const fs = require('fs');
const Shop = require('../model/shop');

exports.getItems = async (req, res) => {
    try {
        let data = await Shop.find();
        if(data) {
            res.send(data);
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.setItems = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

exports.addItem = async (req, res) => {
    try {
        let newshop = new Shop({
            ...req.body
        });
        let result = await newshop.save();

        if(result) {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteItem = async (req, res) => {
    try {
        let data = await Shop.findOneAndDelete({
            Name: req.body.Name,
            Type: req.body.Type,
            Image: req.body.Image
        });
        if(data) {
            let result = await Shop.find();
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
}