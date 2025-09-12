import React, { useEffect, useState } from 'react'
import {useUserAuth} from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {addThousandSeparator} from '../../utils/helper'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import InfoCard from '../../components/Cards/InfoCard';
import StockList from '../../components/Dashboard/StockList';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DASHBOARD_INFO}`);

      if (response.data) {
        console.log('Dashboard Data:', response.data);
        setDashboardData(response.data);
      }
    }catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false)
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
    return () => {}
  }, [])

  return (
    <DashboardLayout>
      <div className = 'my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6' >
            <InfoCard
            icon={<LuWalletMinimal/>}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-slate-600"
            />

            <InfoCard
            icon={<LuHandCoins/>}
            label="Investments"
            value={addThousandSeparator(dashboardData?.Investments || 0)}
            color="bg-sky-600"
            />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <StockList dashboardStockList={dashboardData?.dashboardStockList || []} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home