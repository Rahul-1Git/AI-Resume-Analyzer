import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UploadResume from "./pages/UploadResume";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="home-container">
              <h1>Welcome to Smart Resume Analyzer</h1>

              <p>
                This application helps job seekers understand how well their
                resume matches current industry expectations using AI-powered
                analysis.
              </p>

              <div className="feature-section">
                <h2>✨ What You Can Do Here</h2>
                <ul>
                  <li>
                    <strong>Upload Your Resume</strong> in PDF or DOC format.
                  </li>
                  <li>
                    <strong>Get AI Suggestions</strong> on the best job roles
                    suited for your profile.
                  </li>
                  <li>
                    <strong>Receive Improvement Tips</strong> to enhance resume
                    quality and increase hiring chances.
                  </li>
                  <li>
                    <strong>Create an Account</strong> with secure token-based
                    authentication.
                  </li>
                  <li>
                    <strong>Upload a Profile Picture</strong> during signup for
                    personalization.
                  </li>
                  <li>
                    <strong>View & Manage Your Profile</strong> anytime after
                    login.
                  </li>
                </ul>
              </div>

              <div className="security-note">
                <h2>🔒 Your Data is Safe</h2>
                <p>
                  Passwords are securely stored using hashed encryption, and all
                  access is protected via token-based authentication. Your data
                  remains private and accessible only to you.
                </p>
              </div>

              <div className="cta-section">
                <h3>Ready to Supercharge Your Career?</h3>
                <p>
                  Get started by creating an account or logging in to upload
                  your resume!
                </p>
              </div>
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
      </Routes>
    </div>
  );
}
