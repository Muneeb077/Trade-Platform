const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    symbol: { type: String, required: true },
    balance: {type: Number, default: 1000},
    numOfStocks: { type: Number, required: true },
    pricePerStock: { type: Number, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['buy', 'sell'], required: true },
    date: { type: Date, default: Date.now },
}, {timestamps: true});

module.exports = mongoose.model('Investment', InvestmentSchema);