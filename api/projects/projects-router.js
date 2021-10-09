// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { checkProjectById } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", checkProjectById, (req, res, next) => {
  res.status(200).json(req.project);
});

module.exports = router;
