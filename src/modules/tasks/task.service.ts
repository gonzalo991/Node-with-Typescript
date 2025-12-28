import { NotFoundException, UpdateException, ValidationException } from "../../error/app.exception.js";
import type { Task } from "./domain/task.js";
import type { createTaskDto } from "./dto/create-task.dto.js";
import type { updateTaskDto } from "./dto/update-task.dto.js";
import type { TaskRepository } from "./task.repository.js";

export class TaskService {
    private taskRepo: TaskRepository;

    constructor(repo: TaskRepository) {
        this.taskRepo = repo;
    }

    async findAllTasks(): Promise<Task[]> {
        return this.taskRepo.findAll();
    }

    async findTaskById(id: string): Promise<Task> {
        if (!id)
            throw new ValidationException(`Task id is required, id: ${id}`);

        const task: Task | null = await this.taskRepo.findById(id);

        if (!task)
            throw new NotFoundException(`Task with id: ${id} was not found.`);

        return task;
    }

    async createNewTask(data: createTaskDto): Promise<Task> {
        if (!data || Object.keys(data).length === 0)
            throw new ValidationException(`All fields are required to create a task. \nData: ${data}`);

        return this.taskRepo.create(data);
    }

    async update(id: string, data: updateTaskDto): Promise<Task> {
        if (!id)
            throw new ValidationException(`You must provide an id to update a task.`);

        if (!data || Object.keys(data).length === 0)
            throw new ValidationException("You need to provide at least one field to update the task.");

        const updated: Task | null = await this.taskRepo.update(id, data);

        if (!updated)
            throw new UpdateException(`Task was not updated something went wrong.`);

        return updated;
    }

    async delete(id: string): Promise<void> {
        await this.taskRepo.delete(id);
    }
}