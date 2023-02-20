import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBValidation,
  MDBInput,
  MDBCardFooter,
  MDBValidationItem,
  MDBSpinner
} from 'mdb-react-ui-kit';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { googleSignup, signup } from '../redux/features/authSlice';
import {useGoogleLogin } from '@react-oauth/google';

import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = React.useState({
    firstName:'',
    lastName:"",
    email:"",
    password:"",
    confirmPassword:''
})
const {email,password,lastName,firstName, confirmPassword} = formData
const dispatch = useDispatch()
const state = useSelector(state => state.auth)
const navigate = useNavigate()

React.useEffect(()=>{
  state.error && toast.error(state.error)
},[state.error])

function handleSubmit(e){
  e.preventDefault()

  if(password !== confirmPassword){
    return toast.error("Passwords need to match")
  }

  if(email && password && firstName && confirmPassword){
      dispatch(signup({formData,navigate,toast}))
  }
}

function handleChange(e){
  setFormData(item =>{
      return {
          ...item,
          [e.target.name]: e.target.value
      }
  })
}

const googleLogin = useGoogleLogin({
  onSuccess: async tokenResponse => {
    try{
      const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers:{
          "Authorization": `Bearer ${tokenResponse.access_token}`
        }
      })
      const token = tokenResponse.access_token
      const {name,sub,email} = res.data
      const result = {token,name,sub,email}
      dispatch(googleSignup({result,navigate,toast}))
      console.log(res.data)
      console.log(tokenResponse)
      
      
    }catch(e){
      console.log(e)
    }
  }
  
  
})
  return (
    <div style={{margin: "auto", padding: "15px", maxWidth:"450px", alignContent:"center", marginTop:"120px"}}>
    <MDBCard alignment='center'>
      <MDBIcon fas icon='user-circle' className='fa-2x'/>
      <h5>Sign Up</h5>
      <MDBCardBody>
          <MDBValidation onSubmit={(e)=>handleSubmit(e)} noValidate className='row g-3'>

          <MDBValidationItem feedback="Please Provide Name" invalid className="col-md-12">
                  <MDBInput 
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e)=>handleChange(e)}
                  name="firstName"
                  required
                  />
              </MDBValidationItem>

              <MDBValidationItem className="col-md-12">
                  <MDBInput 
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e)=>handleChange(e)}
                  name="lastName"
                  />
              </MDBValidationItem>

              <MDBValidationItem feedback="Please Provide Email" invalid className="col-md-12">
                  <MDBInput 
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e)=>handleChange(e)}
                  name="email"
                  required
                  
                  />
              </MDBValidationItem>

              <MDBValidationItem feedback="Please Provide Password" invalid className="col-md-12">
                  <MDBInput 
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e)=>handleChange(e)}
                  name="password"
                  required
                  autoComplete=''
                  
                  />
              </MDBValidationItem >

              <MDBValidationItem feedback="Please Provide Password" invalid className="col-md-12">
                  <MDBInput 
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>handleChange(e)}
                  name="confirmPassword"
                  required
                  autoComplete=''
                  />
              </MDBValidationItem >

              <div className="col-12">
                  <MDBBtn style={{width: "100%"}} className="mt-2">
                      {state.loading && (
                          <MDBSpinner 
                          size='sm'
                          role="status"
                          tag="span"
                          className='me-2'
                          />
                      )}
                      Sign Up
                  </MDBBtn>
              </div>
          </MDBValidation>
          <br />
          {/* <GoogleLogin 
          onSuccess={res => {
            console.log(res)
            var decoded = jwt_decode(res.credential)
            console.log(decoded)
          }}
          /> */}
          <MDBBtn style={{width:'100%'}} color="danger" onClick={googleLogin}>
              <MDBIcon className='me-2' fab icon='google'/> Google Sign In
          </MDBBtn>
      </MDBCardBody>

      <MDBCardFooter>
          <Link to="/login">
          <p>
              Already have an account? Log In
          </p>
          </Link>
      </MDBCardFooter>

    </MDBCard>
  </div>
  )
}
