import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function ClientHome() {
  const [offerings, setOfferings] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [isGuardianModalOpen, setGuardianModalOpen] = useState(false);
  const [guardianData, setGuardianData] = useState({
    name: "",
    phoneNumber: "",
  });

  const location = useLocation();
  const { userId: clientId } = location.state || {};

  useEffect(() => {
    loadAssignedOfferings();
  }, []);

  const loadAssignedOfferings = async () => {
    try {
      const result = await axios.get("http://localhost:8080/offerings/assigned");
      setOfferings(result.data);
    } catch (error) {
      setAlertMessage("Error loading assigned offerings.");
      setAlertType("danger");
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
        loadAssignedOfferings();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setAlertMessage(error.response.data);
          setAlertType("danger");
        } else if (error.response.status === 400) {
          setAlertMessage("You need a guardian to make a booking.");
          setAlertType("warning");
          setGuardianModalOpen(true);
        } else {
          setAlertMessage("An error occurred. Please try again.");
          setAlertType("danger");
        }
      } else {
        setAlertMessage("An error occurred. Please try again.");
        setAlertType("danger");
      }
    }

    setTimeout(() => {
      setAlertMessage(null);
      setAlertType("");
    }, 5000);
  };

  const handleGuardianSubmit = async () => {
    try {
        const response = await axios.post(
            `http://localhost:8080/client/${clientId}/register-guardian`,
            guardianData,  // Send only the guardian data, as clientId is in the URL
            { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
            setAlertMessage("Guardian registered successfully. You can now make a booking.");
            setAlertType("success");
            setGuardianModalOpen(false);
        }
    } catch (error) {
        setAlertMessage("Error registering guardian. Please try again.");
        setAlertType("danger");
    }
};


  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Client - Offerings List</h2>

        {alertMessage && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlertMessage(null)}
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

        {/* Guardian Registration Modal */}
        <Modal show={isGuardianModalOpen} onHide={() => setGuardianModalOpen(false)} centered>
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Guardian Registration Needed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted text-center mb-4">
              Since you’re under 18, a guardian is required to help with your bookings. 
              Please register a guardian below to proceed.
            </p>
            <div className="mb-3">
              <label htmlFor="guardianName" className="form-label">Guardian Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter guardian's name"
                name="name"
                value={guardianData.name}
                onChange={(e) => setGuardianData({ ...guardianData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="guardianPhoneNumber" className="form-label">Guardian Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter guardian's phone number"
                name="phoneNumber"
                value={guardianData.phoneNumber}
                onChange={(e) => setGuardianData({ ...guardianData, phoneNumber: e.target.value })}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={handleGuardianSubmit}>Register Guardian</button>
            <button className="btn btn-outline-secondary" onClick={() => setGuardianModalOpen(false)}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
