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
};
