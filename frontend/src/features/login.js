import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setIsLoggedIn, setUserRole, setUserId }) {
  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
    role: "client", // Default role is client
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { name, password, role } = loginData;

  const onInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    try {
      const response = await axios.post(`http://localhost:8080/${role}/login`, loginData); 
      
      if (response.status === 200) {
        setIsLoggedIn(true); // Update login state
        setUserRole(role); // Set user role

        const userId = response.data; // Extract user ID from response
        setUserId(userId); // Set userId in the parent component

        // Navigate to appropriate home based on role
        if (role === "admin") {
          navigate("/adminhome");
        } else if (role === "instructor") {
          navigate("/instructorhome", { state: { userId } });
        } else {
          navigate("/clienthome", { state: { userId } });
        }
      } else {
        setErrorMessage("Invalid username or password!"); // Show error if login fails
      }
    } catch (error) {
      setErrorMessage("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Welcome Back Message */}
        <div className="col-lg-5 d-flex align-items-center">
          <div className="card bg-light p-4 shadow-sm text-center">
            <div className="card-body">
              <h1 className="display-6 text-primary mb-4">Welcome Back!</h1>
              <p className="lead">
                Please log in to access your account.
              </p>
              <hr />
              <p className="text-muted">
                Whether you're an admin managing offerings, an instructor updating your schedule, or a client booking classes, log in to get started.
              </p>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="col-lg-5">
          <div className="border rounded p-4 shadow-lg">
            <h2 className="text-center m-4">Login</h2>

            {/* Display Error Message */}
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

            {/* Login Form */}
            <form onSubmit={onSubmit}>
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
                  required
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
                  required
                />
              </div>

              {/* Login Button */}
              <div className="d-grid gap-2 mb-4">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>

            {/* Continue as Guest Option */}
            <div className="text-center">
              <p className="text-muted mb-3">Or</p>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/guesthome")}
              >
                Continue as Guest
              </button>
            </div>

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