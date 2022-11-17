import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Status } from '../../config/status';
import { userOperation } from '../user/operations';
import { addProductOperation, changeDayOperation, deleteProductOperation } from './operations';

const initialState = {
    status: Status.init,
    id: null,
    eatenProducts: [],
    date: dayjs().format('YYYY-MM-DD'),
    daySummary: null,
};

const daySlice = createSlice({
    name: 'day',
    initialState,
    extraReducers: {
        [addProductOperation.pending]: (state) => {
            state.status = Status.loading;
        },
        [addProductOperation.fulfilled]: (_, { payload }) => {
            return { ...payload.day, status: Status.success };
        },
        [addProductOperation.rejected]: (state) => {
            state.status = Status.error;
        },

        [userOperation.fulfilled]: (state, { payload }) => {
            return { ...payload.days[0], status: Status.success };
        },

        [changeDayOperation.pending]: (state) => {
            state.status = Status.loading;
        },
        [changeDayOperation.fulfilled]: (_, { payload }) => {
            return { ...payload, status: Status.success };
        },
        [changeDayOperation.rejected]: (state) => {
            state.status = Status.error;
        },

        [deleteProductOperation.fulfilled]: (state, { meta }) => {
            const productId = meta.arg;

            state.eatenProducts = state.eatenProducts.filter(({ id }) => id !== productId);
        },
    },
});

export const dayReducer = daySlice.reducer;
