import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageAccounts() {
  const [instructors, setInstructors] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadInstructors();
    loadClients();
  }, []);

  const loadInstructors = async () => {
    const result = await axios.get("http://localhost:8080/instructors");
    setInstructors(result.data);
  };

  const loadClients = async () => {
    const result = await axios.get("http://localhost:8080/clients");
    setClients(result.data);
  };

  const deleteInstructor = async (id) => {
    await axios.delete(`http://localhost:8080/instructor/${id}`);
    loadInstructors(); // Refresh the list after deleting
  };

  const deleteClient = async (id) => {
    await axios.delete(`http://localhost:8080/client/${id}`);
    loadClients(); // Refresh the list after deleting
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Accounts</h2>

        {/* Title for Instructors Table */}
        <h3 style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '10px', fontSize: '1.5rem' }}>
          Instructors
        </h3>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Specialization</th>
              <th scope="col">Availability</th>
              <th scope="col">Password</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{instructor.name}</td>
                <td>{instructor.phoneNumber}</td>
                <td>{instructor.specialization}</td>
                <td>{instructor.availability}</td>
                <td>{instructor.password}</td>
                <td className="text-center">
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewinstructor/${instructor.id}`}
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteInstructor(instructor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Title for Clients Table */}
        <h3 style={{ textAlign: 'left', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem' }}>
          Clients
        </h3>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Age</th>
              <th scope="col">Guardian</th>
              <th scope="col">Password</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{client.name}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.age}</td>
                <td>{client.guardian || 'N/A'}</td>
                <td>{client.password}</td>
                <td className="text-center">
                <Link
                  className="btn btn-primary mx-2"
                  to={`/viewclient/${client.id}`}  // Add this link for viewing client details
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteClient(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <Link className="btn btn-primary my-2" to="/adminhome">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}