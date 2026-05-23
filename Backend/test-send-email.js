require('dotenv').config();
const sendMail = require('./Routes/services/emailService');

(async () => {
  try {
    await sendMail({
      from: 'tester@example.com',
      to: 'recipient@example.com',
      subject: 'Test email from inShare (debug)',
      text: 'Test plain text',
      html: '<p>Test HTML</p>'
    });
    console.log('Test send completed');
  } catch (err) {
    console.error('Test send failed', err);
    process.exit(1);
  }
})();
