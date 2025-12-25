import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface DashboardStats {
    totalProjects: number;
    totalBlogs: number;
    totalContacts: number;
    // Add other fields if returned by API
    [key: string]: any;
}

interface DashboardState {
    stats: DashboardStats | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: DashboardState = {
    stats: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

// Fetch dashboard stats
export const getDashboardStats = createAsyncThunk(
    "dashboard/getStats",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/dashboard/stats");
            return response.data;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stats = action.payload;
            })
            .addCase(getDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
