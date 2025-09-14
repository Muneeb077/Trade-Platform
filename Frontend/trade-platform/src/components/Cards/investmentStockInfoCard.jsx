import React from 'react'
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu'

const formatCurrency = (n) =>
  typeof n === 'number' ? n.toLocaleString(undefined, { style: 'currency', currency: 'USD' }) : '-'

const formatDate = (d) => {
  try {
    const dateObj = d instanceof Date ? d : new Date(d)
    return dateObj.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return String(d ?? '')
  }
}

const investmentStockInfoCard = ({
  symbol,
  type,
  numOfStocks,
  amount,
  date
}) => {
  const isSell = type === 'sell'
  const isBuy = type === 'buy'

  // For display: buy = cash outflow (-amount), sell = cash inflow (+amount)
  const signedAmount = isSell ? amount : isBuy ? -amount : 0
    const Icon = isSell ? LuTrendingUp : isBuy ? LuTrendingDown : null
    const chipClasses = isSell
    ? 'bg-green-100 text-green-700'
    : isBuy
        ? 'bg-red-100 text-red-700'
        : ''

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-blue-50">
      {/* Symbol Circle */}
      <div className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-800 bg-gray-100 rounded-full">
        {symbol || "?"}
      </div>

      {/* Stock + Meta */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-800 font-semibold">{symbol}</p>
          <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded ${chipClasses}`}>
            {type}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-1">{formatDate(date)}</p>
        
        {/* Details */}
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="text-xs text-gray-500">
            <p className="uppercase tracking-wide">Shares</p>
            <p className="text-gray-800 font-medium">{numOfStocks}</p>
          </div>
        </div>
      </div>

      {/* Cash Flow Badge */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
            isSell ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          <h6 className="text-xs font-medium">
            {signedAmount >= 0 ? '+' : '-'}
            {formatCurrency(Math.abs(signedAmount))}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default investmentStockInfoCard;
