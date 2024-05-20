const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authenticateUser } = require("../middleware/authentication");

//Task Routes - simplified for now
router.get("/", taskController.getAllTasks);

router.get("/:id", authenticateUser, taskController.getTask);
router.post("/", authenticateUser, taskController.createTask);
//edit task and delete task
router.patch("/:id", authenticateUser, taskController.updateTask);

router.patch(
  "/completed/:id",
  authenticateUser,
  taskController.updateCompleted
);

router.delete("/:id", authenticateUser, taskController.deleteTask);

module.exports = router;
