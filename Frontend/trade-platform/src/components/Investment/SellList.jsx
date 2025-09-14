import React from 'react'
import moment from 'moment'
import InvestmentStockInfoCard from '../Cards/investmentStockInfoCard'

const SellList = ({ investmentData = [] }) => {
  const sells = Array.isArray(investmentData)
    ? investmentData.filter(tx => tx?.type === 'sell')
    : [];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Sold Stocks</h5>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-1'>
        {sells.map((investment) => (
          <InvestmentStockInfoCard
            key={investment._id}
            symbol={investment.symbol}
            type='sell'
            numOfStocks={investment.numOfStocks}
            pricePerStock={investment.pricePerStock}
            amount={investment.amount}
            balance={investment.balance}
            date={investment.date ? moment(investment.date).format('MMM DD, YYYY') : 'N/A'}
          />
        ))}
        {sells.length === 0 && (
          <p className="text-sm text-gray-500 py-3">No sell transactions yet.</p>
        )}
      </div>
    </div>
  )
}

export default SellList
