import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setIsLoggedIn, setUserRole, setUserId }) {  // Added setUserId
  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
    role: "client", // Default role is "client"
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { name, password, role } = loginData;

  const onInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post(`http://localhost:8080/${role}/login`, loginData); 
      
      // Check if the response status is 200 and the instructorId is returned
      if (response.status === 200) {
        setIsLoggedIn(true); // Set login state to true
        setUserRole(role);  // Set the user role

        const userId = response.data; 
        setUserId(userId);  // Set the userId in the parent component
        console.log(userId);

        // Navigate based on role
        if (role === "admin") {
          navigate("/adminhome");
        } else if (role === "instructor") {
          navigate("/instructorhome", { state: { userId } });  // Pass the userId as state
        } else {
          navigate("/clienthome");
        }
      } else {
        setErrorMessage("Invalid username or password!"); // Set error message
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setErrorMessage("Error logging in. Please try again later.");
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Welcome Back Message on the left */}
        <div className="col-md-6 d-flex align-items-center">
          <div className="card bg-light p-4 shadow-sm text-center">
            <div className="card-body">
              <h1 className="display-5 text-primary mb-4">Welcome Back!</h1>
              <p className="lead">
                We're excited to see you again. Please log in to access your account.
              </p>
              <hr />
              <p className="text-muted">
                Whether you're an admin managing offerings or an instructor updating your schedule, you're in the right place.
              </p>
            </div>
          </div>
        </div>

        {/* Login form on the right */}
        <div className="col-md-6">
          <div className="border rounded p-4 shadow">
            <h2 className="text-center m-4">Login</h2>

            {errorMessage && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {errorMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}

            {/* Role Selection Dropdown */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Log in as</label>
              <select
                className="form-control"
                name="role"
                value={role}
                onChange={onInputChange}
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mx-2">
                  Login
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
