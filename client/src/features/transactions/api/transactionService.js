import api from "../../../shared/utils/api";

export const transactionService = {
  async getPage({ page = 1, limit = 10, search = "" } = {}) {
    const response = await api.get("/transactions", {
      params: { page, limit, ...(search ? { search } : {}) },
    });
    return response.data;
  },

  async getHistory() {
    const response = await api.get("/transactions/history");
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
