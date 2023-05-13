const express = require("express");
const { User, Favorite } = require("../models");
const router = express.Router();

router.post("/favorites/:userId", (req, res, next) => {
  const { id, title, poster_path } = req.body;
  const { userId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      Favorite.findOrCreate({
        where: {
          movieId: id,
          title,
          poster_path,
        },
        include: { model: User },
      }).then((dataMovie) => {
        dataMovie[0].setUser(user);
        return res.status(201).send(dataMovie[0]);
      });
    })
    .catch(next);
});

router.get("/favorites/:userId", (req, res, next) => {
  const { userId } = req.params;
  Favorite.findAll({
    where: {
      userId: userId,
    },
  })
    .then((favorites) => res.status(200).send(favorites))
    .catch(next);
});

router.delete("/favorites/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  Favorite.findByPk(movieId)
    .then((movie) => {
      Favorite.destroy({
        where: {
          id: movie.id,
        },
      });
      return res.status(200).send(movie);
    })
    .catch(next);
});

module.exports = router;
