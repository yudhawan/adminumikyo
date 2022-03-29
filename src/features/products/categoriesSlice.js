import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk("categories/getCategories", async()=>{
    const response = await fetch("https://beautyshop.yashacode.com/category")
    const result = await response.json()
    return result
})

export const addCategories = createAsyncThunk("categories/addCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const response = await fetch("https://beautyshop.yashacode.com/category",{
        method:"POST",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({category:data})
    })
    const result = await response.json()
    return result
})

export const addSubCategories = createAsyncThunk("categories/addSubCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const response = await fetch("https://beautyshop.yashacode.com/category/sub",{
        method:"POST",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({category:data})
    })
    const result = await response.json()
    return result
})

export const editCategories = createAsyncThunk("categories/deleteCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const response = await fetch(`https://beautyshop.yashacode.com/category`,{
        method:"PUT",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({cat:data})
    })
    const result = await response.json()
    return result
})

export const editSubCategories = createAsyncThunk("categories/deleteSubCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const response = await fetch("https://beautyshop.yashacode.com/category/sub",{
        method:"PUT",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({sub:data})
    })
    const result = await response.json()
    return result
})

export const deleteCategories = createAsyncThunk("categories/deleteCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const response = await fetch("https://beautyshop.yashacode.com/category",{
        method:"DELETE",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({cat:data})
    })
    const result = await response.json()
    return result
})
export const deleteSubCategories = createAsyncThunk("categories/deleteSubCategories", async(data,{getState})=>{
    const token = getState().auth.token
    const response = await fetch("https://beautyshop.yashacode.com/category/sub",{
        method:"DELETE",
        headers:{
            "authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({sub:data})
    })
    const result = await response.json()
    return result
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