const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
}).single("myfile");

router.post("/", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        if (!req.file) {
            return res.json({ error: "All fields are required." });
        }

        try {
            const file = new File({
                filename: req.file.filename,
                uuid: uuidv4(),
                path: `uploads/${req.file.filename}`,
                size: req.file.size,
            });

            const response = await file.save();

            return res.json({
                file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
            });

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    });
});

router.post("/send", async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body;

    if (!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required.' });
    }

    const file = await File.findOne({ uuid });

    if (!file) {
        return res.status(404).send({ error: "File not found" });
    }

    if (file.sender) {
        return res.status(422).send({ error: 'Email already sent' });
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    await file.save();

    const sendMail = require('./services/emailService');

    await sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'File shared using app',
        text: `${emailFrom} shared a file with you`,
        html: require('../Routes/services/emailTemplate')({
            emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size / 1000) + 'KB',
            expires: '24 hours'
        })
    });

    return res.send({ success: true });
});

module.exports = router;