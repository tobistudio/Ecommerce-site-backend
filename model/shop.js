const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
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
        description: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Shop", ItemSchema);