import { MDBCardGroup,MDBCard,MDBRow, MDBCol, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { deleteTour, toursByUser } from '../redux/features/tourSlice'
import {toast} from 'react-toastify'


export default function Dashboard() {
    const dispatch= useDispatch()
    const {userTours,loading} = useSelector(state => state.tour)
    const {user} = useSelector(state => state.auth)
    const userId = user?.user?._id

    React.useEffect(()=>{
        if(userId){
            dispatch(toursByUser(userId))
           } 
    },[userId,dispatch])

    function excerpt(str){
        if(str.length > 45){
            str = str.substring(0,45) + "..."
        }
        return str
    }

    if(loading){
        return <Spinner />
      }

      function fuckerOff(id){
        if(window.confirm("Do you want to delete ?")){
            dispatch(deleteTour({id,toast}))
        }
        
      }


  return (
    <div style={{margin:"auto", padding:"120px", maxWidth:"900px", alignContent:"center"}}>
      <h4 className="text-center">Dashboard:{user?.user?.name}</h4>
      <hr style={{maxWidth:"570px"}} />
      {userTours.length === 0 && <h1>No Tours</h1>}
      {userTours && userTours.map((item,index)=>(
        <MDBCardGroup key={index}>
            <MDBCard style={{maxWidth:"600px"}}>
                <MDBRow className='g-0'>
                    <MDBCol md="4">
                        <MDBCardImage 
                        className='rounded'
                        src={item.imageFile}
                        alt={item.title}
                        fluid
                        />
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCardBody>
                            <MDBCardTitle className='text-start'>
                                {item.title}
                            </MDBCardTitle>
                            <MDBCardText className='text-start'>
                                <small className='text-muted'>
                                    {excerpt(item.desc)}
                                </small>
                            </MDBCardText>
                            <div style={{marginLeft: "5px", float:"right", marginTop:"-60px"}}>
                                <MDBBtn className='mt-1' tag="a" color="none"
                                onClick={()=>fuckerOff(item._id)}
                                >
                                    <MDBIcon 
                                    fas
                                    icon="trash"
                                    style={{color:"#dd4b39"}}
                                    size="lg"
                                    />
                                </MDBBtn>

                                <Link to={`/editTour/${item._id}`}>
                                    <MDBIcon 
                                    fas
                                    icon="edit"
                                    style={{color:"#55acee", marginLeft:"10px"}}
                                    size="lg"
                                    />
                                </Link>


                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
                <hr />
            </MDBCard>
        </MDBCardGroup>
       
      ))}
      
    </div> 
  )
}





 

    