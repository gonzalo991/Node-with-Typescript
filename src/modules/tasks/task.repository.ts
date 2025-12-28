import type { Task } from "./domain/task.js";
import type { createTaskDto } from "./dto/create-task.dto.js";
import type { updateTaskDto } from "./dto/update-task.dto.js";

export interface TaskRepository {
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;

    create(data: createTaskDto): Promise<Task>;
    update(id: string, task: updateTaskDto): Promise<Task | null>;
    delete(id: string): Promise<void>;
}