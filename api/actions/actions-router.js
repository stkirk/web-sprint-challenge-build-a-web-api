// Write your "actions" router here!
const express = require("express");
const { checkActionById } = require("./actions-middlware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", checkActionById, (req, res, next) => {
  res.status(200).json(req.action);
});

module.exports = router;
