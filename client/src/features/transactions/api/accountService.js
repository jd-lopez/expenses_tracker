import api from "../../../shared/utils/api";

export const accountService = {
  async getAll() {
    const response = await api.get("/accounts");
    return response.data;
  },

  async createAccount(accountData) {
    const response = await api.post("/accounts", accountData);
    return response.data;
  },

  async deleteAccount(id) {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  },
};
