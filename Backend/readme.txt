# 📁 File Sharing App

A simple file sharing web application where users can upload files, generate a shareable link, and optionally send the link via email.

---

##  Features

* Upload files (drag & drop or browse)
* Generate unique shareable download links
* Download files via link
* Send file links through email
* Upload progress indicator
* File metadata stored in MongoDB

---

##  Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **File Upload:** Multer
* **Email Service:** Nodemailer (Mailtrap)
* **Frontend:** HTML, CSS, JavaScript
* **Templating:** EJS

---

##  Project Structure

```
Backend/
  server.js
  config/
  models/
  Routes/
  uploads/
  views/

FrontEnd/
  index.html
  script.js
  style.css
```

---

##  Setup Instructions

1. Clone the repository

```bash
git clone <your-repo-url>
cd Backend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```env
PORT=3000
APP_BASE_URL=http://localhost:3000
MONGO_CONNECTION_URL=your_mongodb_url
MAILTRAP_HOST=************
MAILTRAP_PORT=2525
MAIL_USER=your_user
MAIL_PASS=your_pass
```

4. Run the server

```bash
npm run dev
```

---

##  How It Works

1. User uploads a file
2. Server stores file + metadata
3. Unique link is generated
4. User shares link or sends via email
5. Recipient downloads the file

---

##  Limitations

* No automatic file expiration cleanup
* Files stored locally (not cloud)
* Mailtrap has email limits (~300 emails)

---

##  Future Improvements

* File expiration system
* Cloud storage (Cloudinary / AWS S3)
* Better validation & error handling
* Production-ready deployment

---
##  Summary

This project demonstrates a complete file-sharing workflow using a Node.js backend and simple frontend, including upload handling, link generation, and email sharing.
