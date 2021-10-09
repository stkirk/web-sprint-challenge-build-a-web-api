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

module.exports = {
  checkProjectById,
};
