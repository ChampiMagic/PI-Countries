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
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    season: {
      type:DataTypes.ENUM("Spring", "Summer", "Fall", "Winter"),
      allowNull: false,
    }

  }, {
    timestamps: false
  })
}
