import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { google_Signup, log_In, sign_Up } from '../api'

export const login = createAsyncThunk("auth/login",async({formData,navigate,toast}, {rejectWithValue})=>{
    try{
        const res = await log_In(formData)
        toast.success("Login Successfull")
        navigate('/')
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const signup = createAsyncThunk("auth/signup",async({formData,navigate,toast}, {rejectWithValue})=>{
    try{
        const res = await sign_Up(formData)
        toast.success("Sign Up Successfull")
        navigate('/')
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const googleSignup = createAsyncThunk("auth/googleSignup",async({result,navigate,toast}, {rejectWithValue})=>{
    try{
        const res = await google_Signup(result)
        toast.success("Google Sign In Successfull")
        navigate('/')
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState:{
        user: null,
        error: '',
        loading: false
    },
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload
        },
        setLogout: (state,action) =>{
            localStorage.clear()
            state.user = null
        }
    },
    extraReducers:{
        [login.pending]: (state, action)=>{
            state.loading = true
        },
        [login.fulfilled]: (state, action)=>{
            state.loading = false;
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            state.user = action.payload
        },
        [login.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload
        },


        [signup.pending]: (state, action)=>{
            state.loading = true
        },
        [signup.fulfilled]: (state, action)=>{
            state.loading = false;
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            state.user = action.payload
        },
        [signup.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload
        },

        [googleSignup.pending]: (state, action)=>{
            state.loading = true
        },
        [googleSignup.fulfilled]: (state, action)=>{
            state.loading = false;
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            state.user = action.payload
        },
        [googleSignup.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload
        },
    }
})

export const {setUser, setLogout} = authSlice.actions

export default authSlice.reducer;