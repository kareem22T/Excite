import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Api';

interface Image {
    id: number;
    code: string;
    original: string;
    caption: string;
    display_order: number;
    date_created: string;
}

interface ProductDetail {
    url: string;
    id: number;
    title: string;
    images: Image[];
    brand: number;
    product_class: string;
    price: {
        currency: string;
        excl_tax: number;
        incl_tax: number;
        tax: number;
    };
    stock: number;
    slug: string;
    brand_name: string;
    calculate_rating: number;
    num_approved_reviews: number;
    rating: number;
    has_options: boolean;
    in_wishlist: boolean;
}

interface Line {
    id: number;
    product: number;
    title: string;
    quantity: number;
    product_detail: ProductDetail;
}

interface Wishlist {
    id: number;
    name: string;
    lines: Line[];
}

interface WishlistState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
    errorMsg: string | null;
    wishlist: Wishlist | null;
    error: string | null;
}

// Initial state
const initialState: WishlistState = {
    status: 'idle',
    message: null,
    errorMsg: null,
    wishlist: null,
    error: null,
};

// Async thunk for fetching all wishlist items
export const fetchWishlist = createAsyncThunk<
    Wishlist,
    { callback?: () => void },
    { rejectValue: string }
>(
    'wishlist/fetchWishlist',
    async ({ callback }, thunkAPI) => {
        try {
            const response = await api.get('https://excite.techno-era.co/en/api/product/wish_list/');
            if (callback) callback(); // Invoke the callback if provided
            return response.data.data[0];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
        }
    }
);

// Async thunk for adding a product to the wishlist
export const addProductToWishlist = createAsyncThunk<
    string,
    { id: number; callback?: () => void },
    { rejectValue: string }
>(
    'wishlist/addProductToWishlist',
    async ({ id, callback }, thunkAPI) => {
        try {
            const response = await api.post('https://excite.techno-era.co/en/api/product/wish_list/', {
                product: id,
            });
            thunkAPI.dispatch(fetchWishlist({})); // Dispatch fetchWishlist to update wishlist
            if (callback) callback(); // Invoke the callback if provided
            return response.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add product to wishlist');
        }
    }
);

// Async thunk for removing a product from the wishlist
export const removeProductFromWishlist = createAsyncThunk<
    string,
    { id: number; callback?: () => void },
    { rejectValue: string }
>(
    'wishlist/removeProductFromWishlist',
    async ({ id, callback }, thunkAPI) => {
        try {
            const response = await api.post(`https://excite.techno-era.co/en/api/product/wish_line/${id}/`, {
                product: id,
            });
            thunkAPI.dispatch(fetchWishlist({})); // Dispatch fetchWishlist to update wishlist
            if (callback) callback(); // Invoke the callback if provided
            return response.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to remove product from wishlist');
        }
    }
);

// Create the slice
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.message = null;
            state.errorMsg = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<Wishlist>) => {
                state.status = 'succeeded';
                state.wishlist = action.payload;
                state.error = null; // Clear previous errors
            })
            .addCase(fetchWishlist.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch wishlist';
                state.wishlist = null; // Clear previous wishlist on failure
            })
            .addCase(addProductToWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductToWishlist.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.message = action.payload;
                state.errorMsg = null; // Clear previous errors
            })
            .addCase(addProductToWishlist.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.errorMsg = action.payload || 'Failed to add product to wishlist';
            })
            .addCase(removeProductFromWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeProductFromWishlist.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.message = action.payload;
                state.errorMsg = null; // Clear previous errors
            })
            .addCase(removeProductFromWishlist.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.errorMsg = action.payload || 'Failed to remove product from wishlist';
            });
    },
});

// Export the reducer and actions
export const { clearMessages } = wishlistSlice.actions;
export default wishlistSlice.reducer;
