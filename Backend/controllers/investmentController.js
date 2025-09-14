const Investment = require('../models/investment')
const getStockData = require('../models/stockAPI.js')
const Holding = require('../models/Holding.js');
const mongoose = require("mongoose");

exports.buyStock = async (req, res) => {
  const userId = req.user.id;
  const { symbol, numOfStocks } = req.body;

  if (!symbol || !numOfStocks || numOfStocks <= 0) {
    return res.status(400).json({ message: "Stock symbol and a valid number of stocks are required." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const lastInvestment = await Investment.findOne({ userId })
      .sort({ date: -1 })
      .session(session);
    const currentBalance = lastInvestment ? lastInvestment.balance : 1000;

    const stockData = await getStockData(symbol);
    const openPrice = stockData?.open;
    if (typeof openPrice !== 'number' || Number.isNaN(openPrice)) {
      await session.abortTransaction(); session.endSession();
      return res.status(400).json({ message: "Could not retrieve valid open price for the stock." });
    }
    const totalInvestment = openPrice * numOfStocks;

    if (totalInvestment > currentBalance) {
      await session.abortTransaction(); session.endSession();
      return res.status(400).json({ message: "Insufficient balance to complete this transaction." });
    }

    const newBalance = currentBalance - totalInvestment;

    const existingHolding = await Holding.findOne({ userId, symbol }).session(session);

    const prevShares = existingHolding?.numOfStocks ?? 0;
    const newShares = prevShares + Number(numOfStocks);

    let updateDoc = { numOfStocks: newShares };
    if ('averageCost' in (existingHolding ?? { averageCost: undefined })) {
      const prevAvg = existingHolding?.averageCost ?? 0;
      const prevCostBasis = prevShares * prevAvg;
      const newAvg = newShares > 0 ? (prevCostBasis + totalInvestment) / newShares : 0;
      updateDoc.averageCost = newAvg;
    }

    await Holding.findOneAndUpdate(
      { userId, symbol },
      { $set: updateDoc },
      { upsert: true, new: true, session }
    );

    const investment = new Investment({
      userId,
      symbol,
      balance: newBalance,
      numOfStocks,
      pricePerStock: openPrice,
      amount: totalInvestment,
      type: 'buy',
      date: new Date()
    });
    await investment.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ message: "Stock purchased successfully.", investment });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error buying stock:', error);
    return res.status(500).json({ message: "Error buying stock", error: error.message });
  }
};

exports.sellStock = async (req, res) => {
  const userId = req.user.id;
  const { symbol, numOfStocks } = req.body;

  if (!symbol || !numOfStocks || numOfStocks <= 0) {
    return res.status(400).json({ message: "Stock symbol and a valid number of stocks are required." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const lastInvestment = await Investment.findOne({ userId }).sort({ date: -1 }).session(session);
    let currentBalance = lastInvestment ? lastInvestment.balance : 1000;

    const updatedHolding = await Holding.findOneAndUpdate(
      { userId, symbol, numOfStocks: { $gte: numOfStocks } },
      { $inc: { numOfStocks: -numOfStocks } },
      { new: true, session }
    );

    if (!updatedHolding) {
      
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "You do not own enough stocks to sell." });
    }

    const stockData = await getStockData(symbol);
    const closePrice = stockData?.close;
    if (typeof closePrice !== 'number' || Number.isNaN(closePrice)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Could not retrieve valid close price for the stock." });
    }

    const totalAmount = closePrice * numOfStocks;
    const newBalance = currentBalance + totalAmount;

    if (updatedHolding.numOfStocks === 0) {
      await Holding.deleteOne({ _id: updatedHolding._id }).session(session);
    }

    const investment = new Investment({
      userId,
      symbol,
      balance: newBalance,
      numOfStocks,
      pricePerStock: closePrice,
      amount: totalAmount,
      type: 'sell',
      date: new Date()
    });

    await investment.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Stock sold successfully.",
      investment
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error selling stock:', error);
    return res.status(500).json({ message: "Error selling stock", error: error.message });
  }
};

exports.getStockInfo = async (req, res) => {
  const userId = req.user.id;
  const includeTransactions = String(req.query.includeTransactions || '').toLowerCase() === 'true';

  try {
    const [holdings, transactions] = await Promise.all([
      // Only holdings with remaining shares
      Holding.find({ userId, numOfStocks: { $gt: 0 } }).sort({ updatedAt: -1 }),
      includeTransactions ? Investment.find({ userId }).sort({ date: -1 }) : Promise.resolve([]),
    ]);

    res.json({
      holdings,
      ...(includeTransactions ? { transactions } : {}),
    });
  } catch (error) {
    console.error('Error fetching stock info:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};