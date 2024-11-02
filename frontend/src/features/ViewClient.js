import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewClient() {
  const [client, setClient] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    guardian: "",
    password: "",
    bookings: [], // Expect an array of bookings
  });

  const { id } = useParams();

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/client/${id}`);
      setClient(result.data);
    } catch (error) {
      console.error("Error fetching client details", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Client Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Client id : {client.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {client.name}
                </li>
                <li className="list-group-item">
                  <b>Phone Number:</b> {client.phoneNumber}
                </li>
                <li className="list-group-item">
                  <b>Age:</b> {client.age}
                </li>
                <li className="list-group-item">
                  <b>Guardian:</b> {client.guardian || "N/A"}
                </li>
                <li className="list-group-item">
                  <b>Password:</b> {client.password}
                </li>
                <li className="list-group-item">
                  <b>Bookings:</b>
                  {client.bookings && client.bookings.length > 0 ? (
                    <ul>
                      {client.bookings.map((booking, index) => (
                        <li key={index}>
                          <ul>
                            <li><b>ID:</b> {booking.id}</li>
                            <li><b>Offering Location:</b> {booking.offering.location}</li>
                            <li><b>Time:</b> {booking.offering.time}</li>
                            <li><b>Type:</b> {booking.offering.type}</li>
                            <li><b>Duration:</b> {booking.offering.duration} minutes</li>
                            <li><b>Start Date:</b> {booking.offering.startDate}</li>
                            <li><b>End Date:</b> {booking.offering.endDate}</li>
                          </ul>
                          <hr /> {/* Separate each booking visually */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No bookings available for this client.</p>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link className="btn btn-primary my-2" to={"/manageaccounts"}>
              Back to Manage Accounts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}