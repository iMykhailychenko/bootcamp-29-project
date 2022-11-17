import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, publicApi, setToken } from '../../http/http';

export const loginOperation = createAsyncThunk('auth/login', async (body) => {
    const { data } = await publicApi.post('/auth/login', body);

    setToken(data.accessToken);
    return data;
});

export const logoutOperation = createAsyncThunk('auth/logout', async () => {
    privateApi.post('/auth/logout');
});
