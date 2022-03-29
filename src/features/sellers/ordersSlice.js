import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
    const response = await fetch("https://beautyshop.yashacode.com/order");
    const result = await response.json();
    return result;
});

export const invalidPayment = createAsyncThunk("orders/invalidPayment", async (invoice,{getState}) => {
    const currentToken = getState().auth.token;
    const response = await fetch("https://beautyshop.yashacode.com/order/invalidpayment", {
        method: "POST",
        headers: {
            'authorization': `Bearer ${currentToken}`,
        },
        body: JSON.stringify({invoice: invoice})
    });
    const result = await response.json();
    return result;
});

export const setDeliveryFee = createAsyncThunk("order/setDeliveryFee", async (data,{getState})=>{
    const currentToken = getState().auth.token
    const response = await fetch('https://beautyshop.yashacode.com/order/setongkir',{
        method: "POST",
        headers:{
            'authorization': `Bearer ${currentToken}`,
        },
        body: JSON.stringify({invoice:data.invoice, ongkir:data.ongkir})
    })
    const result = await response.json()
    return result
})

export const deleteOrders = createAsyncThunk("orders/deleteOrders", async (invoice,{getState}) => {
    const currentToken = getState().auth.token
    const response = await fetch('https://beautyshop.yashacode.com/order/deleteorder',{
        method: "POST",
        headers:{
            'authorization': `Bearer ${currentToken}`,
        },
        body: JSON.stringify({invoice:invoice})
    })
    const result = await response.json()
    return result
})

export const deliveryProccess = createAsyncThunk("order/deliveryProccess", async (data,{getState})=>{
    const currentToken = getState().auth.token
    const response = await fetch('https://beautyshop.yashacode.com/order/deliver',{
        method: "POST",
        headers:{
            'authorization': `Bearer ${currentToken}`,
        },
        body: JSON.stringify({invoice:data.invoice, resi:data.resi})
    })
    const result = await response.json()
    return result
})

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        ordersLoading: false,
        ordersError: null,
    },
    extraReducers: {
        [getOrders.pending]: (state, action) => {
            state.ordersLoading = true;
        },
        [getOrders.fulfilled]: (state, action) => {
            state.ordersLoading = false;
            state.orders = action.payload;
        },
        [getOrders.rejected]: (state, action) => {
            state.ordersLoading = false;
            state.ordersError = action.payload;
        },
        [invalidPayment.pending]: (state, action) => {
            state.ordersLoading = true;
        },
        [invalidPayment.fulfilled]: (state, action) => {
            state.ordersLoading = false;
            state.orders = action.payload;
        },
        [invalidPayment.rejected]: (state, action) => {
            state.ordersLoading = false;
            state.ordersError = action.payload;
        },
        [setDeliveryFee.pending]: (state, action) => {
            state.ordersLoading = true;
        },
        [setDeliveryFee.fulfilled]: (state, action) => {
            state.ordersLoading = false;
            state.orders = action.payload;
        },
        [setDeliveryFee.rejected]: (state, action) => {
            state.ordersLoading = false;
            state.ordersError = action.payload;
        },
        [deleteOrders.pending]: (state, action) => {
            state.ordersLoading = true;
        },
        [deleteOrders.fulfilled]: (state, action) => {
            state.ordersLoading = false;
            state.orders = action.payload;
        },
        [deleteOrders.rejected]: (state, action) => {
            state.ordersLoading = false;
            state.ordersError = action.payload;
        }
    }
});


export default ordersSlice.reducer;