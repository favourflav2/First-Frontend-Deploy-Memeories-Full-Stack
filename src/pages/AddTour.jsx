import React from "react";
import { Chip, Stack, TextField } from "@mui/material";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { MDBBtn, MDBCard, MDBCardBody, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { createTour, updateTour } from "../redux/features/tourSlice";
import {useNavigate, useParams} from 'react-router-dom'

export default function AddTour() {
    const dispatch = useDispatch()
    const {error,userTours} = useSelector(state => state.tour)
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const {id} = useParams()
    
  const [formData, setFormData] = React.useState({
    title: "",
    desc: "",
    name: "",
    // creator: "",
    tags: [],
  });

  //! Edit Section
  // When we click edit btn we nagivate to a page and bring the id from the edited tour
  React.useEffect(()=>{
    if(id){
      // Loop over all user posts and match the id from url and item in the userPosts
      const singleTour = userTours.find((tour)=> tour._id === id)
      setFormData({...singleTour})
      
      
    }
    
  },[id,userTours])
 //console.log(formData)
  const [addTag,setTags] = React.useState('')
  const { title, desc, tags } = formData;
 
   React.useEffect(()=>{
     error && toast.error(error)
   },[error])

  function handleSubmit(e){
    e.preventDefault()
    if(title && desc && tags){
        const updatedTourData = {...formData, name: user?.user?.name}
        if(!id){
          dispatch(createTour({updatedTourData,navigate,toast}))
        }else{
          dispatch(updateTour({id,updatedTourData,toast,navigate}))
        }
        
        
    }
  }
  function handleAddTag(){
    if(addTag){
        setFormData({...formData,tags:[...formData.tags,addTag]})
        setTags('')
    }else{
        toast("Tag connot be empty if you want to add")
    }
    
  }
  function handleChange(e) {
    setFormData((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleChipChange(e){
    setTags(e.target.value)
  }
  function handleClear(){
    setFormData({
        title: "",
        desc: "",
        name: "",
        // creator: "",
        tags: [],
      })
      setTags('')
  }
  function handleClick() {}
  function handleDelete(chipDel) {
    setFormData({...formData, tags: formData.tags.filter(item => item !== chipDel)})
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5 className="mt-2">{id ? "Edit Tour": "Add Tour"}</h5>
      <MDBCardBody>
        <MDBValidation onSubmit={(e)=>handleSubmit(e)} className="row g-3" noValidate >
          <MDBValidationItem
            feedback="Please Provide Title"
            invalid
            className="col-md-12"
          >
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={title}
              onChange={(e) => handleChange(e)}
              className="form-control"
              required
            />
          </MDBValidationItem>

          <MDBValidationItem
            feedback="Please Provide Description"
            invalid
            className="col-md-12"
          >
            <textarea
              type="text"
              placeholder="Description"
              name="desc"
              value={desc}
              onChange={(e) => handleChange(e)}
              className="form-control"
              required
              style={{ height: "100px" }}
            />
             </MDBValidationItem>

            <div className="favour">
                
                
                <TextField 
            //  style={{width: "96%", marginLeft:"7px"}} 
             className="mt-3"
             label="Enter Tag"
             value={addTag}
             onChange={(e)=>handleChipChange(e)}
            >

             </TextField>
                
            
            
             <MDBBtn type="button" color="success" className="mt-2" onClick={handleAddTag}>
                Add Tag
             </MDBBtn>
             
             
            </div>

            <Stack spacing={1} direction="row">
                {tags.map((item,index)=>(
                    
                    <Chip
                    key={index}
                    label={item}
                    onDelete={()=>handleDelete(item)}
                    onClick={handleClick}
                    />
                    
                ))}
            </Stack>
             
                
              
            <div className="d-flex justify-content-start">
                <FileBase type="file" 
                multiple={false} 
                onDone={(({base64}) => setFormData({...formData,imageFile: base64}))} 
                />
            </div>

            <div className="col-12">
                <MDBBtn style={{width: "100%"}} className="mt-2">{id ? "Update" : "Submit"}</MDBBtn>
                <MDBBtn style={{width: "100%"}} className="mt-2" color="danger" onClick={handleClear}>Clear</MDBBtn>
            </div>

         
        </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
