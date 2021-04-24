import baseApi from "./base-api";
import { ENDPOINTS } from "../../_constants/endpoints";

export const getListWallets = async() => {
    return baseApi.get(`${ENDPOINTS.GET_WALLETS}`);
};

export const submitWallet = async(data, address) => {
    if (address) {
        return baseApi.put(`${ENDPOINTS.SUBMIT_WALLET}`, data);
    }
    return baseApi.post(`${ENDPOINTS.SUBMIT_WALLET}`, data);
}
export const deleteWallet = async(data) => {
    return baseApi.delete(`${ENDPOINTS.DELETE_WALLET}`, data);
}