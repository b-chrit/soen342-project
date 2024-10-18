import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function AdminHome() {
  const [offerings, setOfferings] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadOfferings();
  }, []);

  const loadOfferings = async () => {
    const result = await axios.get("http://localhost:8080/offerings");
    console.log(result.data);
    setOfferings(result.data);
  };

  const deleteOffering = async (id) => {
    await axios.delete(`http://localhost:8080/offering/${id}`);
    loadOfferings();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Admin - Offerings Management</h2>

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
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewoffering/${offering.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editoffering/${offering.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteOffering(offering.id)}
                  >
                    Delete
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
