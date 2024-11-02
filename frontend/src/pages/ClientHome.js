import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function ClientHome() {
  const [offerings, setOfferings] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null); // Alert message state
  const [alertType, setAlertType] = useState(""); // Alert type (success or danger)

  const location = useLocation(); // Use the useLocation hook to access location
  const { userId: clientId } = location.state || {}; // Extract userId and rename to clientId

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

  const makeBooking = async (offeringId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/client/${clientId}/make-booking`,
        offeringId,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setAlertMessage("Booking successfully created.");
        setAlertType("success");
        loadAssignedOfferings(); // Reload offerings after successful booking
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlertMessage(error.response.data);  // Show conflict message from backend
        setAlertType("danger");
      } else {
        setAlertMessage("An error occurred. Please try again.");
        setAlertType("danger");
      }
    }

    // Clear the alert after a few seconds
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType("");
    }, 5000);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Client - Offerings List</h2>

        {/* Bootstrap Alert */}
        {alertMessage && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlertMessage(null)} // Close the alert manually
            ></button>
          </div>
        )}

        {offerings.length > 0 ? (
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
                <th scope="col">Availability</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offerings.map((offering, index) => (
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
                      <span className="badge bg-danger">Non-available</span>
                    )}
                  </td>
                  <td className="text-center">
                    <Link className="btn btn-primary mx-2" to={`/viewoffering/${offering.id}`}>
                      View
                    </Link>
                    {offering.available && (
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => makeBooking(offering.id)}
                      >
                        Make Booking
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info text-center">
            No assigned offerings available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}