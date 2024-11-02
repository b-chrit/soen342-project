import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar({ userRole, userId }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          {/* Conditional link based on user role */}
          <Link
            className="navbar-brand text-uppercase fw-bold fs-4 text-light"
            to={
              userRole === "admin"
                ? "/adminhome"
                : userRole === "instructor"
                ? `/instructorhome`
                : userRole === "client"
                ? `/clienthome`
                : "/"  // For guests or default fallback
            }
          >
            SOEN342
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto">
              {/* Dropdown for all the links */}
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menu
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  {/* Always show the Login link */}
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>

                  {/* Guest specific menu */}
                  {!userRole && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}

                  {/* Links only for admin */}
                  {userRole === "admin" && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/addoffering">
                          Enter Offerings
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/manageaccounts">
                          Manage Accounts
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/managebookings">
                          Manage Bookings
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Manage Records
                        </Link>
                      </li>
                    </>
                  )}

                  {/* Links only for instructors */}
                  {userRole === "instructor" && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/registeravailability">
                          Register Availability
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={`/instructorofferings/${userId}`}>
                          My Offerings
                        </Link>
                      </li>
                    </>
                  )}

                  {/* Links only for clients */}
                  {userRole === "client" && (
                    <>
                      <li>
                        <Link className="dropdown-item" to={`/clientbookings/${userId}`}>
                          My Bookings
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}