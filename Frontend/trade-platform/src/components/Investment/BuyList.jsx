import React from 'react'
import moment from 'moment'
import InvestmentStockInfoCard from '../Cards/investmentStockInfoCard'

const BuyList = ({ investmentData = [] }) => {
  const buys = Array.isArray(investmentData)
    ? investmentData.filter(tx => tx?.type === 'buy')
    : [];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Bought Stocks</h5>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-1'>
        {buys.map((investment) => (
          <InvestmentStockInfoCard
            key={investment._id}
            symbol={investment.symbol}
            type='buy'
            numOfStocks={investment.numOfStocks}
            pricePerStock={investment.pricePerStock}
            amount={investment.amount}
            balance={investment.balance}
            date={investment.date ? moment(investment.date).format('MMM DD, YYYY') : 'N/A'}
          />
        ))}
        {buys.length === 0 && (
          <p className="text-sm text-gray-500 py-3">No buy transactions yet.</p>
        )}
      </div>
    </div>
  )
}

export default BuyList
