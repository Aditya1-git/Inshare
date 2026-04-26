const express = require('express');
const router = express.Router();
const path = require('path');
const File = require('../models/file');


router.get('/download/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });

        if (!file) {
            return res.status(404).send("File not found");
        }

        const filePath = path.join(__dirname, '..', file.path);
        return res.download(filePath);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error downloading file");
    }
});


router.get('/:uuid', async (req,res) => {
    console.log("HIT:", req.params.uuid);

    try {
        const file = await File.findOne({ uuid: req.params.uuid });

        if (!file) {
            return res.render("download", { error: 'Link has expired.' });
        }

        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });

    } catch (err) {
        console.error(err);
        return res.render("download", { err: 'something went wrong' });
    }
});

module.exports = router;