import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { fetchContacts, addContact, deleteContact } from "./operations";

const handlePending = state => {
    state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
    state.contacts.isLoading = false;
    state.contacts.error = action.payload;
};

export const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        contacts: {
            items: [],
            isLoading: false,
            error: null
        }
    },
    extraReducers: {
        [fetchContacts.pending]: handlePending,
        [fetchContacts.fulfilled](state, action) {
            state.contacts.isLoading = false;
            state.contacts.error = null;
            state.contacts.items = action.payload;
        },
        [fetchContacts.rejected]: handleRejected,
        [addContact.pending]: handlePending,
        [addContact.fulfilled](state, action) {
            state.contacts.isLoading = false;
            state.contacts.error = null;
            state.contacts.items.splice(0, 0, action.payload);
        }, prepare(name, phone) {
            return {
                payload: {
                    name,
                    phone,
                },
            };
        },
        [addContact.rejected]: handleRejected,
        [deleteContact.pending]: handlePending,
        [deleteContact.fulfilled](state, action) {
            state.contacts.isLoading = false;
            state.contacts.error = null;
            const index = state.items.findIndex(task => task.id === action.payload);
            state.contacts.items.splice(index, 1);
        },
        [deleteContact.rejected]: handleRejected,
    },
});

const persistConfig = {
    key: 'tel',
    storage,
}

export const persistContactsReducer = persistReducer(persistConfig, contactSlice.reducer)
// export const { addContact, deleteContact } = contactSlice.actions;