const { ContactMessage } = require('../db/sequelize');
const verifyToken = require('../auth/verifyToken');
const sendContactNotification = require('../utils/sendEmail');

module.exports = (app) => {
  // ✅ Créer un message (public) + envoi de l'email
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    try {
      const newMessage = await ContactMessage.create({ name, email, message });

      // 🔔 Envoi de l'email de notification à l'admin
      await sendContactNotification({ name, email, message });

      res.status(201).json({
        message: 'Votre message a été envoyé avec succès.',
        data: newMessage
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' });
    }
  });

  // 🔒 Lire tous les messages
  app.get('/api/contact', verifyToken, async (req, res) => {
    try {
      const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
      res.status(200).json({ data: messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Impossible de récupérer les messages.' });
    }
  });

  // 🔒 Lire un seul message
  app.get('/api/contact/:id', verifyToken, async (req, res) => {
    try {
      const message = await ContactMessage.findByPk(req.params.id);
      if (!message) {
        return res.status(404).json({ message: 'Message non trouvé.' });
      }
      res.status(200).json({ data: message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du message.' });
    }
  });

  // 🔒 Supprimer un message
  app.delete('/api/contact/:id', verifyToken, async (req, res) => {
    try {
      const count = await ContactMessage.destroy({ where: { id: req.params.id } });
      if (count === 0) {
        return res.status(404).json({ message: 'Message non trouvé.' });
      }
      res.status(200).json({ message: 'Message supprimé avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression du message.' });
    }
  });
};
