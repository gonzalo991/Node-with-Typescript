import type { Task } from "./domain/task.js";
import type { createTaskDto } from "./dto/create-task.dto.js";
import type { updateTaskDto } from "./dto/update-task.dto.js";
import { TaskModel } from "./task.model.js";
import type { TaskRepository } from "./task.repository.js";

export class TaskRepositoryImpl implements TaskRepository {
    async findAll(): Promise<Task[]> {
        return await TaskModel.find();
    }

    async findById(id: string): Promise<Task | null> {
        return await TaskModel.findById(id);
    }

    async create(data: createTaskDto): Promise<Task> {
        const taskDoc = new TaskModel(data);
        const saveTask = await taskDoc.save();

        return {
            id: saveTask.id,
            title: saveTask.title,
            priority: saveTask.priority,
            status: saveTask.status,
            dueDate: saveTask.dueDate,
        }
    }

    async update(id: string, task: updateTaskDto): Promise<Task | null> {
        const updatedDoc = await TaskModel.findByIdAndUpdate(id, task, { new: true }).lean();
        if (!updatedDoc) return null;

        return {
            id: updatedDoc._id.toString(),
            title: updatedDoc.title,
            priority: updatedDoc.priority,
            status: updatedDoc.status,
            dueDate: updatedDoc.dueDate,
        };
    }

    async delete(id: string): Promise<void> {
        await TaskModel.findByIdAndDelete(id);
    }
}