import axios from "axios";
import type { Product } from "../types/Product";

const API_URL = "https://dummyjson.com/products";

// Hämtar alla produkter
export async function getProducts() {
  const response = await axios.get<{ products: Product[] }>(API_URL);
  return response.data.products;
}

// Hämtar en produkt med id
export async function getProductById(id: string) {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
}

// Skapar en ny produkt
export async function createProduct(product: Omit<Product, "id">) {
  const response = await axios.post<Product>(`${API_URL}/add`, product);
  return response.data;
}

// Uppdaterar en produkt
export async function updateProduct(id: number, product: Partial<Product>) {
  const response = await axios.patch<Product>(`${API_URL}/${id}`, product);
  return response.data;
}

// Tar bort en produkt
export async function deleteProduct(id: number) {
  const response = await axios.delete<Product>(`${API_URL}/${id}`);
  return response.data;
}