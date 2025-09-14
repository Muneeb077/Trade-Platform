import React, { useState, useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareInvestmentLineChartData } from '../../utils/helper'
import CustomLineChart from '../Charts/CustomLineChart'

const InvestmentOverview = ({ investments, onBuyStock, onSellStock }) => {
  const [chartData, setChartData] = useState([]);
  const [seriesKeys, setSeriesKeys] = useState([]);

  useEffect(() => {
    const { data, seriesKeys } = prepareInvestmentLineChartData(investments);
    setChartData(data);
    setSeriesKeys(seriesKeys);
  }, [investments]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Investment Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>Track your investments over time</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="add-btn-buy flex items-center gap-1" onClick={onBuyStock}>
            <LuPlus className="text-lg" />
            Buy Stock
          </button>
          <button className="add-btn-sell flex items-center gap-1" onClick={onSellStock}>
            <LuPlus className="text-lg" />
            Sell Stock
          </button>
        </div>
      </div>

      <div className='mt-10'>
        <CustomLineChart data={chartData} seriesKeys={seriesKeys} />
      </div>
    </div>
  )
}

export default InvestmentOverview
