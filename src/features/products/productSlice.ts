import { createSlice } from "@reduxjs/toolkit";
import {
  addProductsThunk,
  deleteProductsThunk,
  editProductsThunk,
  fetchProductsThunk,
} from "./productThunk";
import { Product2 } from "../../types/products";

type ProductState = {
  loading: boolean;
  error: null | string | undefined;
  message: string;
  success: boolean;
  deleteSuccess: boolean;
  deleteError: null | string | undefined;
  deleteLoading: boolean;
  products: Product2[];
};

const initialState: ProductState = {
  error: null,
  loading: false,
  message: "",
  success: false,
  deleteSuccess: false,
  deleteError: null,
  deleteLoading: false,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductSlice: (state) => {
      state.message = "";
      state.error = null;
      state.success = false;
      state.loading = false;
      state.deleteError = null;
      state.deleteLoading = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add product
      .addCase(addProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.products.push(action.payload.newProduct);
      })
      .addCase(addProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //edit product
      .addCase(editProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.products = state.products.map((product) =>
          product._id === action.payload.updatedProduct._id
            ? action.payload.updatedProduct
            : product,
        );
      })
      .addCase(editProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete product
      .addCase(deleteProductsThunk.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProductsThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.message = action.payload.message;
        state.products = state.products.filter(
          (product) => product._id !== action.meta.arg,
        );
      })
      .addCase(deleteProductsThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
      });
  },
});

export const { resetProductSlice } = productSlice.actions;
export default productSlice.reducer;
