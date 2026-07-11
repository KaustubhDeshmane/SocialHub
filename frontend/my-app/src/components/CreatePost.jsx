import React, { useState } from "react";
import axios from "axios";
import "./Styles.css";

function CreatePost(props) {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !username.trim() || !caption.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);
    formData.append("caption", caption);

    try {
      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Post uploaded successfully!");

      props.setRefreshTrigger((prev) => prev + 1);

      setUsername("");
      setCaption("");
      setFile(null);

      document.querySelector(".file-input").value = "";
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit} className="upload-form">

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-input"
        />

        <textarea
          placeholder="Write something about your photo..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept="image/*"
        />

        {file && (
          <p
            style={{
              fontSize: ".9rem",
              color: "#6b7280",
              textAlign: "center",
            }}
          >
            📷 {file.name}
          </p>
        )}

        <button
          type="submit"
          className="upload-button"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Post"}
        </button>

      </form>

      {message && (
        <p className="message">
          {message}
        </p>
      )}
    </div>
  );
}

export default CreatePost;