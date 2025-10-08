import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function Login() {
  const [form, setForm] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const nav = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await axios.post("/user/login", form);
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
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          type="text"
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
        />
        <button disabled={loading} className="login-button">
          {loading ? "Logging..." : "Login"}
        </button>
        {error && <div className="error-text">{JSON.stringify(error)}</div>}
      </form>
    </div>
  );
}
