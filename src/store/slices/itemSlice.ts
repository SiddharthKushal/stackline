import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/functions";

// Interface for individual reviews
interface Review {
  customer: string;
  review: string;
  score: number;
}

// Interface for sales data
export interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

// Interface for item details
export interface Item {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: String[];
  tags: String[];
  sales: Sale[];
}

// Interface for the state shape of items
interface ItemState {
  items: Item[];
  loading: boolean;
}

// Initial state setup for items and loading status
const initialState: ItemState = {
  items: [
    {
      id: "",
      title: "",
      image: "",
      subtitle: "",
      brand: "",
      reviews: [],
      retailer: "",
      details: [],
      tags: [],
      sales: [],
    },
  ],
  loading: false,
};

// Thunk for asynchronous data fetching of items
export const getItems = createAsyncThunk<Item[]>("getItems", async () => {
  const data = await fetchData();
  return data;
});

// Reducer setup for item data management
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handles state during data fetching
      .addCase(getItems.pending, (state) => {
        state.loading = true;
      })
      // Handles state when data is successfully fetched
      .addCase(getItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Handles state when data fetching fails
      .addCase(getItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default itemSlice.reducer;
