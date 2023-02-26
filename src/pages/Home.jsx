import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTours, setCurrentPage } from "../redux/features/tourSlice";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import TourCard from "../components/TourCard";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { tours, loading, currentPage, numberOfPages } = useSelector(
    (state) => state.tour
  );

  function useQ() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQ();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();
  //console.log(searchQuery)
  //console.log(location)

  React.useEffect(() => {
    dispatch(getAllTours(currentPage));
  }, [dispatch, currentPage]);

  

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
        marginTop: "50px",
      }}
    >
      
      <MDBRow className="mt-5">
        {/* if theres no tours by a user we are going to display this */}
        {tours.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tags="h2">
            No Tours Found
          </MDBTypography>
        )}
        {/* once we search we are no longer going to be on the home page... if thats true and we have no tours that means we typed in the wrong tour */}
        {tours.length === 0 && location.pathname !== "/" && (
          <MDBTypography className="text-center mb-0" tags="h2">
            No Tours By That Title of <span style={{color:"red"}}>{`"${searchQuery}"`}</span>
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((item, index) => <TourCard {...item} key={index} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && (
        <Pagination
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        dispatch={dispatch}
        currentPage={currentPage}
      />
      )}
      
    </div>
  );
}
