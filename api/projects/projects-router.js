// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const {
  checkProjectById,
  checkProjectPayload,
} = require("./projects-middleware");

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

router.post("/", checkProjectPayload, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

module.exports = router;
