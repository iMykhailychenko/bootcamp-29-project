import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, publicApi, setToken } from '../../http/http';
import { userDailyRateOperation } from '../user/operations';

export const loginOperation = createAsyncThunk('auth/login', async (body, { getState, dispatch }) => {
    const userData = getState().user.userData;

    const { data } = await publicApi.post('/auth/login', body);

    setToken(data.accessToken);

    const isUserDataFilled = userData.weight && userData.height && userData.age && userData.bloodType;
    if (!data.dailyRate && isUserDataFilled) {
        dispatch(userDailyRateOperation({ userData, sid: data.user.id }));
    }

    return data;
});

export const logoutOperation = createAsyncThunk('auth/logout', async () => {
    privateApi.post('/auth/logout');
});
