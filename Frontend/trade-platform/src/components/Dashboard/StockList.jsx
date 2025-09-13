import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import StockInfoCard from '../Cards/stockInfoCard'

const StockList = ({dashboardStockList}) => {
  return (
    <div className='card bg-sky-100 rounded-lg'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Stocks List</h5>
      </div>

      <div>
        {dashboardStockList?.map((stock, index) => (
          <StockInfoCard
            key={index}
            symbol={stock.symbol || stock.ticker}
            open={stock.open}
            close={stock.close}
            date={stock.date ? moment(stock.date).format("MMM DD, YYYY") : "N/A"}
          />
        ))}
      </div>
    </div>
  )
}

export default StockList