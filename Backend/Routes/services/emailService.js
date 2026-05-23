const nodemailer = require('nodemailer');


async function sendMail({from , to , subject , text , html}){
    const smtpPorts = [parseInt(process.env.MAILTRAP_PORT, 10) || 587, 2525, 465];
    let lastError;

    for (const port of smtpPorts) {
        let transporter  = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
            port,
            secure: port === 465,
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

            console.log("Email sent:", info.messageId, "using port", port);
            return;
        } catch (err) {
            lastError = err;
            console.error(`Email error on port ${port}:`, err);
        }
    }

    throw lastError;
}

module.exports = sendMail;