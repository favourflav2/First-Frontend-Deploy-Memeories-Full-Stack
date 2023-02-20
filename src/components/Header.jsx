import React from 'react'
import {
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
    MDBNavbarToggler
  } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';
import { searchTour } from '../redux/features/tourSlice';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function Header() {
    const [show, setShow] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const state = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //console.log(state)
    const token = state?.user?.token
    
    if(token?.length > 55){
        const decoded = jwt_decode(token)
        if(decoded.exp * 1000 < new Date().getTime()){
            dispatch(setLogout())
        }
    }

    function handleLogout(){
        dispatch(setLogout())
    }

    function handleSubmit(e){
        e.preventDefault()
        if(search){
            dispatch(searchTour(search))
            navigate(`/tour/search?searchQuery=${search}`)
        }else{
            navigate('/')
        }
    }

    function searchBtn(){
        if(search){
            dispatch(searchTour(search))
            navigate(`/tour/search?searchQuery=${search}`)
        }else{
            navigate('/')
        }
    }
    
  return (
   <MDBNavbar fixed='top' expand="lg" dark style={{backgroundColor:"#f0e6ea", height:"100px"}}>
    <MDBContainer>
        <MDBNavbarBrand href='/' style={{color:"#606080", fontWeight:"600", fontSize:"24px" }}>
            Mern App
        </MDBNavbarBrand>

        <MDBNavbarToggler
        type='button'
        aria-expanded="false"
        aria-label='Toggle navigation'
        onClick={()=> setShow(!show)}
        style={{color:"#606080"}}
        >
            <MDBIcon icon='bars' fas/>
        </MDBNavbarToggler>

        <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">

                
                {state.user?.user._id && (
                    <h5 style={{marginRight:"30px",marginTop:"17px"}} >Logged in as {state.user?.user.name}</h5>
                )}
                <MDBNavbarItem>
                    <MDBNavbarLink href='/'>
                        <p className='header-text'>Home</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>

                {state.user?.user?._id && (
                    <>
                    <MDBNavbarItem>
                    <MDBNavbarLink href='/addTour'>
                        <p className='header-text'>Add Tour</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                    <MDBNavbarLink href='/dashboard'>
                        <p className='header-text'>Dashboard</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                    </>
                )}

                {state.user?.user?._id ? 
                (
                    <MDBNavbarItem>
                    <MDBNavbarLink href='/logout'>
                        <p className='header-text' onClick={handleLogout}>Log Out</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                ) : 
                (
                    <MDBNavbarItem>
                    <MDBNavbarLink href='/login'>
                        <p className='header-text'>Log In</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                )}



            </MDBNavbarNav>

            <form className='d-flex input-group w-auto' onSubmit={(e)=>handleSubmit(e)}>

                    <input type="text" 
                    className="form-control"
                    placeholder='Search Tour'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    />
                <div style={{marginTop:"5px", marginLeft:"5px"}}>
                    <MDBIcon fas icon="search" onClick={searchBtn} />
                </div>
            </form>
        </MDBCollapse>
    </MDBContainer>
   </MDBNavbar>
  )
}
