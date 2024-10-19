import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewInstructor() {
  const [instructor, setInstructor] = useState({
    name: "",
    phoneNumber: "",
    specialization: "",
    availability: "",
    password: "",
    offerings: [], // Expect an array of offerings
  });

  const { id } = useParams();

  useEffect(() => {
    loadInstructor();
  }, []);

  const loadInstructor = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/instructor/${id}`);
      setInstructor(result.data);
    } catch (error) {
      console.error("Error fetching instructor details", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Instructor Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Instructor id : {instructor.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {instructor.name}
                </li>
                <li className="list-group-item">
                  <b>Phone Number:</b> {instructor.phoneNumber}
                </li>
                <li className="list-group-item">
                  <b>Specialization:</b> {instructor.specialization}
                </li>
                <li className="list-group-item">
                  <b>Availability:</b> {instructor.availability}
                </li>
                <li className="list-group-item">
                  <b>Password:</b> {instructor.password}
                </li>
                <li className="list-group-item">
                  <b>Offerings:</b>
                  {instructor.offerings && instructor.offerings.length > 0 ? (
                    <ul>
                      {instructor.offerings.map((offering, index) => (
                        <li key={index}>
                          <ul>
                            <li><b>ID:</b> {offering.id}</li>
                            <li><b>Location:</b> {offering.location}</li>
                            <li><b>Time:</b> {offering.time}</li>
                            <li><b>Type:</b> {offering.type}</li>
                            <li><b>Duration:</b> {offering.duration} minutes</li>
                            <li><b>Start Date:</b> {offering.startDate}</li>
                            <li><b>End Date:</b> {offering.endDate}</li>
                          </ul>
                          <hr /> {/* Separate each offering visually */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No offerings assigned to this instructor.</p>
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
