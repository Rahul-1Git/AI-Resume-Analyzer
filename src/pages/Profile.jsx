import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";

export default function Profile() {
  const { user, token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const resp = await axios.get("/user/profile");
        if (resp.data) {
          const updatedUser = resp.data.user || resp.data;
          dispatch(setCredentials({ user: updatedUser, token }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchProfile();
  }, [token, dispatch]);

  if (!token) return <div>Please login to view profile.</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : (
        user && (
          <div className="profile-card">
            <img
              className="profile-avatar"
              src={user.photo ? user.photo : "https://via.placeholder.com/120"}
              alt="avatar"
            />

            <div className="profile-details">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
