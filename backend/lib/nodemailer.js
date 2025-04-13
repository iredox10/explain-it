import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD, // Use app-specific password
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendPasswordResetEmail = (userEmail, resetToken) => {
  const url = `http://localhost:3000/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Password Reset",
    html: `Click <a href=${url}>here</a> to reset your password`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(`Err sending email ${err}`);
    }
    console.log(`Email sent: ${info.response}`);
  });
};
