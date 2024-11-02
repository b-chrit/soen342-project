import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function ViewBooking() {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null); // Error state
  const { id } = useParams(); // Get booking ID from URL parameters

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/booking/${id}`); 
      setBooking(result.data);
    } catch (error) {
      setError("Error fetching booking details");
      console.error("Error fetching booking details", error);
    }
  };

  return (
    <div className="container">
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : booking ? (
        <div className="py-4">
          <h2 className="text-center mb-4">Booking Details</h2>
          <div className="card">
            <div className="card-header">
              Booking ID: {booking.id || "N/A"}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Client Name:</b> {booking.client?.name || "N/A"}
              </li>
              <li className="list-group-item">
                <b>Offering Type:</b> {booking.offering?.type || "N/A"}
              </li>
              <li className="list-group-item">
                <b>City:</b> {booking.offering?.city || "N/A"}
              </li>
              <li className="list-group-item">
                <b>Time:</b> {booking.offering?.time || "N/A"}
              </li>
              <li className="list-group-item">
                <b>Status:</b> {booking.status || "N/A"}
              </li>
              <li className="list-group-item">
                <b>Booking Date:</b> {booking.bookingDate || "N/A"}
              </li>
            </ul>
            <div className="text-center">
              <Link className="btn btn-primary my-2" to={"/managebookings"}>
                Back to Manage Bookings
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h4>Loading booking details...</h4>
        </div>
      )}
    </div>
  );
}