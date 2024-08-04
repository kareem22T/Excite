import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { API_URL } from '../_env';


type ServiceType = {
    id: number;
    photo_path: string;
    title: string;
    points: [
        {point: string}
    ];
};

type GetServiceRespons = {
    status: boolean;
    message: string;
    errors: string[];
    data: ServiceType[];
    notes: string[];
};

// Async Thunk for Fetching Services
export const getServices = createAsyncThunk<GetServiceRespons>(
    'services/getServices',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetServiceRespons>(API_URL + '/api/services/get');
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch services: ${error}`);
        }
    }
);
// Initial State
interface ServicesState {
    services: ServiceType[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    services: null,
    loading: false,
    error: null,
};

// Create Slice
const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getServices.fulfilled, (state, action: PayloadAction<GetServiceRespons>) => {
                state.loading = false;
                state.services = action.payload.data;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default servicesSlice.reducer;
