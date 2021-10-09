const express = require("express");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

// Configure your server here
const server = express();

//Global middlewares:
server.use(express.json());
// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", actionsRouter);
// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", projectsRouter);

//Home endpoint
server.get("/", (req, res) => {
  res.send(`
        <h1>Sprint Challenge</h1>
        <h4>Build a Web API endpoints:</>
        <ul>
            <li>/api/projects</li>
            <li>/api/actions</li>
        </ul>
    `);
});

//Catchall endpoint:
server.use("*", (req, res, next) => {
  console.log(`Catchall hit by --> ${req.method} ${req.baseUrl}`);
  next({ status: 404, message: "not found" });
});

//Error handling middleware:
server.use((err, req, res, next) => {
  console.log(err);

  res
    .status(err.status || 500)
    .json({ message: `Something went wrong ${err.status} ${err.message}` });
});

module.exports = server;
