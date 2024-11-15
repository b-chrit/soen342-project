import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewGuardian() {
  const { id } = useParams(); // Extract guardian ID from the URL
  const [guardian, setGuardian] = useState({
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    loadGuardian();
  }, []);

  const loadGuardian = async () => {
    try {
      console.log("Fetching guardian data...");
      const result = await axios.get(`http://localhost:8080/guardians/${id}`);
      console.log("Guardian data fetched:", result.data);
      
      setGuardian(result.data);
    } catch (error) {
      console.error("Error loading guardian:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Guardian Details</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Guardian ID: {id}</h5>
              <p className="card-text"><strong>Name:</strong> {guardian.name}</p>
              <p className="card-text"><strong>Phone Number:</strong> {guardian.phoneNumber}</p>

              <Link className="btn btn-primary mt-3" to="/manageaccounts">
                Back to Manage Accounts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}