export const BASE_URL = 'http://localhost:4001'

export const API_PATHS = {
    AUTH:{
        LOGIN: "/api/v1/auth/login",
        GOOGLE_LOGIN: '/api/v1/auth/google',
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD:{
        GET_DASHBOARD_INFO: "/api/v1/dashboard/"
    },
    INVESTMENT:{
        BUYSTOCK:'/api/v1/investments/buyStock',
        SELLSTOCK:'/api/v1/investments/sellStock',
        GET_STOCK_INFO:'/api/v1/investments/getStockInfo',
    },
}