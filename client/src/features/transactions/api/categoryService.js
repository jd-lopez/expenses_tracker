import api from "../../../shared/utils/api";

export const categoryService = {
  async getAllCategories() {
    const response = await api.get("/categories");
    return response.data;
  },
};
