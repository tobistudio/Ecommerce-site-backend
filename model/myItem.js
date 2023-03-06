const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myItem = new Schema(
    {
        Name: {
            type: String,
        },
        Type: {
            type: String,
            required: true
        },
        Regular_price: {
            type: Number,
        },
        Sale_price: {
            type: Number,
        },
        Image: {
            type: String,
        },
        Category: {
            type: String
        },
        description: {
            type: String,
        },
        count : {
            type: Number,
            default: 1
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("MyItem", myItem);