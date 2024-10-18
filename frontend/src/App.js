import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddOffering from "./features/AddOffering";
import EditOffering from "./features/EditOffering";
import ViewOffering from "./features/ViewOffering";
import ManageAccounts from "./features/ManageAccounts";  
import ViewInstructor from "./features/ViewInstructor"; 
import LoginUser from "./features/login";
import AdminHome from "./pages/AdminHome"; 
import InstructorHome from "./pages/InstructorHome"; 
import InstructorOfferings from "./features/InstructorOfferings";  // Import the new component
import Footer from "./pages/Footer"; 
import SignUser from "./features/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userRole, setUserRole] = useState("");  // State to track the user's role
  const [userId, setUserId] = useState(null);  // State to track the user's ID

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Router>
        {/* Conditionally render the Navbar if the user is logged in */}
        {isLoggedIn && <Navbar userRole={userRole} userId={userId} />}  {/* Pass userId to Navbar */}
        <div className="flex-grow-1">
          <Routes>
            {/* Make Login the default landing page */}
            <Route
              exact
              path="/"
              element={<LoginUser setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserId={setUserId} />}
            />

            {/* Admin and Instructor specific routes */}
            {isLoggedIn && userRole === "admin" && (
              <>
                <Route exact path="/adminhome" element={<AdminHome />} />
                <Route exact path="/manageaccounts" element={<ManageAccounts />} />
                <Route exact path="/addoffering" element={<AddOffering />} />
                <Route exact path="/editoffering/:id" element={<EditOffering />} />
                <Route exact path="/viewoffering/:id" element={<ViewOffering userRole={userRole} />} />
                <Route exact path="/viewinstructor/:id" element={<ViewInstructor />} />
              </>
            )}

            {isLoggedIn && userRole === "instructor" && (
              <>
                <Route exact path="/instructorhome" element={<InstructorHome />} />
                <Route exact path="/viewoffering/:id" element={<ViewOffering userRole={userRole} />} />
                <Route exact path="/instructorofferings/:id" element={<InstructorOfferings />} />  {/* Use userId */}
              </>
            )}

            {/* Login route is available whether logged in or not */}
            <Route exact path="/login" element={<LoginUser setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserId={setUserId} />} />
            <Route exact path="/signup" element={<SignUser setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserId={setUserId} />} />
          </Routes>
        </div>
        {/* Footer component is rendered at the bottom */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
