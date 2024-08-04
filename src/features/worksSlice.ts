import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../_env';

// Define the Work interface
interface Work {
  photo_path: string;
  title: string;
  description: string;
}

// Define the metadata interface
interface MetaData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

// Define the state interface
interface WorksState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  works: Work[];
  error: string | null;
  metaData: MetaData | null;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

// Initial state
const initialState: WorksState = {
  status: 'idle',
  works: [],
  error: null,
  metaData: null,
  pageSize: 10, // Initial page size
  pageNumber: 1, // Initial page number
  totalPages: 1, // Initial page number
};

// Async thunk for fetching works
export const fetchWorks = createAsyncThunk<
  { data: { last_page: number, current_page: number, data: Work[], metaData: MetaData} },
  { page: number, pageSize: number },
  { rejectValue: string }
>(
  'works/fetchWorks',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const response = await axios.get<{ data: {last_page: number, current_page: number, data: Work[], metaData: MetaData } }>(
        `${API_URL}/api/works/get?page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch works');
    }
  }
);

// Create the slice
const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorks.fulfilled, (state, action: PayloadAction<{ data: {last_page: number, current_page: number, data: Work[], metaData: MetaData } }>) => {
        state.status = 'succeeded';
        state.works = action.payload.data.data;
        state.totalPages = action.payload.data.last_page; // Access the inner array
        state.pageNumber = action.payload.data.current_page; // Access the inner array
      })
      .addCase(fetchWorks.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch works';
      });
  },
});

// Export the actions and reducer
export const { setPageSize, setPageNumber } = worksSlice.actions;
export default worksSlice.reducer;
