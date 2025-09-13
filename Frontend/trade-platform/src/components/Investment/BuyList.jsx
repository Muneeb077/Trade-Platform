import React from 'react'
import moment from 'moment'
import { LuDownload } from 'react-icons/lu'
import InvestmentStockInfoCard from '../Cards/investmentStockInfoCard'

const BuyList = ({investmentData}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>All Bought Stocks</h5>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {investmentData?.map((investment) => (
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
        </div>
    </div>
  )
}

export default BuyList