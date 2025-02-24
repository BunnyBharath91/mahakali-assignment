import { get } from "./index";

const PRODUCT_API_BASE = "/products"; // Assuming this is the base route

export const getTotalProducts = async () => {
    return get(`${PRODUCT_API_BASE}/total-products`);
};

export const getTopProducts = async (filter) => {
    return get(`${PRODUCT_API_BASE}/top-products?filter=${filter}`);
};
