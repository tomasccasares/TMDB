const S = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../config");

class User extends S.Model {
  addToFav(movie) {
    return [...this.favorites, movie.toString()];
  }

  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isStrongPassword: {
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        },
      },
    },
    salt: {
      type: S.STRING,
    },
    fullName: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    imgURL : {
      type: S.STRING,
      allowNull: true
    }
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
