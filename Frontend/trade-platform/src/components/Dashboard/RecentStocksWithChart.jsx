import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#193cb8", "#00b8db", "#7f22fe", "#00d3f2"]

const RecentStocksWithChart = ({ last5Sales }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = (last5Sales ?? []).map((item) => ({
      symbol: item?.symbol ?? "",
      amount: Number(item?.amount) || 0,
    }));
    setChartData(dataArr);
    return () => {};
  }, [last5Sales]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 5 Buys</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Last 5 Transactions"
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentStocksWithChart