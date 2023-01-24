import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://63cd30ecd4d47898e3943041.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async () => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (_, thunkAPI) => {
        try {
            const response = await axios.post("/contacts");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);