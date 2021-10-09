// Write your "actions" router here!
const express = require("express");
const { checkActionById, checkActionPayload } = require("./actions-middlware");
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

router.post("/", checkActionPayload, (req, res, next) => {
  Actions.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", checkActionById, checkActionPayload, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch(next);
});

router.delete("/:id", checkActionById, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: `action with id ${req.params.id} nuked` });
    })
    .catch(next);
});

module.exports = router;
