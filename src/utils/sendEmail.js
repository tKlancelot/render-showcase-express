const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP (ex : Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendContactNotification = async ({ name, email, message }) => {
  const mailOptions = {
    from: `"Site Leviathan" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_NOTIFICATION_EMAIL,
    subject: '💌 Nouveau message de contact',
    text: `
      Nom: ${name}
      Email: ${email}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de notification envoyé.');
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email :', error);
  }
};

module.exports = sendContactNotification;
