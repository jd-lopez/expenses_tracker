import { categoryService } from "../api/categoryService";
import { useState, useEffect } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories(params) {
    try {
      setError(null);

      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      setError(error.response?.data.message || error.message);
    }
  }

  return { categories, error, loadCategories };
}
