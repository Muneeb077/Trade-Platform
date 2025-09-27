const getStockData = require('../models/stockAPI.js')
const { isValidObjectId, Types} = require("mongoose")
const Investment = require('../models/investment.js')

exports.getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        const stock_list = ['AAPL', 'NVDA', 'TSLA', 'INTC', 'HD'];

        const results = await Promise.allSettled(
        stock_list.map(ticker => getStockData(ticker))
        );

        const dashboardStockList = results.map((r, i) =>
        r.status === 'fulfilled'
            ? r.value
            : { ticker: stock_list[i], error: r.reason?.message || 'Unknown error' }
        );

        const investments = await Investment.find({userId}).sort({date:-1});
        const totalInvestment = investments
            .filter(inv => inv.type === 'buy')
            .reduce((sum, inv) => sum + inv.amount, 0);
        const balance = investments.length > 0 ? investments[0].balance : 1000;
        const last5Sales = investments
            .filter(inv => inv.type === 'buy')
            .slice(0, 5);

        res.json({
            balance,
            totalInvestment,
            dashboardStockList,
            last5Sales,
        })
    } catch(error){
        res.status(500).json({message:"Server Error", error});
    }
}
