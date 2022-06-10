import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// https://beautyshop.yashacode.com
export const getProducts = createAsyncThunk("products/getProducts", async()=>{
    const response = await fetch("https://beautyshop.yashacode.com/products")
    const result = await response.json()
    return result
})

export const addProducts = createAsyncThunk("products/addProducts", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    let formdata = new FormData()
    for (let i = 0; i < data.images.length; i++) {
        formdata.append('images', data.images[i])
    }
    formdata.append('product', JSON.stringify(data.product))
    await axios({
        method:"POST",
        url:"https://beautyshop.yashacode.com/products",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:formdata
    })
    dispatch(getProducts())
})

export const deleteProducts = createAsyncThunk("products/deleteProducts", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    await axios({
        method:"DELETE",
        url:"https://beautyshop.yashacode.com/products",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:{id:data} 
    })
    dispatch(getProducts())
})

export const updateProduct = createAsyncThunk("products/updateProduct", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    let formdata = new FormData()
    for (let i = 0; i < data.images.length; i++) {
        formdata.append('images', data.images[i])
    }
    formdata.append('product', JSON.stringify(data.product))
    await axios({
        method:"PUT",
        url:"https://beautyshop.yashacode.com/products",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:formdata
    })
    dispatch(getProducts())
})

const productsSlice = createSlice({
    name:"products",
    initialState: {
        products: [],
        productsLoading: false,
        productsError: null,
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.productsLoading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            state.productsLoading = false
            state.products = action.payload
        },
        [getProducts.rejected]: (state, action) => {
            state.productsLoading = false
            state.productsError = action.payload
        },
        [addProducts.pending]: (state, action) => {
            state.productsLoading = true
        },
        [addProducts.fulfilled]: (state, action) => {
            state.productsLoading = false
            state.products = action.payload
        },
        [addProducts.rejected]: (state, action) => {
            state.productsLoading = false
            state.productsError = action.payload
        },
        [deleteProducts.pending]: (state, action) => {
            state.productsLoading = true
        },
        [deleteProducts.fulfilled]: (state, action) => {
            state.productsLoading = false
            state.products = action.payload
        },
        [deleteProducts.rejected]: (state, action) => {
            state.productsLoading = false
            state.productsError = action.payload
        }
    },
})

export default productsSlice.reducer;