const express = require("express");
const User = require("../models/users");
const router = express.Router();
const { generateToken, validateToken } = require("../config/tokens");
const Favorite = require("../models/favorites");
const { validateAuth } = require("../middleware/auth");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/favorites/:id", async (req, res, next) => {
  try {
    const userFavorites = await Favorite.findAll({
      where: { userId: req.params.id },
    });
    res.status(200).send(userFavorites);
  } catch (error) {
    next(error);
  }
});

router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user) return res.send(401);
      user.validatePassword(password).then((isValidate) => {
        if (!isValidate) return res.status(401);
        const payload = {
          fullName: user.fullName,
          email: user.email,
          id: user.id,
        };
        const newToken = generateToken(payload);

        res.cookie("token", newToken);
        return res.status(200).send(payload);
      });
    })
    .catch(next);
});

router.get('/me', validateAuth, (req, res) => {
  res.send(req.user)
})

router.use("/", function (req, res) {
  res.status(404);
});

module.exports = router;
