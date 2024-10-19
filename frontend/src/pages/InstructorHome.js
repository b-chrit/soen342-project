import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function InstructorHome() {
  const [offerings, setOfferings] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null); // Alert message state
  const [alertType, setAlertType] = useState(""); // Alert type (success or danger)

  const location = useLocation(); // Use the useLocation hook to access location
  const { userId: instructorId } = location.state || {}; // Extract userId and rename to instructorId

  useEffect(() => {
    loadOfferings();
  }, []);

  const loadOfferings = async () => {
    try {
      const result = await axios.get("http://localhost:8080/offerings");
      setOfferings(result.data);
    } catch (error) {
      setAlertMessage("Error loading offerings.");
      setAlertType("danger");
    }
  };

  const takeOnOffering = async (offeringId) => {
    console.log(offeringId);
    console.log("Instructor Id: " + instructorId);
    try {
      const response = await axios.put(
        `http://localhost:8080/instructor/${instructorId}/take-offering`,
        { offeringId: offeringId },
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );

      if (response.status === 200) {
        setAlertMessage(`You have successfully taken on offering with ID: ${offeringId}`);
        setAlertType("success");
      } else {
        setAlertMessage("There was an issue taking on the offering.");
        setAlertType("danger");
      }
    } catch (error) {
      // Handle specific error status codes
      if (error.response && error.response.status === 500) {
        setAlertMessage("Offering city is not in the instructor's availability.");
      } else {
        setAlertMessage("An error occurred. Please try again.");
      }
      setAlertType("danger");
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
        <h2 className="text-center mb-4">Instructor - Offerings List</h2>

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
                <td className="text-center">
                  <Link className="btn btn-primary mx-2" to={`/viewoffering/${offering.id}`}>
                    View
                  </Link>
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => takeOnOffering(offering.id)}
                  >
                    Take On Offering
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
