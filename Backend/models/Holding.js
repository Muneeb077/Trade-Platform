const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  symbol: { type: String, required: true, index: true },
  numOfStocks: { type: Number, required: true, min: 0 },
}, { timestamps: true });

HoldingSchema.index({ userId: 1, symbol: 1 }, { unique: true });

module.exports = mongoose.model('Holding', HoldingSchema);