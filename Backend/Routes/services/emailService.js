const nodemailer = require('nodemailer');


async function sendMail({from , to , subject , text , html}){
    let transporter  = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: parseInt(process.env.MAILTRAP_PORT, 10) || 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        // improve diagnostics and resilience
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        logger: true,
        debug: true,
        tls: {
            // Allow self-signed certs in restrictive environments
            rejectUnauthorized: false
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
    // Rethrow so callers can detect failures and react accordingly
    throw err;
}
}

module.exports = sendMail;