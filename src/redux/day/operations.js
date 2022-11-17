import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi } from '../../http/http';

export const addProductOperation = createAsyncThunk('day/add-product', async (body, { getState }) => {
    const date = getState().day.date;

    const { data } = await privateApi.post('/day', { ...body, date });

    return data;
});

export const changeDayOperation = createAsyncThunk('user/change-day', async (date) => {
    const { data } = await privateApi.post('/day/info', { date });

    return data.id ? data : { id: null, eatenProducts: [], date, daySummary: null };
});

export const deleteProductOperation = createAsyncThunk('day/delete-product', async (eatenProductId, { getState }) => {
    const dayId = getState().day._id;

    const { data } = await privateApi.delete('/day', { data: { eatenProductId, dayId } });

    return data;
});
