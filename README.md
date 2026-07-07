# 📁 InShare

InShare is a full-stack file and text sharing application that allows users to securely share files or text using unique links, short codes, QR codes, and email. The project combines a static frontend with a Node.js/Express backend, MongoDB for metadata storage, and a server-rendered download page.

---

## ✨ Features

### 📂 File Sharing
- Upload files up to **100 MB**
- Generate unique shareable links
- Download files through a dedicated download page
- Send file links directly via email

### 📝 Text Sharing
- Share text instantly
- Generate unique 6-character short codes
- QR code generation for quick access
- Retrieve shared text using the generated code
- Email shared text links

### 📧 Email Integration
- Send both file and text links through email
- Beautiful HTML email templates using Nodemailer

### 🎨 User Experience
- Drag & Drop file upload
- Upload progress indicator
- Copy share links with one click
- Responsive interface
- Toggle between File Sharing and Text Sharing modes

---

# 🏗️ Project Architecture

```
InShare/
│
├── FrontEnd/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── Backend/
    ├── config/
    ├── models/
    ├── Routes/
    ├── services/
    ├── public/
    ├── uploads/
    ├── views/
    ├── server.js
    └── package.json
```

The application follows a hybrid architecture:

- **Frontend** provides the user interface using HTML, CSS, and JavaScript.
- **Backend** exposes REST APIs for uploads, downloads, text sharing, QR generation, and email services.
- **MongoDB** stores metadata for uploaded files and shared text.
- **EJS** renders the download page for recipients.

---

# 🚀 Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Nodemailer
- UUID
- QRCode
- EJS
- CORS
- dotenv

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/Aditya1-git/Inshare
```

## Install backend dependencies

```bash
cd Backend
npm install
```

## Configure Environment Variables

Create a `.env` file inside the Backend directory.

Example:

```env
PORT=3000

MONGO_CONNECTION_URL=your_mongodb_connection

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

ALLOWED_CLIENTS=http://localhost:5500,http://localhost:3000
```

## Start the server

```bash
npm start
```

Open the frontend by serving the `FrontEnd` folder using Live Server or any static web server.

---

# 📂 File Sharing Workflow

1. Select or drag a file into the upload area.
2. Upload the file to the server.
3. A unique shareable link is generated.
4. Copy the link or send it through email.
5. Recipients open the link.
6. Download the file from the generated download page.

---

# 📝 Text Sharing Workflow

1. Switch to **Text Sharing** mode.
2. Enter the text to share.
3. Generate a unique short code.
4. Receive:
   - Short code
   - QR Code
   - Shareable link
5. Anyone with the code or link can retrieve the shared text.

---

# 📡 API Endpoints

## File APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/files` | Upload file |
| POST | `/api/files/send` | Send file link through email |

## Download APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/files/:uuid` | Download page |
| GET | `/files/download/:uuid` | Download file |

## Text APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/text` | Create text share |
| GET | `/api/text/:code` | Retrieve shared text |
| POST | `/api/text/send` | Email text share |

---

# 📸 Screenshots

Add screenshots here.

<img width="1918" height="1092" alt="image" src="https://github.com/user-attachments/assets/49ed8a90-9412-43f4-b476-dc5a22b599f3" />
<img width="1918" height="1096" alt="image" src="https://github.com/user-attachments/assets/ad60b723-ecf9-407b-8d9d-48beeae46527" />



---

# 🔮 Future Improvements

- User authentication
- Password-protected file sharing
- File expiration enforcement
- Cloud storage integration (AWS S3, Cloudinary)
- Drag-and-drop multiple file uploads
- Rate limiting and abuse protection
- Download analytics
- File preview support
- Improved QR sharing experience

---

# ⚠️ Current Limitations

- No authentication or authorization
- Files are stored locally
- No enforced expiration for shared files
- Hardcoded backend URL in frontend
- No rate limiting
- Possible short-code collision for text sharing
- Local storage is not suitable for production-scale deployments

---

# 📚 What I Learned

This project helped me gain practical experience with:

- REST API development
- Express.js routing
- MongoDB and Mongoose
- File uploads using Multer
- Email integration with Nodemailer
- QR code generation
- Server-side rendering with EJS
- Frontend and backend integration
- Building full-stack applications

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aditya Raj**

Built as a full-stack web application to explore file sharing, text sharing, QR code generation, email integration, and backend development using the MERN ecosystem.
