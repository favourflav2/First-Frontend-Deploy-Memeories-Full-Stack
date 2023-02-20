import axios from 'axios'

// NODE_ENV is an environment variable made popular by the express web server framework. When a node application is run, it can check the value of the environment variable and do different things based on the value. NODE_ENV specifically is used (by convention) to state whether a particular environment is a production or a development environment. A common use-case is running additional debugging or logging code if running in a development environment.

//!^^^^^^^^ if we are on our localhost
const devEnv = process.env.NODE_ENV !== "production"

const {REACT_APP_LOCALHOST_API,REACT_APP_PROD_API} = process.env

const API = axios.create({baseURL:"https://first-backend-deploy-memeories-full-stack.onrender.com"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})

export function sign_Up(formData){
    return API.post('/auth/signup',formData)
}

export function log_In(formData){
    return API.post('/auth/login',formData)
}

export function google_Signup(result){
    return API.post('/auth/googleSignup',result)
}

export function create_Tour(formData){
    return API.post('/tour',formData)
}

export function getAll_Tours(page){
    return API.get(`/tour?page=${page}`)
}

export function getOne_Tour(id){
    return API.get(`/tour/${id}`)
}

export function user_Tours(id){
    return API.get(`/tour/dashboard/${id}`)
}

export function delete_Tour(id){
    return API.delete(`/tour/${id}`)
}

export function update_Tour(id,formData){
    return API.put(`tour/${id}`,formData)
}

export function search_Tour(searchQuery){
    return API.get(`/tour/search?searchQuery=${searchQuery}`)
}

export function searchTourBy_Tag(id){
    return API.get(`/tour/tag/${id}`)
}

export function getRelated_Tours(data){
    return API.post('/tour/relatedTours',data)
}

export function like_Tour(id){
    return API.put(`/tour/like/${id}`)
}