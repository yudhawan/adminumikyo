import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getBanners = createAsyncThunk("banners/getBanners", async(arg,{getState})=>{
    const token = getState().auth.token
    const response = await axios({
        method: 'GET',
        url:'https://beautyshop.yashacode.com/dashboard/banners',
        headers:{
            'authorization': `Bearer ${token}`
        }
    })
    return response.data
})

export const addBanners = createAsyncThunk("banners/addBanners", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    let formdata = new FormData()
    formdata.append('images', data.images)
    formdata.append('banner', JSON.stringify(data.banners))
    const response = await axios({
        method:"POST",
        url:"https://beautyshop.yashacode.com/dashboard/banners",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:formdata
    })
    return response.data
})
export const getTestimony = createAsyncThunk("testimony/getTestimony", async(arg,{getState})=>{
    const token = getState().auth.token
    const response = await axios({
        method: 'GET',
        url:'https://beautyshop.yashacode.com/testimony/',
        headers:{
            'authorization': `Bearer ${token}`
        }
    })
    return response.data
})

export const addTestimony = createAsyncThunk("testimony/addTestimony", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    let formdata = new FormData()
    for (let i = 0; i < data.length; i++) {
        formdata.append('images', data[i])
    }
    await axios({
        method:"POST",
        url:"https://beautyshop.yashacode.com/testimony/",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:formdata
    })
    dispatch(getTestimony())
    return 
})
export const deleteTestimony = createAsyncThunk("testimony/deleteTestimony", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    await axios({
        method:"DELETE",
        url:"https://beautyshop.yashacode.com/testimony/",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:{id:data.id}
    })
    dispatch(getTestimony())
    return 
})
const bannersSlice = createSlice({
    name:"banners",
    initialState: {
        banners: [],
        testimony:[],
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [addBanners.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addBanners.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.banners = action.payload;
        },
        [addBanners.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getBanners.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getBanners.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.banners = action.payload;
        },
        [getBanners.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [addTestimony.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addTestimony.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [addTestimony.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getTestimony.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTestimony.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.testimony = action.payload;
        },
        [getTestimony.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [deleteTestimony.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteTestimony.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.testimony = action.payload;
        },
        [deleteTestimony.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
       
    }
});

export default bannersSlice.reducer;