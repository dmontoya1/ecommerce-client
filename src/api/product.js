import {API_URL} from '../utils/constants';

export async function getProductsApi(limit = 1000) {
  try {
    const url = `${API_URL}/products?_sort=created_at:desc&_limit=${limit}`;
    const response = await fetch(url);
    const result = await response.json()
    return result;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function getProductsCategory(category) {
  try {
    const url = `${API_URL}/products?_where[category.slug]=${category}&_sort=created_at:desc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}