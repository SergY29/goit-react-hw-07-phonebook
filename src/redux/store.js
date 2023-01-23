import { configureStore } from "@reduxjs/toolkit";
import { persistContactsReducer } from "./contactSlice";
import { filterSlice } from "./filterSlice";
import { persistStore } from 'redux-persist';


export const store = configureStore({
    reducer: {
        contacts: persistContactsReducer,
        filter: filterSlice.reducer,
    }
});

export const persistor = persistStore(store)