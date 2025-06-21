module.exports = (sequelize, DataTypes) => {
  const ContactMessage = sequelize.define('ContactMessage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le nom est requis.' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'L\'adresse e-mail doit être valide.' },
        notEmpty: { msg: 'L\'adresse e-mail est requise.' }
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le message ne peut pas être vide.' }
      }
    }
  }, {
    tableName: 'contact_messages',
    timestamps: true
  });

  return ContactMessage;
};
