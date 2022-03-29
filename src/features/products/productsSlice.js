import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("products/getProducts", async()=>{
    const response = await fetch("https://beautyshop.yashacode.com/products")
    const result = await response.json()
    return result
})

export const addProducts = createAsyncThunk("products/addProducts", async(data,{getState})=>{
    const token = getState().auth.token
    let formdata = new FormData()
    for (let i = 0; i < data.images.length; i++) {
        formdata.append('images', data.images[i])
    }
    formdata.append('product', JSON.stringify(data.product))
    const response = await fetch("https://beautyshop.yashacode.com/products",{
        method:"POST",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify(formdata)
    })
    const result = await response.json()
    return result
})

export const deleteProducts = createAsyncThunk("products/deleteProducts", async(data,{getState})=>{
    const token = getState().auth.token
    const response = await fetch("https://beautyshop.yashacode.com/products",{
        method:"DELETE",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({products:data}) //data as array
    })
    const result = await response.json()
    return result
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