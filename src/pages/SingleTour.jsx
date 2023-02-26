import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBContainer, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneTour, getRelatedTours } from '../redux/features/tourSlice'
import moment from 'moment'
import RelatedTour from '../components/RelatedTour'


export default function SingleTour() {
    const dispatch = useDispatch()
    const {tour,relatedTours} = useSelector(state => state.tour)
    const {id} = useParams()
    const tags = tour?.tags
    const navigate = useNavigate()
    
    
    React.useEffect(()=>{
        if(tags){
            dispatch(getRelatedTours(tags))
        }
    },[dispatch,tags])
   
    React.useEffect(()=>{
        if(id){
            dispatch(getOneTour(id))
        }
    },[id,dispatch])
    //console.log(id)
    
    
  return (
    <>
    <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
            <MDBCardImage 
            position='top'
            style={{width:"100%", maxHeight:"600px"}}
            src={tour.imageFile}
            alt={tour.title}
            />
            <MDBCardBody>
                <div style={{display:"flex", flexDirection:"column"}}>
                <MDBBtn tag='a' color='none' style={{float: "left", color:'#000'}} onClick={()=>navigate('/')}>
                    {/* <MDBIcon 
                    fas
                    size='lg'
                    icon="long-arrow-alt-left"
                    
                    /> */}
                    <i className="fas fa-long-arrow-alt-left"  style={{float:"left",marginBottom:"10px", backgroundColor:"gray"}}>Go Back</i>

                </MDBBtn>
                <h3>{tour.title}</h3>
                </div>
                
                <span>
                   <p className="test-start tourName">Created By: {tour.name}</p>
                </span>
                
                <div style={{float: "left"}}>
                    <span className="text-start">
                        {tour?.tags?.map((item,index)=>(
                            `#${item}`
                        ))}
                    </span>
                </div>
                <br />
                <MDBCardText className='text-start mt-2'>
                    <MDBIcon 
                    style={{float:"left", margin:"5px"}}
                    far
                    icon="calendar-alt"
                    size="lg"
                    />
                    <small>
                        {moment(tour.createdAt).fromNow()}
                    </small>
                </MDBCardText>

                <MDBCardText className='lead mb-0 text-start'>
                        {tour.desc}
                </MDBCardText>
            </MDBCardBody>
            {/* Related Tours */}
            <RelatedTour relatedTours={relatedTours} tourId={id}/>
        </MDBCard>
        
    </MDBContainer>
    </>
  )
}
