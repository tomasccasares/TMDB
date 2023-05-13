const S = require("sequelize");
const db = require("../config");

class Tv extends S.Model {}

Tv.init(
  {
    tvId: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    poster_path: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "tv",
  }
);

module.exports = Tv;