import apiClient from "../../services/axiosInstance";
import { addProductPayload } from "../../types/products";

//fetch product
export const fetchProductsApi = () => {
  return apiClient.get("/products");
};

//add product
export const addProductApi = (productData: addProductPayload) => {
  return apiClient.post("/products/add", productData);
};

//add product
export const editProductApi = (
  productId: string,
  productData: addProductPayload,
) => {
  return apiClient.patch(`/products/edit/${productId}`, productData);
};

//delete product
export const deleteProductApi = (productId: string) => {
  return apiClient.delete(`/products/delete/${productId}`);
};
