const S = require("sequelize");
const db = require("../config");

class Favorite extends S.Model {}

Favorite.init(
  {
    movieId: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: S.STRING,
      allowNull: false,
    },
    poster_path: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "favorite",
  }
);

module.exports = Favorite;
