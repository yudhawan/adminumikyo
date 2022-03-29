import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
var token ='dasdas'
export const getSellers = createAsyncThunk("sellers/getSellers", async () => {
    const response = await fetch('https://beautyshop.yashacode.com/users/getusers');
    const result = await response.json();
    return result;
});

export const changeActiveSeller = createAsyncThunk("sellers/changeActiveSeller", async (data) => {
    const response = await fetch('https://beautyshop.yashacode.com/users/changeactive', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({email: data.email, verification: data.verification})
    });
    const result = await response.json();
    return result;
});
export const acceptSeller = createAsyncThunk("sellers/acceptSeller", async (data) => {
    const response = await fetch('https://beautyshop.yashacode.com/users/accept_user', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id: data.id,status:data.status})
    });
    const result = await response.json();
    return result;
});
export const deleteSellers = createAsyncThunk("sellers/deleteSellers", async (id) => {
    const response = await fetch('https://beautyshop.yashacode.com/users/delete', {
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