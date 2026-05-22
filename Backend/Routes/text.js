const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

const Text = require("../models/text");
const sendMail = require("./services/emailService");
const emailTemplate = require("./services/emailTemplate");

function getBaseUrl(req) {
    return `${req.protocol}://${req.get("host")}`;
}

function generateCode(length = 6){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for(let i=0; i<length; i++){
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
router.post("/" , async (req , res) => {
    try{
        const { text } = req.body;

        if(!text){
            return res.status(400).json({
                success: false,
                message:"Text required"
            })
        }
        let uniqueCode = generateCode();
        const qrCode = await QRCode.toDataURL(uniqueCode);

        const newText = await Text.create({
            text,
            code: uniqueCode,
            qrCode
        })

        res.status(202).json({
            success: true,
            code:uniqueCode,
            qrCode:newText.qrCode
        });
    }catch(err){
        console.log(err);

        res.status(500).json({
            sucess:false,
            message:"Server Error"
        });
    }
});

router.get("/:code", async(req,res) => {
    try{

        const textData = await Text.findOne({
            code: req.params.code
        })
        if(!textData){
            return res.status(404).json({
                success:false,
                message:"Text not found"
            })
        }
        res.json({
            success:true,
            text:textData.text
        });
        console.log(req.body);
        console.log(req.params);
    }catch(err){
        res.status(500).json({
            success:false
        })
    }
});

module.exports = router;

router.post("/send", async (req, res) => {
    try {
        const { code, emailTo, emailFrom } = req.body;

        if (!code || !emailTo || !emailFrom) {
            return res.status(422).send({ error: "All fields are required." });
        }

        const textData = await Text.findOne({ code });

        if (!textData) {
            return res.status(404).send({ error: "Text not found" });
        }

        const textLink = `${getBaseUrl(req)}/api/text/${textData.code}`;

        await sendMail({
            from: emailFrom,
            to: emailTo,
            subject: "Text shared using app",
            text: `${emailFrom} shared text with you. Code: ${textData.code}. Link: ${textLink}`,
            html: emailTemplate({
                emailFrom,
                downloadLink: textLink,
                expires: "24 hours",
                shareType: "text",
                buttonLabel: "View text",
                meta: `Use code ${textData.code} to view the text.`
            })
        });

        return res.send({ success: true });
    } catch (error) {
        return res.status(500).send({ error: "Unable to send email" });
    }
});