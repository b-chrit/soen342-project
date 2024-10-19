import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InstructorOfferings() {
  const { id } = useParams();  // Instructor ID
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/instructor/${id}/offerings`);
        setOfferings(response.data);
      } catch (error) {
        setError("Error fetching offerings");
      } finally {
        setLoading(false);
      }
    };

    fetchOfferings();
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
        <h2 className="text-center mb-4">My Offerings</h2>
        
        {offerings.length > 0 ? (
          offerings.map(offering => (
            <div className="col-md-4 mb-4 d-flex justify-content-center" key={offering.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{offering.type}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{offering.city}</h6>
                  <p className="card-text">
                    <strong>Location:</strong> {offering.location} <br />
                    <strong>Time:</strong> {offering.time} <br />
                    <strong>Duration:</strong> {offering.duration} minutes <br />
                    <strong>Start Date:</strong> {offering.startDate} <br />
                    <strong>End Date:</strong> {offering.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center mt-4">
            No offerings available for this instructor.
          </div>
        )}
      </div>
    </div>
  );
}
