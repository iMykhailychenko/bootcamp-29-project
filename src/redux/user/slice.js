import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Status } from '../../config/status';
import { loginOperation, logoutOperation } from '../auth/operations';
import { dailyRateOperation, userDailyRateOperation, userOperation } from './operations';

const initialState = {
    status: Status.init,
    data: null,
    userData: {
        weight: '',
        height: '',
        age: '',
        desiredWeight: '',
        bloodType: '',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [logoutOperation.fulfilled]: () => initialState,

        [loginOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.success;
            state.data = {
                email: payload.user.email,
                sid: payload.user.id,
                username: payload.user.username,
            };

            state.userData = payload.user.userData;
        },

        [userOperation.pending]: (state) => {
            state.status = Status.loading;
        },
        [userOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.success;

            state.data = {
                email: payload.email,
                sid: payload.id,
                username: payload.username,
            };

            state.userData = payload.userData;
        },

        [userDailyRateOperation.pending]: (state, { meta }) => {
            state.status = Status.loading;
            state.userData = meta.arg;
        },
        [userDailyRateOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.success;

            state.userData.dailyRate = payload.dailyRate;
            state.userData.notAllowedProducts = payload.notAllowedProducts;
        },

        [dailyRateOperation.pending]: (state, { meta }) => {
            state.status = Status.loading;
            state.userData = meta.arg;
        },
        [dailyRateOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.success;

            state.userData.dailyRate = payload.dailyRate;
            state.userData.notAllowedProducts = payload.notAllowedProducts;
        },
    },
});

const persistConfig = {
    key: 'bootcamp-29-user',
    version: 1,
    storage,
    whitelist: ['userData'],
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer);
