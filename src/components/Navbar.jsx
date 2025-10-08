import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  function handleLogout() {
    dispatch(logout());
    nav("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">Job Dashboard</div>
      <div className="navbar-right">
        <Link className="nav-link" to="/">
          Home
        </Link>
        {user ? (
          <>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
            <Link className="nav-link" to="/upload-resume">
              Upload Resume
            </Link>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
            <img
              className="avatar"
              src={user.photo ? user.photo : "https://via.placeholder.com/120"}
              alt="avatar"
            />
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
