import api from "../../../shared/utils/api.js";

export const transactionService = {
  async getAll() {
    const response = await api.get("/transactions");
    return response.data;
  },

  async createTransaction(transactionData) {
    const response = await api.get("/transations", transactionData);
    return response.data;
  },
};
