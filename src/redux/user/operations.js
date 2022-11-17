import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, publicApi, setToken } from '../../http/http';

export const userOperation = createAsyncThunk('user/curent', async (_, { getState, dispatch, rejectWithValue }) => {
    const accessToken = getState().auth.accessToken;
    const userData = getState().user.userData;

    if (!accessToken) {
        return rejectWithValue();
    }

    setToken(accessToken);

    const { data } = await privateApi.get('/user');

    const isUserDataFilled = userData.weight && userData.height && userData.age && userData.bloodType;
    if (!userData.dailyRate && isUserDataFilled) {
        dispatch(userDailyRateOperation(userData));
    }

    return data;
});

export const dailyRateOperation = createAsyncThunk('user/daily-rate', async (body) => {
    const { data } = await publicApi.post('/daily-rate', body);
    return data;
});

export const userDailyRateOperation = createAsyncThunk(
    'user/user-daily-rate',
    async (body, { getState, rejectWithValue }) => {
        const userId = getState().user.data?.sid;

        if (!userId) {
            return rejectWithValue();
        }

        const { data } = await privateApi.post('/daily-rate/' + userId, body);
        return data;
    }
);
