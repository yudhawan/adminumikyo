import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// https://beautyshop.yashacode.com
export const getCategories = createAsyncThunk("categories/getCategories", async()=>{
    const response = await fetch("https://beautyshop.yashacode.com/category")
    const result = await response.json()
    return result
})

export const addCategories = createAsyncThunk("categories/addCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const result = await axios({
        method:"POST",
        url:"https://beautyshop.yashacode.com/category",
        data:{category:data},
        headers:{
            "authorization": `Bearer ${token}`,
        },
    })
    return result.data
})

export const addSubCategories = createAsyncThunk("categories/addSubCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const result = await axios({
        method:"POST",
        url:"https://beautyshop.yashacode.com/category/sub",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:data
    })
    return result.data
})

export const editCategories = createAsyncThunk("categories/editCategories", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    await axios({
        method:"PUT",
        url:`https://beautyshop.yashacode.com/category`,
        data:data,
        headers:{
            "authorization": `Bearer ${token}`,
        },
    })
    dispatch(getCategories())
})

export const editSubCategories = createAsyncThunk("categories/editSubCategories", async(data,{getState,dispatch})=>{
    const token = getState().auth.token
    const response = await fetch({
        method:"PUT",
        url:"https://beautyshop.yashacode.com/category",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:{sub:data}
    })
    dispatch(getCategories())
})

export const deleteCategories = createAsyncThunk("categories/deleteCategories", async(data,{getState, dispatch})=>{
    const token = getState().auth.token
    console.log(data)
    const response = await axios({
        method:"DELETE",
        url:"https://beautyshop.yashacode.com/category",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:{cat:data}
    })
    dispatch(getCategories())
})
export const deleteSubCategories = createAsyncThunk("categories/deleteSubCategories", async(data,{getState, dispatch})=>{
    const token = getState().auth.token
    const response = await axios({
        method:"DELETE",
        url:"https://beautyshop.yashacode.com/category/sub",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        data:{sub:data}
    })
    dispatch(getCategories())
})

const categoriesSLice = createSlice({
    name: "categories",
    initialState:{
        categories:[],
        categoriesLoading:false,
        error:null
    },
    extraReducers:{
        [getCategories.pending]:(state,action)=>{
            state.categoriesLoading = true
        },
        [getCategories.fulfilled]:(state,action)=>{
            state.categoriesLoading = false
            state.categories = action.payload
        },
        [getCategories.rejected]:(state,action)=>{
            state.categoriesLoading = false
            state.error = action.payload
        },
        [addCategories.pending]:(state,action)=>{
            state.categoriesLoading = true
        },
        [addCategories.fulfilled]:(state,action)=>{
            state.categoriesLoading = false
            state.categories = action.payload
        },
        [addCategories.rejected]:(state,action)=>{
            state.categoriesLoading = false
            state.error = action.payload
        },
        [addSubCategories.pending]:(state,action)=>{
            state.categoriesLoading = true
        },
        [addSubCategories.fulfilled]:(state,action)=>{
            state.categoriesLoading = false
            state.categories = action.payload
        },
        [addSubCategories.rejected]:(state,action)=>{
            state.categoriesLoading = false
            state.error = action.payload
        },
        [deleteCategories.pending]:(state,action)=>{
            state.categoriesLoading = true
        },
        [deleteCategories.fulfilled]:(state,action)=>{
            state.categoriesLoading = false
            state.categories = action.payload
        },
        [deleteCategories.rejected]:(state,action)=>{
            state.categoriesLoading = false
            state.error = action.payload
        },
        [deleteSubCategories.pending]:(state,action)=>{
            state.categoriesLoading = true
        },
        [deleteSubCategories.fulfilled]:(state,action)=>{
            state.categoriesLoading = false
            state.categories = action.payload
        },
        [deleteSubCategories.rejected]:(state,action)=>{
            state.categoriesLoading = false
            state.error = action.payload
        }
    }
})

export default categoriesSLice.reducer