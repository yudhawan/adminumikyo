import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import host from '../host'
export const getSellers = createAsyncThunk("sellers/getSellers", async () => {
    const response = await fetch(host+'/users/getusers');
    const result = await response.json();
    return result;
});

export const changeActiveSeller = createAsyncThunk("sellers/changeActiveSeller", async (data, {getState,dispatch}) => {
    const token = getState().auth.token;
    const response = await axios({
        method: 'POST',
        url:host+'/users/changeactive',
        headers: {
            'authorization': `Bearer ${token}`
        },
        data: {email: data.email, verification: data.verification}
    });
    dispatch(getSellers());
    return 
});
export const upgradeSeller = createAsyncThunk("sellers/upgradeSeller", async (data, {getState,dispatch}) => {
    const token = getState().auth.token;
    await axios({
        method: 'PUT',
        url:host+'/users/upgrade_user',
        headers: {
            'authorization': `Bearer ${token}`
        },
        data: data
    });
    dispatch(getSellers)
    window.location.replace('/sellers')
    return
});
export const acceptSeller = createAsyncThunk("sellers/acceptSeller", async (data,{getState}) => {
    const token = getState().auth.token;
    const response = await axios({
        method: 'POST',
        url:host+'/users/accept_user',
        headers: {
            'authorization': `Bearer ${token}`
        },
        data: {id: data.id,status:data.status}
    });
    return response.data;
});
export const deleteSellers = createAsyncThunk("sellers/deleteSellers", async (id,{getState}) => {
    const token = getState().auth.token;
    const response = await fetch(host+'/users/delete', {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id: id})
    });
    const result = await response.json();
    return result;
});

const sellersSlice = createSlice({
    name: "sellers",
    initialState: {
        sellers: [],
        sellersLoading: false,
        sellersError: null,
    },
    extraReducers: {
        [getSellers.pending]: (state, action) => {
            state.sellersLoading = true;
        },
        [getSellers.fulfilled]: (state, action) => {
            state.sellersLoading = false;
            state.sellers = action.payload;
        },
        [getSellers.rejected]: (state, action) => {
            state.sellersLoading = false;
            state.sellersError = action.payload;
        },
        [changeActiveSeller.pending]: (state, action) => {
            state.sellersLoading = true;
        },
        [changeActiveSeller.fulfilled]: (state, action) => {
            state.sellersLoading = false;
            state.sellers = action.payload;
        },
        [changeActiveSeller.rejected]: (state, action) => {
            state.sellersLoading = false;
            state.sellersError = action.payload;
        },
        [acceptSeller.pending]: (state, action) => {
            state.sellersLoading = true;
        },
        [acceptSeller.fulfilled]: (state, action) => {
            state.sellersLoading = false;
            state.sellers = action.payload;
        },
        [acceptSeller.rejected]: (state, action) => {
            state.sellersLoading = false;
            state.sellersError = action.payload;
        },
        [deleteSellers.pending]: (state, action) => {
            state.sellersLoading = true;
        },
        [deleteSellers.fulfilled]: (state, action) => {
            state.sellersLoading = false;
            state.sellers = action.payload;
        },
        [deleteSellers.rejected]: (state, action) => {
            state.sellersLoading = false;
            state.sellersError = action.payload;
        }
    },
});

export default sellersSlice.reducer;