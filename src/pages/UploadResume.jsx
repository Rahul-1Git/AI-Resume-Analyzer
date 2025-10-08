import React, { useState } from "react";
import axios from "../api/axiosConfig";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Select a resume file first");
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("resume", file);

      const resp = await axios.post("/uploads/resume", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(resp.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }
  function formatResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<h2 >$1</h2>") // Convert **Heading:** to <h2>
      .replace(/\n\* (.*?)(?=\n|$)/g, "<li>$1</li>") // Convert * items to <li>
      .replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>") // Wrap <ul> around li items
      .replace(/\n/g, "<br/>"); // Convert newlines to <br/>
  }

  return (
    <div className="upload-container">
      <h2>Upload Resume</h2>

      <form className="upload-form" onSubmit={handleUpload}>
        <input
          className="file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="upload-button" disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </form>

      {error && <div className="error-text">{JSON.stringify(error)}</div>}

      {result && (
        <div className="result-container">
          <h3>Analysis Result</h3>
          <div
            className="analysis-output"
            dangerouslySetInnerHTML={{
              __html: formatResponse(result.answer),
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
