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

router.put("/:id", checkProjectById, checkProjectPayload, (req, res, next) => {
  const updatedProject = req.body;

  if (typeof updatedProject.completed === "boolean") {
    Projects.update(req.params.id, updatedProject)
      .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch(next);
  } else {
    next({
      status: 400,
      message: "project completed property required type boolean",
    });
  }
});

module.exports = router;
