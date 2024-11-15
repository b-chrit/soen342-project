import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditOffering() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [offering, setOffering] = useState({
    location: "",
    city: "",  // Add city field here
    time: "",
    type: "",
    duration: "",
    startDate: "",
    endDate: "",
  });

  const { location, city, time, type, duration, startDate, endDate } = offering;

  const onInputChange = (e) => {
    setOffering({ ...offering, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadOffering();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/offering/${id}`, offering);
    navigate("/adminhome");
  };

  const loadOffering = async () => {
    const result = await axios.get(`http://localhost:8080/offering/${id}`);
    setOffering(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Offering</h2>

          <form onSubmit={(e) => onSubmit(e)}>
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
              <label htmlFor="City" className="form-label">  {/* Add city field label */}
                City
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the city"
                name="city"  // Make sure name matches the state property
                value={city}
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
                Type
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the type (Group/Private)"
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
