import React, {useContext} from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import {useNavigate} from "react-router-dom";
import { UserContext } from '../../context/create_context'


const SideMenu = ({activeMenu}) => {
    
    const {user, clearUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    }

    const handleLogout =() => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return <div className='w-64 h-[calc(100vh-61px)] bg-slate-800 p-5 sticky top-[61px] z-20'>
        <div className='flex flex-col items-center justify center gap-3 mt-3 mb-7'>
            <h5 className='text-white font-medium leading-6'>
                {user?.fullName || ""}
            </h5>
        </div>

        {SIDE_MENU_DATA.map((item, index) => (
            <button
            key={`menu_${index}`}
            className={`w-full text-white flex items-center gap-4 text-[15px] ${
                activeMenu == item.label ? "text-white bg-blue-600" : ""
            } py-3 px-6 rounded-lg mb-3`}
            onClick={() => handleClick(item.path)}
            >
            <item.icon className='text-xl' />
            {item.label}
            </button>
        ))}


    </div>
}

export default SideMenu