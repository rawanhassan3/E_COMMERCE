import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBrands } from '@/services/products.service';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandState {
  items: Brand[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async () => {
    const brands = await getBrands();
    return brands;
  }
);

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch brands';
      });
  },
});

export default brandSlice.reducer;
