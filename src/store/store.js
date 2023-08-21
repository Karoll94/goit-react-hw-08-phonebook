import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);


const store = configureStore({
  reducer: {
    store: persistedContactsReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };