import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

/**
 * Sends an email using nodemailer.
 * If SMTP environment variables are missing, it falls back to creating a dynamic
 * Ethereal Mail test account, allowing you to preview the email sent.
 * 
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @returns {Promise<Object>} info - Nodemailer send result information
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  let transporter;
  let isFallback = false;

  const hasSmtpConfig = 
    process.env.SMTP_HOST && 
    process.env.SMTP_PORT && 
    process.env.SMTP_USER && 
    process.env.SMTP_USER !== 'your_email@gmail.com' &&
    process.env.SMTP_PASS &&
    process.env.SMTP_PASS !== 'your_app_password';

  if (hasSmtpConfig) {
    console.log('Using configured SMTP settings from environment...');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    console.log('No SMTP config found in env. Setting up Ethereal Mail fallback...');
    isFallback = true;
    try {
      // Create a test account on Ethereal Mail
      const testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (err) {
      console.error('Failed to create Ethereal SMTP test account:', err);
      throw new Error('Email configuration missing and Ethereal fallback failed.');
    }
  }

  const mailOptions = {
    from: process.env.FROM_EMAIL || '"Estacy Real Estate" <noreply@estacy.com>',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    
    if (isFallback) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('----------------------------------------------------');
      console.log('📧 TEST EMAIL SENT SUCCESSFULLY!');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Preview URL: ${previewUrl}`);
      console.log('----------------------------------------------------');
      // Append the preview URL to the return info so the caller can return it
      info.previewUrl = previewUrl;
    } else {
      console.log(`Email sent successfully to ${to} (MessageID: ${info.messageId})`);
    }

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
