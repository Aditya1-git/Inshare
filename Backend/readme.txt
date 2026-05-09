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

---

##  What I Changed Recently

* Created a new text feature route in `Routes/text.js` under `/api/text`.
* Added text generation logic that creates a unique 6-character code for each saved text entry.
* Added QR code generation using the `qrcode` package so each generated code also has a QR image.
* Created the text database model in `models/text.js` to store `text`, `code`, and `qrCode`.
* Wired the new text route into the server in `server.js`.
* Added the `qrcode` dependency in `package.json`.
* Kept the existing file-sharing flow for uploads, download links, and email sharing.

---

##  What This New Text Route Does

* `POST /api/text` creates a new text record.
* It generates a unique code and a QR code for that code.
* `GET /api/text/:code` looks up the saved text by code and returns it.
* The route stores the generated data in MongoDB through the `Text` model.
