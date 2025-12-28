import { Document, Model, model, Schema } from "mongoose";

export interface TaskDocument extends Document {
     id: string,
     title: string;
     priority: string;
     status: string;
     dueDate: Date;
}

const TaskSchema = new Schema<TaskDocument>({
     title: { type: String, required: true },
     priority: { type: String, required: true },
     status: { type: String, required: true },
     dueDate: { type: Date, required: true },
});

export const TaskModel: Model<TaskDocument> = model<TaskDocument>("Task", TaskSchema);