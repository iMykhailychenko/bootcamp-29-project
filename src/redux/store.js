import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { authReducer } from './auth/slice';
import { userReducer } from './user/slice';
import { dayReducer } from './day/slice';

export const store = configureStore({
    preloadedState: {},
    reducer: {
        auth: authReducer,
        user: userReducer,
        day: dayReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
