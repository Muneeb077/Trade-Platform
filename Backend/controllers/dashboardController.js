const getStockData = require('../models/stockAPI.js')
const { isValidObjectId, Types} = require("mongoose")

exports.getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        const stock_list = ['AAPL', 'NVDA', 'TSLA', 'INTC', 'NKE', 'HD'];

        const results = await Promise.allSettled(
        stock_list.map(ticker => getStockData(ticker))
        );

        const dashboardStockList = results.map((r, i) =>
        r.status === 'fulfilled'
            ? r.value
            : { ticker: stock_list[i], error: r.reason?.message || 'Unknown error' }
        );

        console.log('Stocks data:', {
        dashboardStockList,
        userIdIsValid: isValidObjectId(userId),
        });
        const totalBalance = 1000;
        const Investments = 0;

        res.json({
            totalBalance,
            dashboardStockList,
            Investments,
        })
    } catch(error){
        res.status(500).json({message:"Server Error", error});
    }
}