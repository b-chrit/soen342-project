import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  // Fetch all bookings
  const loadBookings = async () => {
    setLoading(true);
    try {
      const result = await axios.get("http://localhost:8080/bookings");
      console.log(result.data)
      setBookings(result.data);
    } catch (error) {
      setAlertMessage("Error loading bookings. Please try again later.");
      setAlertType("danger");
    } finally {
      setLoading(false); 
    }
  };

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/booking/${bookingId}`);
      if (response.status === 200) {
        setAlertMessage(`Booking ID ${bookingId} has been canceled successfully.`);
        setAlertType("success");
        loadBookings(); // Reload bookings after cancellation
      }
    } catch (error) {
      setAlertMessage(`Failed to cancel booking ID ${bookingId}.`);
      setAlertType("danger");
    }

    setTimeout(() => {
      setAlertMessage(null);
      setAlertType("");
    }, 5000);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Manage Bookings</h2>

        {/* Bootstrap Alert */}
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

        {/* Conditional rendering for loading */}
        {loading ? (
          <div className="text-center">
            <h4>Loading bookings...</h4>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center">
            <h4>No bookings available at the moment.</h4>
          </div>
        ) : (
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">Booking ID</th>
                <th scope="col">Client Name</th>
                <th scope="col">Offering</th>
                <th scope="col">City</th>
                <th scope="col">Time</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <th scope="row">{booking.id}</th>
                  <td>{booking.client?.name || "N/A"}</td>
                  <td>{booking.offering?.type || "N/A"}</td>
                  <td>{booking.offering?.city || "N/A"}</td>
                  <td>{booking.offering?.time || "N/A"}</td>
                  <td className="text-center">
                    <Link to={`/viewbooking/${booking.id}`} className="btn btn-primary mx-2">
                      View
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}