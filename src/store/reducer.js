import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://connections-api.herokuapp.com';

// Operación fetchContacts (GET)
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, { getState }) => {
    const { token } = getState().store; // Obtén el token del estado de usuario
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Agrega el token de autorización en el encabezado
        },
    };

    try {
        const response = await axios.get(`${API_BASE_URL}/contacts`, config);
        return response.data;
    } catch (error) {

        throw error;
    }
});

console.log(fetchContacts);

// Operación addContact (POST)
export const addContact = createAsyncThunk('contacts/addContact', async (contactData, { getState }) => {
    const { token } = getState().store; // Obtén el token del estado de usuario

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Agrega el token de autorización en el encabezado
        },
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/contacts`, contactData, config);
        return response.data;
    } catch (error) {

        throw error;
    }
});

// Operación deleteContact (DELETE)
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, { getState }) => {
    const { token } = getState().store; // Obtén el token del estado de usuario

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Agrega el token de autorización en el encabezado
        },
    };

    try {
        await axios.delete(`${API_BASE_URL}/contacts/${contactId}`, config);
        return contactId;
    } catch (error) {

        throw error;
    }
});

// Operación Login (POST)
export const login = createAsyncThunk('users/login', async (userData) => {

    try {

        const response = await axios.post('`${API_BASE_URL}/users/login`', userData);
        console.log(response.data)
        return response.data;

    } catch (error) {

        throw error;
    }
});

export const register = createAsyncThunk('users/signup', async (userData) => {

    try {
        const response = await axios.post(`${API_BASE_URL}/users/signup`, userData);
        return response.data;
    } catch (error) {

        throw error;
    }
});
export const logout = createAsyncThunk('users/logout', async () => {

    try {
        return null
    } catch (error) {

        throw error;
    }
});


const storeSlice = createSlice({
    name: 'store',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        filter: '',
        token: null,
        user: null,
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter((contact) => contact.id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                // handle successful registration if needed
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.token = null;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilter, setUser, setToken } = storeSlice.actions;
export default storeSlice.reducer;
