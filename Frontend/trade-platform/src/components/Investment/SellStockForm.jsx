import React, { useState, useMemo } from 'react';

const SellStockForm = ({ onSellStock }) => {
    const [symbol, setSymbol] = useState('');
      const [numOfStocks, setNumOfStocks] = useState('');
      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);
    
      const trimmedSymbol = useMemo(() => symbol.trim().toUpperCase(), [symbol]);
    
      const validate = () => {
        const newErrors = {};
    
        if (!trimmedSymbol) {
          newErrors.symbol = 'Symbol is required.';
        } else if (!/^[A-Z.-]{1,10}$/.test(trimmedSymbol)) {
          newErrors.symbol = 'Use a valid stock symbol (A–Z, ., -).';
        }
    
        if (numOfStocks === '' || numOfStocks === null) {
          newErrors.numOfStocks = 'Number of shares is required.';
        } else if (isNaN(numOfStocks)) {
          newErrors.numOfStocks = 'Enter a valid number.';
        } else if (Number(numOfStocks) <= 0) {
          newErrors.numOfStocks = 'Must be greater than 0.';
        } else if (!Number.isFinite(Number(numOfStocks))) {
          newErrors.numOfStocks = 'Number is not valid.';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        try {
          setSubmitting(true);
          await onSellStock({
            symbol: trimmedSymbol,
            numOfStocks: Number(numOfStocks),
          });
          // If parent closes modal on success, we don't reset here;
          // but in case parent doesn't, clear the form:
          setSymbol('');
          setNumOfStocks('');
        } finally {
          setSubmitting(false);
        }
      };
  
    return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Symbol */}
      <div>
        <label className="text-[13px] text-slate-800 block mb-1">Stock Symbol</label>
        <div className="input-box flex items-center gap-2">
          <input
            type="text"
            placeholder="e.g. AAPL"
            className="w-full bg-transparent outline-none"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            autoComplete="off"
            inputMode="text"
            maxLength={10}
          />
        </div>
        {errors.symbol && (
          <p className="mt-1 text-xs text-red-600">{errors.symbol}</p>
        )}
      </div>

      {/* Number of Shares */}
      <div>
        <label className="text-[13px] text-slate-800 block mb-1">Number of Shares</label>
        <div className="input-box flex items-center gap-2">
          <input
            type="number"
            placeholder="e.g. 5"
            className="w-full bg-transparent outline-none"
            value={numOfStocks}
            onChange={(e) => setNumOfStocks(e.target.value)}
            min="0"
            step="1"
            inputMode="numeric"
          />
        </div>
        {errors.numOfStocks && (
          <p className="mt-1 text-xs text-red-600">{errors.numOfStocks}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className={`w-full rounded-xl px-4 py-2 font-medium transition ${
            submitting
              ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Selling…' : 'Sell Stock'}
        </button>
      </div>
    </form>
  )
}

export default SellStockForm