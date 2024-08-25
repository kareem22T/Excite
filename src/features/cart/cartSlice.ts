import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Api';

interface CartProductDetail {
    url: string;
    id: number;
    title: string;
    images: { id: number; original: string }[];
    price: {
        currency: string;
        excl_tax: number;
        incl_tax: number;
        tax: number;
    };
    stock: number;
    slug: string;
    brand_name: string;
}

interface CartLine {
    id: number;
    product: string;
    quantity: number;
    product_detail: CartProductDetail;
}

interface Cart {
    id: number;
    status: string;
    total_excl_tax: number;
    total_incl_tax: number;
    total_tax: number;
    currency: string;
    num_items: number;
    num_lines: number;
    lines: CartLine[];
}

interface CartState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
    errorMsg: string | null;
    cart: Cart | null;
    error: string | null;
}

// Initial state
const initialState: CartState = {
    status: 'idle',
    message: null,
    errorMsg: null,
    cart: null,
    error: null,
};

// Async thunk for adding a product to the cart
export const addProductToCart = createAsyncThunk<
    string,
    { url: number; quantity: number; callback?: () => void },
    { rejectValue: string }
>(
    'cart/addProductToCart',
    async ({ url, quantity, callback }, thunkAPI) => {
        try {
            const response = await api.post('https://excite.techno-era.co/en/api/oscar/basket/add-product/', {
                url,
                quantity,
            });
            thunkAPI.dispatch(fetchCartDetails()); // Fetch updated cart details
            if (callback) callback(); // Invoke the callback if provided
            return response.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add product to cart');
        }
    }
);

// Async thunk for fetching cart details
export const fetchCartDetails = createAsyncThunk<
    Cart,
    void,
    { rejectValue: string }
>(
    'cart/fetchCartDetails',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('https://excite.techno-era.co/en/api/oscar/baskets/');
            return response.data.data[0]; // Assuming only one active cart exists
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch cart details');
        }
    }
);

// Async thunk for fetching cart product details
export const fetchCartProductDetails = createAsyncThunk<
    CartLine[],
    { cartId: number },
    { rejectValue: string }
>(
    'cart/fetchCartProductDetails',
    async ({ cartId }, thunkAPI) => {
        try {
            const response = await api.get(`https://excite.techno-era.co/en/api/oscar/baskets/${cartId}/lines/`);
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch cart product details');
        }
    }
);

// Async thunk for removing a product from the cart
export const removeProductFromCart = createAsyncThunk<
    string,
    { cartId: number; itemId: number; callback?: () => void },
    { rejectValue: string }
>(
    'cart/removeProductFromCart',
    async ({ cartId, itemId, callback }, thunkAPI) => {
        try {
            const response = await api.delete(`https://excite.techno-era.co/en/api/oscar/baskets/${cartId}/lines/${itemId}/`);
            thunkAPI.dispatch(fetchCartDetails()); // Fetch updated cart details
            thunkAPI.dispatch(fetchCartProductDetails({cartId: cartId})); // Fetch updated cart details
            if (callback) callback(); // Invoke the callback if provided
            return response.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to remove product from cart');
        }
    }
);

// Async thunk for removing a product from the cart
export const updateProductQuantity = createAsyncThunk<
    string,
    { cartId: number;quantity: number; itemId: number; callback?: () => void },
    { rejectValue: string }
>(
    'cart/updateProductQuantity',
    async ({ cartId, itemId, quantity, callback }, thunkAPI) => {
        try {
            const response = await api.patch(`https://excite.techno-era.co/en/api/oscar/baskets/${cartId}/lines/${itemId}/`, {
                quantity: quantity
            });
            thunkAPI.dispatch(fetchCartProductDetails({cartId})); // Fetch updated cart details
            if (callback) callback(); // Invoke the callback if provided
            return response.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to remove product from cart');
        }
    }
);

// Create the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCartMessages: (state) => {
            state.message = null;
            state.errorMsg = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductToCart.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.message = action.payload;
                state.errorMsg = null;
            })
            .addCase(addProductToCart.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.errorMsg = action.payload || 'Failed to add product to cart';
            })
            .addCase(fetchCartDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartDetails.fulfilled, (state, action: PayloadAction<Cart>) => {
                state.status = 'succeeded';
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(fetchCartDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch cart details';
                state.cart = null;
            })
            .addCase(fetchCartProductDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartProductDetails.fulfilled, (state, action: PayloadAction<CartLine[]>) => {
                if (state.cart) {
                    state.cart.lines = action.payload;
                }
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchCartProductDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch cart product details';
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeProductFromCart.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.message = action.payload;
                state.errorMsg = null;
            })
            .addCase(removeProductFromCart.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.errorMsg = action.payload || 'Failed to edit product from cart';
            })
            .addCase(updateProductQuantity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductQuantity.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.message = action.payload;
                state.errorMsg = null;
            })
            .addCase(updateProductQuantity.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.errorMsg = action.payload || 'Failed to edit product at cart';
            });
    },
});

// Export the reducer and actions
export const { clearCartMessages } = cartSlice.actions;
export default cartSlice.reducer;
