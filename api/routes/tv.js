const express = require("express");
const { Tv, User } = require("../models");
const router = express.Router();

router.post("/favorites/:userId", (req, res, next) => {
  const { id, name, poster_path } = req.body;
  const { userId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      Tv.findOrCreate({
        where: {
          tvId: id,
          title: name,
          poster_path,
        },
        include: { model: User },
      }).then((dataTv) => {
        dataTv[0].setUser(user);
        return res.status(201).send(dataTv[0]);
      });
    })
    .catch(next);
});

router.get("/favorites/:userId", (req, res, next) => {
  const { userId } = req.params;
  Tv.findAll({
    where: {
      userId: userId,
    },
  })
    .then((favorites) => res.status(200).send(favorites))
    .catch(next);
});

router.delete("/favorites/:tvId", (req, res, next) => {
  const { tvId } = req.params;
  Tv.findByPk(tvId)
    .then((tv) => {
      Tv.destroy({
        where: {
          id: tv.id,
        },
      });
      return res.status(200).send(tv);
    })
    .catch(next);
});

module.exports = router;
