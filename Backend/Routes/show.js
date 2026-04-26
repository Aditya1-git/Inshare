const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const File = require('../models/file');

function getBaseUrl(req) {
    return `${req.protocol}://${req.get('host')}`;
}


router.get('/download/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });

        if (!file) {
            return res.status(404).send("File not found");
        }

        const filePath = path.join(__dirname, '..', file.path);

        if (!fs.existsSync(filePath)) {
            return res.status(404).render('download', { error: 'File not found.' });
        }

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
            downloadLink: `${getBaseUrl(req)}/files/download/${file.uuid}`
        });

    } catch (err) {
        console.error(err);
        return res.status(500).render("download", { error: 'Something went wrong.' });
    }
});

module.exports = router;