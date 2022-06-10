import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import host from './host'
export const authServices = createAsyncThunk("auth/authServices", async () => {
    try {
        const currentToken = localStorage.getItem('__ut_um_t')
        if(currentToken){
            let result = await axios({
                method: "GET",
                url:host+"/admin/authservices",
                headers: {
                    'authorization': `Bearer ${currentToken}`,
                },
            });
            if(currentToken===result.data.accessToken){
                
                localStorage.setItem('__ut_um_t',result.data.accessToken)
                localStorage.setItem('__lg_um', true)
                return result.data.accessToken;
            }
            if(currentToken!=result.data.accessToken){

                localStorage.removeItem('__ut_um_t')
                localStorage.removeItem('__lg_um')
                return {accesstoken:null}
            }
        }
    } catch (error) {
 
        localStorage.removeItem('__ut_um_t')
        localStorage.removeItem('__lg_um')
        return {accesstoken:null}
    }
        
});

export const authLogin = createAsyncThunk("auth/authLogin", async (data) => {
    const result = await axios.post(host+"/admin/login",data);
    if(result.status === 200){
        localStorage.setItem('__ut_um_t',result.data.accessToken)
        localStorage.setItem('__lg_um', true)
    }
    return result.data.accessToken;
});



const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isLoading: false,
        error: null,
    },
    reducers:{
        logout: (state) => {
            localStorage.removeItem('__ut_um_t')
            localStorage.removeItem('__lg_um')
            state.token = null
            window.location.replace('/')
        }
    },
    extraReducers: {
        [authServices.pending]: (state, action) => {
            state.isLoading = true;
        },
        [authServices.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload;
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
            state.token = action.payload;
        },
        [authLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});
export const {logout}= authSlice.actions
export default authSlice.reducer;