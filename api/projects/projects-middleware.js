// add middlewares here related to projects
const Projects = require("./projects-model");

const checkProjectById = (req, res, next) => {
  console.log("verifying project id...");
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        next({ status: 404, message: `no project with id ${id}` });
      }
    })
    .catch(next);
};

const checkProjectPayload = (req, res, next) => {
  console.log("verifying projects payload...");
  const newProject = req.body;
  if (!newProject.name || !newProject.description) {
    next({ status: 400, message: "project name and description required!" });
  } else {
    next();
  }
};

module.exports = {
  checkProjectById,
  checkProjectPayload,
};
