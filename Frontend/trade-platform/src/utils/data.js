import {
    LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut,
} from "react-icons/lu"

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Investments",
        icon: LuWalletMinimal,
        path: "/investments",
    },
    {
        id: "03",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    }
];

