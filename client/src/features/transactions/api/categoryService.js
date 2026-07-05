import api from "../../../shared/utils/api";

export const categoryService = {
  async getAllCategories() {
    const response = await api.get("/categories");
    return response.data;
  },

  async createCategory(data) {
    const response = await api.post("/categories", data);
    return response.data;
  },
};
