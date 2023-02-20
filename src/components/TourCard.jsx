import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

export default function TourCard({
  name,
  title,
  desc,
  tags,
  createdAt,
  _id,
  imageFile,
  likes
}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth)
  const userId = user?.user?._id
  //console.log(userId)

  function excerpt(str) {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  }

  function Likes() {
    if(likes.length > 0){
      return likes.find(like => like === userId) ? 
      (
        <>
        <MDBIcon fas icon="thumbs-up" />
        &nbsp; 
        {likes.length > 2 ? 
        (<MDBTooltip  title={`You and ${likes.length - 1} liked this post`}>
          {likes.length} Likes
        </MDBTooltip>)
        :
        (`${likes.length} Like${likes.length > 1? 's':""}`)}
      </>
      )
      :
      (
        <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;{likes.length} {likes.length === 1? "like": "Likes"}
        </>
      )
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  }

  

  function handleLike() {
    if(user?.user?._id){
      dispatch(likeTour({_id}))
    }
  }

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "120px" }}
        />
        <div className="top-left">{name}</div>
        <div className="mt-2">
        <span className="text-start tag-card">
          {tags.map((item, index) => (
            <Link key={index} to={`/tour/tag/${item}`}>{`#${item}`}</Link>
          ))}
        </span>
        <MDBBtn
          style={{ float: "right" }}
          color="none"
          tag="a"
          onClick={handleLike}
        >
          <Likes />
        </MDBBtn>
        </div>
        
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(desc)}
            <br></br>
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
          <MDBCardText className="text-start">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
}
