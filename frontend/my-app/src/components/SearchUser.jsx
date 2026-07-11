import React, { useState } from "react";
import axios from "axios";
import "./Styles.css";

function SearchUser() {
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!username.trim()) return;

    axios
      .get(`http://localhost:3000/files?username=${username}`)
      .then((response) => {
        setSearchResults(response.data);
        setError("");
        setSearched(true);
      })
      .catch(() => {
        setError("Unable to fetch posts.");
        setSearchResults([]);
        setSearched(true);
      });
  };

  return (
    <div className="search-user-container">
      <h2 style={{ marginBottom: "20px" }}>Search Posts</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />

        <button
          onClick={handleSearch}
          className="search-btn"
        >
          Search
        </button>
      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <div className="search-results">

        {searched && searchResults.length === 0 && !error && (
          <div
            style={{
              marginTop: "25px",
              background: "#fff",
              padding: "25px",
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            <h3>No Posts Found</h3>
            <p style={{ color: "#6b7280", marginTop: "8px" }}>
              Try another username.
            </p>
          </div>
        )}

        <div className="posts-grid">
          {searchResults.map((file) => (
            <div key={file._id} className="post-card">

              <div className="post-image-container">
                <img
                  src={file.file_url}
                  alt={file.file_name}
                  className="post-image"
                />
              </div>

              <div className="post-footer">

                <h4 style={{ marginBottom: "8px" }}>
                  @{file.username}
                </h4>

                <p className="post-caption">
                  {file.caption}
                </p>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default SearchUser;