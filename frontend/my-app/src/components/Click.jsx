import React, { useRef, useState } from "react";
import axios from "axios";
import "./Click.css";

const Click = ({ onClose, onUpload }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [photoTaken, setPhotoTaken] = useState(false);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
    } catch (error) {
      alert("Unable to access camera.");
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    video.srcObject.getTracks().forEach((track) => track.stop());

    setPhotoTaken(true);
  };

  const handleSubmit = async () => {
    if (!username.trim() || !caption.trim()) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    const imageData = canvasRef.current.toDataURL("image/png");

    const blob = await (await fetch(imageData)).blob();

    const formData = new FormData();

    formData.append("file", blob, "photo.png");
    formData.append("username", username);
    formData.append("caption", caption);

    try {
      await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpload();
      onClose();

    } catch (error) {
      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <div className="create-post-container">

      <h2>Camera Upload</h2>

      <video
        ref={videoRef}
        autoPlay
        style={{
          display: photoTaken ? "none" : "block",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          display: photoTaken ? "block" : "none",
        }}
      />

      {!photoTaken ? (
        <>
          <button
            className="upload-button"
            onClick={startCamera}
          >
            Start Camera
          </button>

          <button
            className="upload-button"
            onClick={takePhoto}
          >
            Capture Photo
          </button>
        </>
      ) : (
        <>
          <input
            className="text-input"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <textarea
            className="caption-input"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) =>
              setCaption(e.target.value)
            }
          />

          <button
            className="upload-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </>
      )}

    </div>
  );
};

export default Click;