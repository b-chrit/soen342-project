import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ setIsLoggedIn, setUserRole, setUserId }) {  // Added setUserId
  let navigate = useNavigate();

  // State for form data
  const [signupData, setSignupData] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    specialization: "",
    availability: "",
    role: "admin", // Default role is "admin"
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { name, password, phoneNumber, specialization, availability, role } = signupData;

  // Handle input changes
  const onInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message
    setSuccessMessage(""); // Clear any previous success message

    try {
      const response = await axios.post(`http://localhost:8080/${role}/signup`, signupData);
      const userId = response.data; // The backend should return the created instructor's ID

      if (response.status === 200) {
        setSuccessMessage("Account created successfully!");

        // Set login status and user role after successful signup
        setIsLoggedIn(true);
        setUserRole(role);
        setUserId(userId);  // Set the userId in the parent component

        // Navigate to the respective home page based on role and pass the instructorId
        if (role === "admin") {
          navigate("/adminhome");
        } else if (role === "instructor") {
          console.log("Instructor ID: "+userId)
          navigate("/instructorhome", { state: { userId } });  // Pass instructorId
        } else {
          navigate("/clienthome");
        }
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
      setErrorMessage("Error signing up. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Welcome message on the left */}
        <div className="col-md-6 d-flex align-items-center">
          <div className="card bg-light p-4 shadow-sm">
            <div className="card-body">
              <h1 className="display-5 text-primary mb-4 text-center">Welcome to SOEN342</h1>
              <p className="lead text-center">
                Hi there! We’re <strong>Rym Bensalem</strong> and <strong>Baraa Chrit</strong>, and this is our project for <strong>SOEN 342</strong> – Fall 2024.
              </p>
              <hr />
              <p className="text-muted">
                This system is designed to help manage lessons, whether you’re an admin organizing offerings, an instructor managing your schedule, or a client booking classes. We’ve built this to make it easier for everyone to stay on top of things!
              </p>
              <p className="text-muted">
                We hope you find it useful, and we’re excited to share our work with you.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-4 shadow">
            <h2 className="text-center m-4">Sign Up</h2>

            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {errorMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}

            {/* Role Selection Dropdown */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Sign up as</label>
              <select
                className="form-control"
                name="role"
                value={role}
                onChange={onInputChange}
              >
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* Common Fields (Name and Password) */}
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
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

              {/* Instructor-Specific Fields */}
              {role === "instructor" && (
                <>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your phone number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={onInputChange}
                      required={role === "instructor"}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">Specialization</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your specialization"
                      name="specialization"
                      value={specialization}
                      onChange={onInputChange}
                      required={role === "instructor"}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="availability" className="form-label">Availability</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your availability"
                      name="availability"
                      value={availability}
                      onChange={onInputChange}
                      required={role === "instructor"}
                    />
                  </div>
                </>
              )}

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mx-2">
                  Sign Up
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
