// src/models/pageSetting.js
module.exports = (sequelize, DataTypes) => {
  const PageSetting = sequelize.define('PageSetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'La clé ne peut pas être vide.' },
      },
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La valeur ne peut pas être vide.' },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'text',
      validate: {
        isIn: {
          args: [['text', 'image', 'json']],
          msg: "Le type doit être 'text', 'image' ou 'json'.",
        },
      },
    },
    image: {  // Ajout du champ image
      type: DataTypes.STRING,
      allowNull: true, // L'image peut être nulle
    },
  }, {
    tableName: 'page_settings',
    timestamps: true,
  });

  return PageSetting;
};
