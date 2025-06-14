module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mainPicture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
    // autres colonnes
  }, {
    tableName: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
    });
  };

  return User;
};
