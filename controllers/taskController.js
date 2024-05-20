const Task = require("../models/Tasks");

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find().sort({ createdAt: "desc" }).lean();
      if (!tasks) {
        res.status(404).json({ message: "tasks not found" });
      }
      res.status(200).json({ tasks: tasks });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", errorMessage: err.message });
    }
  },
  getTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        res.status(404).json({ message: "task with this id does not exist" });
      }
      res.status(200).json({
        task: task,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", errorMessage: err.message });
    }
  },
  createTask: async (req, res) => {
    const { title, description } = req.body;
    const { userId, name } = req.user;

    try {
      if (typeof title !== "string") {
        return res
          .status(400)
          .json({ message: "Please provide a valid entry for the title" });
      }
      if (typeof description !== "string") {
        return res.status(400).json({
          message: "Please provide a valid entry for the description",
        });
      }
      await Task.create({
        title: title,
        description: description,
        createdById: userId,
        createdBy: name,
        createdAt: new Date().getTime(),
      });
      console.log("Task has been added!");
      res
        .status(201)
        .json({ message: "Task is successfully added to database" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", errorMessage: err.message });
    }
  },

  // Update Task Title and Description
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const checkTask = await Task.findById({ _id: id });
    if (!checkTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (checkTask.completed == true) {
      res
        .status(400)
        .json({ message: "Can't edit a task that is already completed" });
    }
    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description },
        { new: true, runValidators: true }
      );

      res.json({ task: task, message: "Changes effected successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong", errorMessage: error.message });
    }
  },

  // Update completed to change it from false to true when a task is completed
  updateCompleted: async (req, res) => {
    const { id } = req.params;
    const completed = req.body;
    if (typeof completed !== "boolean") {
      res
        .status(400)
        .json({ message: "Completed has to be either true or false" });
    }
    const checkTask = await Task.findById({ _id: id });
    if (!checkTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    try {
      const task = await Task.findByIdAndUpdate(id, completed, {
        new: true,
        runValidators: true,
      });

      res
        .status(200)
        .json({ task: task, message: "completed has been changed to true" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", errorMessage: err.message });
    }
  },

  //Delete Task
  deleteTask: async (req, res) => {
    try {
      // Find post by id
      let task = await Task.findById({ _id: req.params.id });
      // Delete post from db
      if (!task) {
        return res.status(404).send({ message: "Task not found" });
      }
      await Task.remove({ _id: req.params.id });
      res
        .status(200)
        .json({ message: "Task is successfully deleted from database" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", errorMessage: err.message });
    }
  },
};
