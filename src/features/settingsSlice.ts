import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { API_URL } from '../_env';


// Initial State
interface SettingsState {
    showNav: boolean,
    settings: SettingsType | null
}

const initialState: SettingsState = {
    showNav: false,
    settings: null
};

interface SettingsType {
    hero_title: string | null;
    hero_img: string | null;
    third_bg: string | null;
    video_main: string | null;
    third_bg_work: string | null;
    third_bg_services: string | null;
    third_bg_about: string | null;
    logo_main: string | null;
    footer: string | null;
    portfolio_pdf: string | null;
    profile_pdf: string | null;
    our_services: string | null;
    our_work: string | null;
    about_us: string | null;
    contact_us: string | null;
    about_us_main: string | null;
    about_us_large: string | null;
    about_us_first: string | null;
    about_us_second: string | null;
    about_us_bg: string | null;
    video: string | null;
    hero_sub_title: string | null;
    establishment_span: string | null;
    establishment_title: string | null;
    establishment_description: string | null;
    establishment_date: string | null;
    preview_title: string | null;
    preview_title2: string | null;
    sponsor_description: string | null;
    footer_description: string | null;
    x_url: string | null;
    tiktok_url: string | null;
    instagram_url: string | null;
    whatsapp_url: string | null;
    phone: string | null;
    address: string | null;
    email: string | null;
    who_trio: string | null;
    our_principle_1: string | null;
    our_principle_2: string | null;
    our_principle_3: string | null;
}

type GetSettings = {
    status: boolean;
    message: string;
    errors: string[];
    data: SettingsType;
    notes: string[];
};


// Async Thunk for Fetching settings
export const getSettings = createAsyncThunk<GetSettings>(
    'services/getSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetSettings>(API_URL + '/api/settings/get');
            
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch services: ${error}`);
        }
    }
);

// Create Slice
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setShowNav: (state) => {
            state.showNav = !state.showNav;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSettings.fulfilled, (state, action: PayloadAction<GetSettings>) => {
            state.settings = action.payload.data
        });
    },
});
export const { setShowNav } = settingsSlice.actions;

export default settingsSlice.reducer;
