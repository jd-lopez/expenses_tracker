import api from "../../../shared/utils/api";

export const transactionService = {
  async getAll() {
    const response = await api.get("/transactions");
    return response.data;
  },

  async createTransaction(transData) {
    const response = await api.post("/transactions", transData);
    return response.data;
  },

  async deleteTransaction(id) {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};
