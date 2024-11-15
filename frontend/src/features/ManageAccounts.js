import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageAccounts() {
  const [instructors, setInstructors] = useState([]);
  const [clients, setClients] = useState([]);
  const [guardians, setGuardians] = useState([]); // New state for guardians

  useEffect(() => {
    loadInstructors();
    loadClients();
    loadGuardians(); // Load guardians when the component mounts
  }, []);

  const loadInstructors = async () => {
    const result = await axios.get("http://localhost:8080/instructors");
    setInstructors(result.data);
  };

  const loadClients = async () => {
    const result = await axios.get("http://localhost:8080/clients");
    setClients(result.data);
  };

  const loadGuardians = async () => {
    const result = await axios.get("http://localhost:8080/guardians");
    setGuardians(result.data);
  };

  const deleteInstructor = async (id) => {
    await axios.delete(`http://localhost:8080/instructor/${id}`);
    loadInstructors();
  };

  const deleteClient = async (id) => {
    await axios.delete(`http://localhost:8080/client/${id}`);
    loadClients();
  };

  const deleteGuardian = async (id) => {
    await axios.delete(`http://localhost:8080/guardians/${id}`);
    loadGuardians();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Accounts</h2>

        {/* Instructors Table */}
        <h3 className="mt-4 mb-2">Instructors</h3>
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
                  <Link className="btn btn-primary mx-2" to={`/viewinstructor/${instructor.id}`}>
                    View
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteInstructor(instructor.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Clients Table */}
        <h3 className="mt-4 mb-2">Clients</h3>
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
                <td>{client.guardian ? client.guardian.name : "N/A"}</td>
                <td>{client.password}</td>
                <td className="text-center">
                  <Link className="btn btn-primary mx-2" to={`/viewclient/${client.id}`}>
                    View
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteClient(client.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Guardians Table */}
        <h3 className="mt-4 mb-2">Guardians</h3>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guardians.map((guardian, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{guardian.name}</td>
                <td>{guardian.phoneNumber}</td>
                <td className="text-center">
                  <Link className="btn btn-primary mx-2" to={`/viewguardian/${guardian.id}`}>
                    View
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteGuardian(guardian.id)}>
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