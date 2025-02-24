import { get } from "./index";

const ORDER_API_BASE = "/orders"; // Assuming this is the base route

export const getTotalOrders = async () => {
    return get(`${ORDER_API_BASE}/total-orders`);
};

export const getRecentOrders = async () => {
    return get(`${ORDER_API_BASE}/recent-orders`)
}

export const getTotalSales = async () => {
    return get(`${ORDER_API_BASE}/total-sales`);
};

export const getSalesGraph = async (filter) => {
    return get(`${ORDER_API_BASE}/sales-graph?filter=${filter}`);
};
