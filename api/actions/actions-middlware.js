// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

const checkActionById = (req, res, next) => {
  console.log("verifying action id...");
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({ status: 404, message: `no action with id ${id}` });
      }
    })
    .catch(next);
};

const checkActionPayload = (req, res, next) => {
  console.log("verifying Actions payload...");
  const newAction = req.body;

  if (!newAction.project_id || !newAction.description || !newAction.notes) {
    next({ status: 400, message: "action name and description required!" });
  } else if (newAction.description > 128) {
    next({ status: 400, message: "action description limit 128 chars" });
  } else {
    next();
  }
};

module.exports = {
  checkActionById,
  checkActionPayload,
};
