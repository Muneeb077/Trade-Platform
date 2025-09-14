import React, { useMemo } from 'react';
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart, Legend,
} from 'recharts';
import { addThousandSeparator } from '../../utils/helper';

const COLORS = [
  '#875cf5', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444',
  '#14b8a6', '#8b5cf6', '#e11d48', '#84cc16', '#06b6d4'
];

const CustomLineChart = ({ data, seriesKeys = [] }) => {

  const colorMap = useMemo(() => {
    const map = {};
    seriesKeys.forEach((k, i) => { map[k] = COLORS[i % COLORS.length]; });
    return map;
  }, [seriesKeys]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    // payload: one item per visible series at this X (date)
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-xs font-semibold text-gray-700 mb-1'>{label}</p>
        <div className='space-y-1'>
          {payload.map((p, idx) => {
            const sym = p.dataKey;            // <-- the series key, e.g., 'AAPL'
            const val = Number(p.value) || 0; // amount for that symbol
            return (
              <div key={idx} className='flex items-center justify-between gap-6'>
                <span className='text-xs' style={{ color: p.color }}>{sym}</span>
                <span className='text-sm font-medium text-gray-900'>
                  ${addThousandSeparator(val.toFixed(2))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='bg-white mt-6'>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data}>
          <defs>
            {seriesKeys.map((k) => (
              <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset='5%' stopColor={colorMap[k]} stopOpacity={0.35} />
                <stop offset='95%' stopColor={colorMap[k]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid stroke='none' />
          <XAxis dataKey='month' tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke='none' />

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} iconType="circle" />

          {seriesKeys.map((k) => (
            <Area
              key={k}
              type='monotone'
              dataKey={k}           // <-- series per symbol
              name={k}              // Legend label
              fill={`url(#grad-${k})`}
              stroke={colorMap[k]}
              strokeWidth={3}
              dot={{ r: 3 }}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
