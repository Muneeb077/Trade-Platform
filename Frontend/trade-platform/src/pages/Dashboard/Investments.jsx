import React from 'react'
import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { useUserAuth } from '../../hooks/useUserAuth';
import AddStockForm from '../../components/Investment/AddStockForm';
import SellStockForm from '../../components/Investment/SellStockForm';
import toast from 'react-hot-toast';
import InvestmentOverview from '../../components/Investment/InvestmentOverview';
import SellList from '../../components/Investment/SellList';
import BuyList from '../../components/Investment/BuyList';
import Modal from '../../components/Modal';

const Investments = () => {
    useUserAuth();
    const [transactions, setTransactions] = useState([]);   // <-- array, safe for .map
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [OpenBuyInvestmentModel, setOpenBuyInvestmentModel] = useState(false);
    const [OpenSellInvestmentModel, setOpenSellInvestmentModel] = useState(false);
  
    const fetchInvestmentDetail = async () => {
        if (loading) return;

        setLoading(true);

        try{
            const url = `${API_PATHS.INVESTMENT.GET_STOCK_INFO}?includeTransactions=true`;
            const response = await axiosInstance.get(url);
            if (response.data){
                setTransactions(response.data.transactions ?? []);
                setHoldings(response.data.holdings ?? []);
            }
        } catch (error){
            console.log("Something went wrong. Please try again", error)
            setTransactions([]); // fail-safe so .map doesn’t explode
            setHoldings([]);
        } finally{
            setLoading(false)
        }
    }
  
    const handleBuyStocks = async (stock) => {
        const {symbol, numOfStocks} = stock;

        if (!symbol) {
            toast.error("Symbol is required")
            return
        }
        
        if (!numOfStocks || isNaN(numOfStocks) || Number(numOfStocks)<=0){
            toast.error('Number of Stocks should be a valid number greater than 0.')
            return
        }

        try{
            await axiosInstance.post(API_PATHS.INVESTMENT.BUYSTOCK,{
                symbol,
                numOfStocks,
            });
            setOpenBuyInvestmentModel(false)
            toast.success("Stocks bought Successfully")
            fetchInvestmentDetail();
        } catch(error){
            console.error("Error buying stocks",
            error.response?.data?.message || error.message)
        }
    }

    const handleSellStocks = async (stock) => {
        const {symbol, numOfStocks} = stock;

        if (!symbol) {
            toast.error("Symbol is required")
            return
        }
        
        if (!numOfStocks || isNaN(numOfStocks) || Number(numOfStocks)<=0){
            toast.error('Number of Stocks should be a valid number greater than 0.')
            return
        }

        try{
            await axiosInstance.post(API_PATHS.INVESTMENT.SELLSTOCK,{
                symbol,
                numOfStocks,
            });
            setOpenSellInvestmentModel(false)
            toast.success("Stocks sold Successfully")
            fetchInvestmentDetail();
        } catch(error){
            console.error("Error selling stocks",
            error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        fetchInvestmentDetail()
        return () => {}
    },[])

    return(
    <DashboardLayout activeMenu='Investment'>
        <div className='my-5 mx-auto'>
            <div className='grid grid-cols-1 gap-6'>
                <div className=''>
                    <InvestmentOverview
                        investments={transactions}
                        holdings={holdings}
                        onBuyStock = {() => setOpenBuyInvestmentModel(true)}
                        onSellStock = {() => setOpenSellInvestmentModel(true)}
                        loading={loading}
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-6'>
                <BuyList
                    investmentData={transactions}
                />
                <SellList
                    investmentData={transactions}
                />
            </div>
            <Modal
                isOpen={OpenBuyInvestmentModel}
                onClose={() => setOpenBuyInvestmentModel(false)}
                title='Buy Stock'
            >
                <AddStockForm onBuyStock={handleBuyStocks}/>
            </Modal>
            <Modal
            isOpen={OpenSellInvestmentModel}
                onClose={() => setOpenSellInvestmentModel(false)}
                title='Sell Stock'
            >
                <SellStockForm onSellStock={handleSellStocks}/> 
            </Modal>
        </div>
    </DashboardLayout>
  )
}



export default Investments