// add middlewares here related to actions
const Actions = require("./actions-model");

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

module.exports = {
  checkActionById,
};
