import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { create_Tour, delete_Tour, getAll_Tours, getOne_Tour, getRelated_Tours, like_Tour, searchTourBy_Tag, search_Tour, update_Tour, user_Tours } from '../api'

export const createTour = createAsyncThunk("tour",async({updatedTourData,navigate,toast}, {rejectWithValue})=>{
    try{
        const res = await create_Tour(updatedTourData)
        toast.success("Created Post")
        navigate('/')
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const getAllTours = createAsyncThunk("getTour",async(page, {rejectWithValue})=>{
    try{
        const res = await getAll_Tours(page)
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const getOneTour = createAsyncThunk("getOneTour",async(id, {rejectWithValue})=>{
    try{
        const res = await getOne_Tour(id)
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const toursByUser = createAsyncThunk("userTours",async(id, {rejectWithValue})=>{
    try{
        const res = await user_Tours(id)
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const deleteTour = createAsyncThunk("tourDelete",async({id,toast}, {rejectWithValue})=>{
    try{
        const res = await delete_Tour(id)
        toast.success("Tour Deleted")
        
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const updateTour = createAsyncThunk("updateDelete",async({id,updatedTourData,toast,navigate}, {rejectWithValue})=>{
    try{
        const res = await update_Tour(id,updatedTourData)
        toast.success("Tour Updated")
        navigate('/')
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const searchTour = createAsyncThunk("searchTour",async(searchQuery, {rejectWithValue})=>{
    try{
        const res = await search_Tour(searchQuery)
        
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const searchTourByTag = createAsyncThunk("searchTourByTag",async(id, {rejectWithValue})=>{
    try{
        const res = await searchTourBy_Tag(id)
        
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const getRelatedTours = createAsyncThunk("relatedTour",async(reqBody, {rejectWithValue})=>{
    try{
        const res = await getRelated_Tours(reqBody)
        
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})

export const likeTour = createAsyncThunk("likeTour",async({_id}, {rejectWithValue})=>{
    try{
        const res = await like_Tour(_id)
        
        return res.data
    }catch(e){
        return rejectWithValue(e.response.data.msg)
    }
})


const tourSlice = createSlice({
    name: "tour",
    initialState:{
        tour:{},
        tours:[],
        userTours:[],
        tagTours: [],
        relatedTours:[],
        currentPage: 1,
        numberOfPages:null,
        error: '',
        loading: false
    },
    //Modify the state
    reducers:{
        setCurrentPage: (state, action) =>{
            state.currentPage = action.payload
        }
    },
    // Set State
    extraReducers:{
        [createTour.pending]: (state, action)=>{
            state.loading = true
        },
        [createTour.fulfilled]: (state, action)=>{
            state.loading = false;
            state.tours = [action.payload]
        },
        [createTour.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },


        [getAllTours.pending]: (state, action)=>{
            state.loading = true
        },
        [getAllTours.fulfilled]: (state, action)=>{
            state.loading = false;
            state.tours = action.payload.data
            state.numberOfPages = action.payload.numberOfPages
            state.currentPage = action.payload.currentPage
        },
        [getAllTours.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },

        [getOneTour.pending]: (state, action)=>{
            state.loading = true
        },
        [getOneTour.fulfilled]: (state, action)=>{
            state.loading = false;
            state.tour = action.payload
        },
        [getOneTour.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },

        [toursByUser.pending]: (state, action)=>{
            state.loading = true
        },
        [toursByUser.fulfilled]: (state, action)=>{
            state.loading = false;
            state.userTours = action.payload
        },
        [toursByUser.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },


        [deleteTour.pending]: (state, action)=>{
            state.loading = true
        },
        [deleteTour.fulfilled]: (state, action)=>{
            state.loading = false;
            const {arg} = action.meta
            console.log(arg,"arg from tourSlice delee User reducers")
            if(arg.id){
                state.userTours = state.userTours.filter(item => item._id !== arg.id)
                state.tours = state.tours.filter(item => item._id !== arg.id)
            }
        },
        [deleteTour.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },


        [updateTour.pending]: (state, action)=>{
            state.loading = true
        },
        [updateTour.fulfilled]: (state, action)=>{
            state.loading = false;
            const {arg} = action.meta
            console.log(arg,"arg from tourSlice delee User reducers")
            if(arg.id){
                state.userTours = state.userTours.map(item => item._id === arg.id ? action.payload : item)
                state.tours = state.tours.map(item => item._id === arg.id? action.payload: item)
            }
        },
        [updateTour.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },


        [searchTour.pending]: (state, action)=>{
            state.loading = true
        },
        [searchTour.fulfilled]: (state, action)=>{
            state.loading = false;
            state.tours = action.payload
        },
        [searchTour.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },


        [searchTourByTag.pending]: (state, action)=>{
            state.loading = true
        },
        [searchTourByTag.fulfilled]: (state, action)=>{
            state.loading = false;
            state.tagTours = action.payload
        },
        [searchTourByTag.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },


        [getRelatedTours.pending]: (state, action)=>{
            state.loading = true
        },
        [getRelatedTours.fulfilled]: (state, action)=>{
            state.loading = false;
            state.relatedTours = action.payload
        },
        [getRelatedTours.rejected]: (state, action)=>{
            state.loading= false
            state.error = action.payload.msg
        },


        [likeTour.pending]: (state, action)=>{
            //state.loading = true
        },
        [likeTour.fulfilled]: (state, action)=>{
            state.loading = false;
            const {arg} = action.meta
            console.log(arg,"arg from tourSlice delee User reducers")
            // Click handling when we click its grabbing the item we cliked id
            if(arg._id){
                state.tours = state.tours.map(item => item._id === arg._id? action.payload: item)
            }
        },
        [likeTour.rejected]: (state, action)=>{
            //state.loading= false
            state.error = action.payload.msg
        },
        


        
    }
})

export const {setCurrentPage} = tourSlice.actions

export default tourSlice.reducer