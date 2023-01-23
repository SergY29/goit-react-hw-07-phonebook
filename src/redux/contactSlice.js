import { createSlice, nanoid } from "@reduxjs/toolkit";
import data from '../components/Data/data.json'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactSlice = createSlice({
    name: "contacts",
    initialState: { contacts: data },
    reducers: {
        addContact: {
            reducer(state, action) {
                state.contacts.splice(0, 0, action.payload);
            }, prepare(name, number) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        number,
                    },
                };
            },
        },
        deleteContact(state, action) {
            const index = state.contacts.findIndex(task => task.id === action.payload);
            state.contacts.splice(index, 1);
        }

    }
});

const persistConfig = {
    key: 'tel',
    storage,
}

export const persistContactsReducer = persistReducer(persistConfig, contactSlice.reducer)
export const { addContact, deleteContact } = contactSlice.actions;

// Selectors
export const getContacts = state => state.contacts.contacts



