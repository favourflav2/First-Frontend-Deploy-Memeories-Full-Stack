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
import { login } from '../redux/features/authSlice';

export default function Login() {
    const [formData, setFormData] = React.useState({
        email:"",
        password:""
    })
    
    const {email,password} = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useSelector(state => state.auth)
    
    React.useEffect(()=>{
        state.error && toast.error(state.error)
    },[state.error])

    function handleSubmit(e){
        e.preventDefault()

        if(email && password){
            dispatch(login({formData,navigate,toast}))
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

    

  return (
    <div style={{margin: "auto", padding: "15px", maxWidth:"450px", alignContent:"center", marginTop:"120px"}}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x'/>
        <h5>Log In</h5>
        <MDBCardBody>
            <MDBValidation onSubmit={(e)=>handleSubmit(e)} noValidate className='row g-3'>
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
                        Login
                    </MDBBtn>
                </div>
            </MDBValidation>
        </MDBCardBody>

        <MDBCardFooter>
            <Link to="/signup">
            <p>
                Dont have an account? Sign Up
            </p>
            </Link>
        </MDBCardFooter>

      </MDBCard>
    </div>
  )
}
