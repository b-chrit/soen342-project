import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewOffering({ userRole }) {
  const [offering, setOffering] = useState(null);  // Initialize as null
  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state

  const { id } = useParams();

  useEffect(() => {
    const loadOffering = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/offering/${id}`);
        if (result.data) {
          setOffering(result.data);  // Set the offering data if it exists
        } else {
          setError("Offering not found");
        }
      } catch (err) {
        setError("An error occurred while fetching the offering.");
      } finally {
        setLoading(false);  // Stop the loading spinner
      }
    };

    loadOffering();
  }, [id]);  // Include `id` in the dependency array to trigger re-fetch if the id changes

  // If still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error (e.g., no offering found), display an error message
  if (error) {
    return <div>{error}</div>;
  }

  // If no offering is found (offering is still null), display a not found message
  if (!offering) {
    return <div>No offering available for this ID.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Offering Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Offering id : {offering.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Location:</b> {offering.location}
                </li>
                <li className="list-group-item">
                  <b>Time:</b> {offering.time}
                </li>
                <li className="list-group-item">
                  <b>Type:</b> {offering.type}
                </li>
                <li className="list-group-item">
                  <b>Duration:</b> {offering.duration} minutes
                </li>
                <li className="list-group-item">
                  <b>Start Date:</b> {offering.startDate}
                </li>
                <li className="list-group-item">
                  <b>End Date:</b> {offering.endDate}
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            {userRole === "admin" && (
              <Link className="btn btn-primary my-2" to={"/adminhome"}>
                Back to Admin Home
              </Link>
            )}
            {userRole === "instructor" && (
              <Link className="btn btn-primary my-2" to={"/instructorhome"}>
                Back to Instructor Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
