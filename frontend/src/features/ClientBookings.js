import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ClientBookings() {
  const { id } = useParams();  // Client ID
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/client/${id}/bookings`);
        setBookings(response.data);
      } catch (error) {
        setError("Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
             <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
             </div>
           </div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="row justify-content-center">
        <h2 className="text-center mb-4">My Bookings</h2>
        
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div className="col-md-4 mb-4 d-flex justify-content-center" key={booking.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{booking.offering.type}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{booking.offering.city}</h6>
                  <p className="card-text">
                    <strong>Location:</strong> {booking.offering.location} <br />
                    <strong>Time:</strong> {booking.offering.time} <br />
                    <strong>Duration:</strong> {booking.offering.duration} minutes <br />
                    <strong>Start Date:</strong> {booking.offering.startDate} <br />
                    <strong>End Date:</strong> {booking.offering.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center mt-4">
            No bookings available for this client.
          </div>
        )}
      </div>
    </div>
  );
}