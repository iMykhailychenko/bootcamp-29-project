import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Status } from '../../config/status';
import { loginOperation } from './operations';

const initialState = {
    status: Status.init,
    accessToken: '',
    refreshToken: '',
    sid: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    extraReducers: {
        [loginOperation.pending]: (state) => {
            state.status = Status.loading;
        },
        [loginOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.success;

            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.sid = payload.sid;
        },
        [loginOperation.rejected]: (state) => {
            state.status = Status.error;

            state.accessToken = '';
            state.refreshToken = '';
            state.sid = '';
        },
    },
});

const persistConfig = {
    key: 'bootcamp-29',
    version: 1,
    storage,
    blacklist: ['status'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
