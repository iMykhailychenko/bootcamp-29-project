import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../config/status';
import { loginOperation } from '../auth/operations';
import { userDailyRateOperation, userOperation } from './operations';

const initialState = {
    status: Status.init,
    data: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [loginOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.success;
            state.data = payload.user;
        },

        [userOperation.pending]: (state) => {
            state.status = Status.loading;
        },
        [userOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.success;

            state.data = {
                email: payload.email,
                sid: payload.id,
                userData: payload.userData,
                username: payload.username,
            };

            state.data.email = payload.email;
            state.data.sid = payload.id;
            state.data.userData = payload.userData;
            state.data.username = payload.username;
        },

        [userDailyRateOperation.pending]: (state, { meta }) => {
            state.status = Status.loading;

            state.data.userData = meta.arg
        },
        [userDailyRateOperation.fulfilled]: (state, { payload }) => {
            state.status = Status.loading;

            state.data.userData.dailyRate = payload.dailyRate;
            state.data.userData.notAllowedProducts = payload.notAllowedProducts;
        },
    },
});

export const userReducer = userSlice.reducer;
