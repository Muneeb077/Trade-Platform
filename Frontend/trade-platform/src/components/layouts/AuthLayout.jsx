import React from 'react'
import IMG_1 from '../../assets/IMG_1.png'
import { LuTrendingUpDown } from 'react-icons/lu'


const AuthLayout = ({children}) => {
  return <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Trade Platform</h2>
            {children}
        </div>

        <div className='hidden md:block w-[50vw] h-screen bg-slate-950 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            
            <div className='w-48 h-48 rounded-[40px] border-[20px] border-green-600 absolute -top-7 -left-5' />
            <div className='w-48 h-56 rounded-[40px] border-[20px] border-green-700 absolute top-[10%] -right-10' />
            <div className='w-48 h-50 rounded-[40px] border-[20px] border-red-700 absolute -bottom-7 -right-10' />

            <img src={IMG_1} className='w-64 lg:w-[90%] absolute bottom-40 shadow-lg shadow-blue-400/15 rounded-[20px]' />
        </div>
    </div>;
};

export default AuthLayout;