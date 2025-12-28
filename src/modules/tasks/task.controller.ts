import { Router } from "express";
import { TaskService } from "./task.service.js";
import type { Request, Response, NextFunction } from "express-serve-static-core";
import type { Task } from "./domain/task.js";
import { ValidationException } from "../../error/app.exception.js";

export class TaskController {
    public readonly router: Router;
    private readonly taskService: TaskService;

    constructor(taskService: TaskService) {
        this.router = Router();
        this.taskService = taskService;
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get("/", this.findAll);
        this.router.get("/:id", this.findById);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }

    private findAll = async (
        _req: Request,
        res: Response,
        next: NextFunction): Promise<void> => {
        try {
            const tasks: Task[] = await this.taskService.findAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    private findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id)
                throw new ValidationException(`You need to provide the id to find a task.`);

            const task: Task = await this.taskService.findTaskById(id);

            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const task: Task = await this.taskService.createNewTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id)
                throw new ValidationException(`Id not found to update the task.`);

            const updated: Task = await this.taskService.update(id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id)
                throw new ValidationException(`Couldnt delete the task because id was not found.`);

            await this.taskService.delete(id);
            res.status(204).send("Task deleted successfully.");
        } catch (error) {
            next(error);
        }
    }
}