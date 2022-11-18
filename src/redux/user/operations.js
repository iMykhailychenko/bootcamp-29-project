import { createAsyncThunk } from '@reduxjs/toolkit';
import { omit } from 'lodash';
import { privateApi, publicApi, setToken } from '../../http/http';

export const userOperation = createAsyncThunk('user/curent', async (_, { getState, dispatch, rejectWithValue }) => {
    const accessToken = getState().auth.accessToken;

    if (!accessToken) {
        return rejectWithValue();
    }

    setToken(accessToken);
    const { data } = await privateApi.get('/user');

    return data;
});

export const dailyRateOperation = createAsyncThunk('user/daily-rate', async (body) => {
    const { data } = await publicApi.post('/daily-rate', omit(body, 'dailyRate', 'notAllowedProducts'));
    return data;
});

export const userDailyRateOperation = createAsyncThunk('user/user-daily-rate', async ({ userData, sid }) => {
    const { data } = await privateApi.post('/daily-rate/' + sid, omit(userData, 'dailyRate', 'notAllowedProducts'));
    return data;
});
