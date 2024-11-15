import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ setIsLoggedIn, setUserRole, setUserId }) {
  let navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    specialization: "",
    availability: "",
    age: "",
    role: "client",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { name, password, phoneNumber, specialization, availability, age, role } = signupData;

  const onInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`http://localhost:8080/${role}/signup`, signupData);
      const userId = response.data;

      if (response.status === 200) {
        setSuccessMessage("Account created successfully!");
        setIsLoggedIn(true);
        setUserRole(role);
        setUserId(userId);

        if (role === "admin") {
          navigate("/adminhome");
        } else if (role === "instructor") {
          navigate("/instructorhome", { state: { userId } });
        } else {
          navigate("/clienthome", { state: { userId } });
        }
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error signing up. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 d-flex align-items-center">
          <div className="card bg-light p-4 shadow-sm">
            <div className="card-body">
              <h1 className="display-6 text-primary mb-4 text-center">Welcome to SOEN342</h1>
              <p className="lead text-center">
                Hi there! We’re <strong>Rym Bensalem</strong> and <strong>Baraa Chrit</strong>, and this is our project for <strong>SOEN 342</strong> – Fall 2024.
              </p>
              <hr />
              <p className="text-muted">
                This system is designed to help manage lessons, whether you’re an admin organizing offerings, an instructor managing your schedule, or a client booking classes. We’ve built this to make it easier for everyone to stay on top of things!
              </p>
              <p className="text-muted">We hope you find it useful, and we’re excited to share our work with you.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="border rounded p-4 shadow-lg">
            <h2 className="text-center m-4">Sign Up</h2>

            {errorMessage && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {errorMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Sign up as</label>
                <select className="form-control" name="role" value={role} onChange={onInputChange}>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onInputChange}
                  required={role === "client" || role === "instructor"}
                />
              </div>

              {role === "instructor" && (
                <>
                  <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">Specialization</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Specialization"
                      name="specialization"
                      value={specialization}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="availability" className="form-label">Availability</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cities"
                      name="availability"
                      value={availability}
                      onChange={onInputChange}
                      required
                    />
                    <small className="form-text text-muted">
                      You Can Enter multiple cities separated by commas (e.g., Montreal, Laval).
                    </small>
                  </div>
                </>
              )}

              {role === "client" && (
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Age"
                    name="age"
                    value={age}
                    onChange={onInputChange}
                    required
                  />
                </div>
              )}

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </div>
            </form>

            <div className="text-center mt-3">
              <p className="text-muted mb-3">Or</p>
              <button className="btn btn-outline-secondary" onClick={() => navigate("/guesthome")}>
                Continue as Guest
              </button>
            </div>

            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
