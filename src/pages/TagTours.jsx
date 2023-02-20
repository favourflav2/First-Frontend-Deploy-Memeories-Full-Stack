import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { searchTourByTag } from '../redux/features/tourSlice'

export default function TagTours() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {tagTours, loading} = useSelector(state => state.tour)
    const {tag} = useParams()


    React.useEffect(()=>{
        if(tag){
            dispatch(searchTourByTag(tag))
        }
    },[dispatch,tag])

    if(loading){
        return <Spinner />
    }

    function excerpt(str){
        if(str.length > 45){
            str = str.substring(0,45) + "..."
        }
        return str
    }
    
  return (
    <div style={{
        margin: "auto",
        padding: "120px",
        maxWidth:"900px",
        alignContent: "center"
    }}>
        <h3 className="text-center">Tours with tag: #{tag}</h3>

        <hr style={{maxWidth:"570px"}} />

        {tagTours && tagTours.map((item,index)=>(
            <MDBCardGroup key={index}>
                <MDBCard style={{maxWidth:"600px"}} className="mt-2">
                    <MDBRow className='g-0'>
                        <MDBCol className='md-4'>
                            <MDBCardImage 
                            className='rounded'
                            src={item.imageFile}
                            alt={item.title}
                            fluid
                            />
                        </MDBCol>
                        <MDBCol className='md-8'>
                            <MDBCardBody>
                                <MDBCardTitle className='text-start'>
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText className='text-start'>
                                    {excerpt(item.desc)}
                                </MDBCardText>
                                <div style={{float:"left", marginTop:"10px"}}>
                                    <MDBBtn size="small" rounded color="info" onClick={()=> navigate(`/tour/${item._id}`)}>
                                        Read More
                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBCardGroup>
        ))}
    </div>
  )
}
