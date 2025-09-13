import React from 'react'
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu'

const StockInfoCard = ({ symbol, open, close, date }) => {
  const isUp = close > open
  const change = (close - open).toFixed(2)
  const percentChange = (((close - open) / open) * 100).toFixed(2)

  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-blue-50'>
      {/* Symbol Circle */}
      <div className='w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-800 bg-gray-100 rounded-full'>
        {symbol || "?"}
      </div>

      {/* Stock Info */}
      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 font-medium'>{symbol}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>
      </div>

      {/* Performance */}
      <div className='flex items-center gap-2'>
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
            isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {isUp ? <LuTrendingUp /> : <LuTrendingDown />}
          <h6 className='text-xs font-medium'>
            {isUp ? '+' : '-'}${Math.abs(change)} ({percentChange}%)
          </h6>
        </div>
      </div>
    </div>
  )
}

export default StockInfoCard
