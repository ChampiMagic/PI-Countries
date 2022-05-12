const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.TEXT,
    },
    season: {
      type:DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
    }

  }, {
    timestamps: false
  })
}
