import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RegisterAvailability() {
  const { id } = useParams();  // Retrieve instructor ID from URL params
  const [instructorData, setInstructorData] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    specialization: "",
    availability: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadInstructorData();
  }, []);

  const loadInstructorData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/instructor/${id}`);
      setInstructorData(response.data);
    } catch (error) {
      setErrorMessage("Error loading instructor data.");
    }
  };

  const onInputChange = (e) => {
    setInstructorData({ ...instructorData, availability: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.put(`http://localhost:8080/instructor/${id}`, instructorData);
      if (response.status === 200) {
        setSuccessMessage("Availability updated successfully!");
      } else {
        setErrorMessage("Failed to update availability. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error updating availability. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="border rounded p-4 shadow-lg">
            <h2 className="text-center m-4">Register Availability</h2>

            {errorMessage && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {errorMessage}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="availability" className="form-label">
                  Where are you available to instruct?
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter cities (e.g., Montreal, Laval)"
                  name="availability"
                  value={instructorData.availability}
                  onChange={onInputChange}
                  required
                />
                <small className="form-text text-muted">
                  You may enter a single city or multiple cities separated by commas. (e.g., Montreal, Laval).
                </small>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Save Availability</button>
              </div>
            </form>

            <div className="text-center mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => navigate(`/instructorhome`)}
              >
                Back to Instructor Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}