import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addProductApi,
  deleteProductApi,
  editProductApi,
  fetchProductsApi,
} from "./productApi";
import type { AxiosError } from "axios";
import { addProductPayload, Product2 } from "../../types/products";

//fetch products
export const fetchProductsThunk = createAsyncThunk<
  Product2[],
  void,
  { rejectValue: string }
>("products/all", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchProductsApi();
    return res.data.products;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch product",
    );
  }
});

//add products
export const addProductsThunk = createAsyncThunk<
  { message: string; newProduct: Product2 },
  addProductPayload,
  { rejectValue: string }
>("products/add", async (addProductPayload, { rejectWithValue }) => {
  try {
    const res = await addProductApi(addProductPayload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Failed to add product",
    );
  }
});

//edit products
export const editProductsThunk = createAsyncThunk<
  { message: string; updatedProduct: Product2 },
  { productId: string; productData: addProductPayload },
  { rejectValue: string }
>("products/edit", async ({ productId, productData }, { rejectWithValue }) => {
  try {
    const res = await editProductApi(productId, productData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Failed to edit product",
    );
  }
});

//edit products
export const deleteProductsThunk = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>("products/delete", async (productId, { rejectWithValue }) => {
  try {
    const res = await deleteProductApi(productId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete product",
    );
  }
});
