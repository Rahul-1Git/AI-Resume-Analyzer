import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { token } = useSelector((s) => s.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("age", form.age);
      data.append("email", form.email);
      data.append("password", form.password);
      if (photoFile) data.append("photo", photoFile);

      const resp = await axios.post("/user/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(
        setCredentials({ user: resp.data.user, token: resp.data.token })
      );

      nav("/profile");
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">
      <h2>SignUp</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          name="age"
          type="text"
          placeholder="Age"
          value={form.age}
          onChange={onChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />

        <label className="file-label">
          Photo (optional)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />
        </label>

        <button disabled={loading} className="signup-button">
          {loading ? "Creating..." : "Signup"}
        </button>

        {error && <div className="error-text">{JSON.stringify(error)}</div>}
      </form>
    </div>
  );
}
