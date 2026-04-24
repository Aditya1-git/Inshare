const nodemailer = require('nodemailer');


async function sendMail({from , to , subject , text , html}){
    let transporter  = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        PORT: process.env.MAILTRAP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }

    });
    try {
    let info = await transporter.sendMail({
        from: `Inshare <${process.env.MAIL_USER}>`,
        to,
        subject,
        text,
        html,
        replyTo: from
    });

    console.log("Email sent:", info.messageId);
} catch (err) {
    console.error("Email error:", err);
}
}

module.exports = sendMail;