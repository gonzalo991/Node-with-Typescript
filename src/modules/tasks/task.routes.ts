import type { Router } from "express";
import { TaskController } from "./task.controller.js";
import { TaskRepositoryImpl } from "./task.repository.impl.js";
import { TaskService } from "./task.service.js";

const taskRepository = new TaskRepositoryImpl();
const taskService = new TaskService(taskRepository);
const taskController: TaskController = new TaskController(taskService);
const taskRouter: Router = taskController.router;

export default taskRouter;