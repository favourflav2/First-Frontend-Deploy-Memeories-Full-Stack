import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import React from "react";
import { setUser } from "./redux/features/authSlice";
import AddTour from "./pages/AddTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";


function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))

  React.useEffect(()=>{
    dispatch(setUser(user))
  },[dispatch,user])
  return (
    <BrowserRouter>
    <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tour/search" element={<Home />}></Route>
        <Route path="/tour/tag/:tag" element={<TagTours />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* Private Routes */}
        {/* I could also just condtionally make my own private routes like this */}
        {/* element="state.user.user._id? Render the page : navigate(to login)" */}
        <Route path="/addTour" element={<PrivateRoute><AddTour /></PrivateRoute>}></Route>
        <Route path="/editTour/:id" element={<PrivateRoute><AddTour /></PrivateRoute>}></Route>
        <Route path="/tour/:id" element={<PrivateRoute><SingleTour /></PrivateRoute>}></Route>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
