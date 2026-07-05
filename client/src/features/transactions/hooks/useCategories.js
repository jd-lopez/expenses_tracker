import { categoryService } from "../api/categoryService";
import { useState, useEffect } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      setError(error.response?.data.message || error.message);
    }
  }

  async function createCategory(data) {
    try {
      const category = await categoryService.createCategory(data);
      setCategories((prev) => [...prev, category]);
      setError(null);
      return category;
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setError(msg);
      throw error;
    }
  }

  return { categories, error, loadCategories, createCategory };
}
