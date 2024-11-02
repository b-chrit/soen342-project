import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GuestHome() {
  const [offerings, setOfferings] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    loadAssignedOfferings();
  }, []);

  const loadAssignedOfferings = async () => {
    try {
      const result = await axios.get("http://localhost:8080/offerings/assigned");
      setOfferings(result.data);
    } catch (error) {
      setAlertMessage("Error loading assigned offerings.");
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Guest - View Offerings</h2>

        {/* Bootstrap Alert */}
        {alertMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {alertMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">City</th>
              <th scope="col">Location</th>
              <th scope="col">Time</th>
              <th scope="col">Type</th>
              <th scope="col">Duration</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Availability</th> {/* Added a new column for Availability */}
            </tr>
          </thead>
          <tbody>
            {offerings.length > 0 ? (
              offerings.map((offering, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{offering.city}</td>
                  <td>{offering.location}</td>
                  <td>{offering.time}</td>
                  <td>{offering.type}</td>
                  <td>{offering.duration}</td>
                  <td>{offering.startDate}</td>
                  <td>{offering.endDate}</td>
                  <td>
                    {offering.available ? (
                      <span className="badge bg-success">Available</span>
                    ) : (
                      <span className="badge bg-danger">Unavailable</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No offerings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}