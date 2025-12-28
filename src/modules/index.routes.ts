import { Router } from "express";
import taskRouter from "./tasks/task.routes.js";

const ROUTER: Router = Router();

ROUTER.use("tasks", taskRouter);

export default ROUTER;