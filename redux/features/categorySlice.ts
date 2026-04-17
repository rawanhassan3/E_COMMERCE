import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '@/services/products.service';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface CategoryState {
  items: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const categories = await getCategories();
    return categories;
  }
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categorySlice.reducer;
