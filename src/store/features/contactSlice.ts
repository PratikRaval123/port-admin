import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { Contact } from "@/types/api";

interface ContactState {
    contacts: Contact[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: ContactState = {
    contacts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Get all contacts
export const getContacts = createAsyncThunk(
    "contacts/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/contacts");
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

// Delete contact
export const deleteContact = createAsyncThunk(
    "contacts/delete",
    async (id: string, thunkAPI) => {
        try {
            await api.delete(`/contacts/${id}`);
            return id;
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

export const contactSlice = createSlice({
    name: "contact",
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
            .addCase(getContacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.contacts = Array.isArray(action.payload) ? action.payload : action.payload.contacts || [];
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.contacts = state.contacts.filter(
                    (contact) => contact._id !== action.payload && contact.id !== action.payload
                );
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
