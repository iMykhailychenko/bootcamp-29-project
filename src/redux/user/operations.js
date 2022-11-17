import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, setToken } from '../../http/http';

export const userOperation = createAsyncThunk('user/curent', async (_, { getState, rejectWithValue }) => {
    const accessToken = getState().auth.accessToken;

    if (!accessToken) {
        return rejectWithValue();
    }

    setToken(accessToken);

    const { data } = await privateApi.get('/user');
    return data;
});

export const userDailyRateOperation = createAsyncThunk(
    'user/daily-rate',
    async (body, { getState, rejectWithValue }) => {
        const userId = getState().user.data?.sid;

        if (!userId) {
            return rejectWithValue();
        }

        const { data } = await privateApi.post('/daily-rate/' + userId, body);
        return data;
    }
);
