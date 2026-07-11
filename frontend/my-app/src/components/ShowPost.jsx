import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles.css";

function ShowPost({ refreshTrigger }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const fetchFiles = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/files`)
      .then((response) => setFiles(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this post?")) return;

    axios
      .delete(`${import.meta.env.VITE_API_URL}/delete/${id}`)
      .then(() => fetchFiles())
      .catch((error) => console.error(error));
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <div className="show-posts-container">
      <h2>Latest Posts</h2>

      {files.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "18px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          <h3>📷 No Posts Yet</h3>
          <p style={{ marginTop: "10px", color: "#6b7280" }}>
            Upload your first photo to get started.
          </p>
        </div>
      ) : (
        <div className="posts-grid">
          {files.map((file) => (
            <div key={file._id} className="post-card">
              <div className="post-image-container">
                <img
                  src={file.file_url}
                  alt={file.file_name}
                  className="post-image"
                />
              </div>

              <div className="post-footer">
                <h4
                  style={{
                    marginBottom: "8px",
                    color: "#111827",
                  }}
                >
                  @{file.username}
                </h4>

                <p className="post-caption">{file.caption}</p>

                <p className="post-time">
                  {formatTime(file.upload_time)}
                </p>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(file._id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowPost;