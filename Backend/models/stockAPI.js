const axios = require('axios');

const apikey = process.env.STOCK_API;

/**
 * Get latest end-of-day open/close for a ticker
 * @param {string} ticker - e.g. "AAPL"
 * @returns {Promise<{symbol:string, date:string, open:number, close:number}>}
 */
const getStockData = async (ticker) => {
  try {
    const url = `https://api.marketstack.com/v2/eod/latest?access_key=${apikey}&symbols=${encodeURIComponent(ticker)}&limit=1`;

    const { data: payload } = await axios.get(url);

    if (!payload || !Array.isArray(payload.data) || payload.data.length === 0) {
      throw new Error(`No EOD data returned for ${ticker}`);
    }

    const { open, close, date, symbol } = payload.data[0];

    // Return only the fields you want
    return { symbol, date, open, close };
  } catch (e) {
    console.error('An error happened:', e?.response?.data || e.message || e);
    throw e;
  }
};

module.exports = getStockData;
