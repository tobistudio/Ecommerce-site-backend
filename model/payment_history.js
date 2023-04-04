const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payment_history = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Telegram_address: {
            type: String,
        },
        email_address: {
            type: String,
            required: true
        },
        ICQ_contact: {
            type: String,
        },
        text: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
        },
        state: {
            type: String,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Payment_history", payment_history);