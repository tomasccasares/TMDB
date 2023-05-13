const User = require("./users");
const S = require("sequelize");
const Favorite = require("./favorites");
const db = require("../config");
const Tv = require("./Tv");

Tv.belongsTo(User);
User.hasMany(Tv);

Favorite.belongsTo(User);
User.hasMany(Favorite);
Favorite.hasOne(User);

module.exports = { User, Favorite, Tv };
