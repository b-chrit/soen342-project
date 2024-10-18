import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddOffering() {
  let navigate = useNavigate();

  const [offering, setOffering] = useState({
    city: "",
    location: "",
    time: "",
    type: "",
    duration: "",
    startDate: "",
    endDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { city, location, time, type, duration, startDate, endDate } = offering;

  const onInputChange = (e) => {
    setOffering({ ...offering, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/offering", offering);
      
      if (response.data.startsWith("Error")) {
        setErrorMessage(response.data);
        setSuccessMessage("");
      } else {
        setSuccessMessage(response.data);
        setErrorMessage("");
        navigate("/adminhome");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the offering.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Offering</h2>

          {/* Display error or success messages */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="City" className="form-label">
                City
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the city"
                name="city"
                value={city}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the location"
                name="location"
                value={location}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Time" className="form-label">
                Time
              </label>
              <input
                type={"time"}
                className="form-control"
                placeholder="Enter the time"
                name="time"
                value={time}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Type" className="form-label">
                Type (Group or Private)
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the type"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Duration" className="form-label">
                Duration (in minutes)
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter the duration in minutes"
                name="duration"
                value={duration}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="StartDate" className="form-label">
                Start Date
              </label>
              <input
                type={"date"}
                className="form-control"
                name="startDate"
                value={startDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="EndDate" className="form-label">
                End Date
              </label>
              <input
                type={"date"}
                className="form-control"
                name="endDate"
                value={endDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary mx-2">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/adminhome">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
