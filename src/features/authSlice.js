import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const authServices = createAsyncThunk("auth/authServices", async () => {
    const currentToken = localStorage.getItem('__ut_um_t')
    const response = await fetch("https://beautyshop.yashacode.com/admin/authservices",{
        method: "GET",
        headers: {
            'authorization': `Bearer ${currentToken}`,
        },
    });
    const result = await response.json();
    return result;
});

export const authLogin = createAsyncThunk("auth/authLogin", async (data) => {
    const response = await fetch("https://beautyshop.yashacode.com/admin/authlogin", {
        method: "POST",
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if(result.status === 200){
        localStorage.setItem('__ut_um_t',result.accessToken)
        localStorage.setItem('__lg_um', true)
    }
    return result;
});



const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [authServices.pending]: (state, action) => {
            state.isLoading = true;
        },
        [authServices.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.accessToken;
        },
        [authServices.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [authLogin.pending]: (state, action) => {
            state.isLoading = true;
        },
        [authLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.accessToken;
        },
        [authLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default authSlice.reducer;