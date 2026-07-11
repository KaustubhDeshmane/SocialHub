<div align="center">

# 📸 SocialHub

### A Modern Full-Stack Social Media Web Application

Share • Discover • Connect

![GitHub stars](https://img.shields.io/github/stars/KaustubhDeshmane/SocialHub?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/KaustubhDeshmane/SocialHub?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/KaustubhDeshmane/SocialHub?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/KaustubhDeshmane/SocialHub?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/KaustubhDeshmane/SocialHub?style=for-the-badge)

</div>

---

### 🚀 Live Demo

**Coming Soon**

---

## 📖 Overview

**SocialHub** is a full-stack social media application that enables users to upload, browse, search, and manage image posts through an intuitive and responsive interface.

The application features secure cloud-based image storage using **Cloudinary**, a **MongoDB** database for post management, and a modern **React + Express** architecture for a seamless user experience.

---

## ✨ Features

- 📸 Upload images with captions
- ☁️ Cloudinary image hosting
- 👤 Username-based posting
- 🔍 Search posts by username
- 🗑️ Delete uploaded posts
- 📷 Capture and upload photos directly from the webcam
- 📱 Responsive interface
- ⚡ Fast REST API using Express.js
- 💾 MongoDB database integration
- 🎨 Modern and clean user interface

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Axios
- React Icons
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Multer
- Cloudinary
- CORS
- dotenv

---

## 📂 Project Structure

```text
SocialHub/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   └── my-app/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── .env.example
│
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/KaustubhDeshmane/SocialHub.git
```

### Navigate to the project

```bash
cd SocialHub
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`

Run the backend

```bash
npm start
```

---

## 💻 Frontend Setup

```bash
cd frontend/my-app
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

```env
PORT=

MONGO_URI=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/upload` | Upload a new post |
| GET | `/files` | Fetch all posts |
| GET | `/files?username=<username>` | Search posts |
| DELETE | `/delete/:id` | Delete a post |

---

## 🌟 Future Enhancements

- User Authentication
- Like & Comment System
- User Profiles
- Infinite Scrolling Feed
- Dark Mode
- Edit Post
- Image Preview
- Real-time Notifications
- Post Sharing
- Responsive Mobile Enhancements

---

## 🤝 Contributing

Contributions are always welcome!

If you'd like to improve **SocialHub**, feel free to:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

## ⭐ Support

If you found this project helpful, consider giving it a **Star** on GitHub. It helps support the project and motivates future improvements.

---

## 🚀 Live Demo

Coming Soon

---

## 👨‍💻 Author

### Kaustubh Deshmane

---

## 📬 Contact

### Feel free to reach out!!

If you have suggestions, ideas, feedback, or would like to collaborate, don't hesitate to get in touch.

I'm always happy to connect with fellow developers and open-source contributors.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ Thanks for visiting SocialHub!

Made with ❤️ by **Kaustubh Deshmane**

</div>
