import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateTaskSchema = z.object({
  completed: z.boolean(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: number };

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = InsertTask & {
  id: number;
  completed: boolean;
  userId: number;
  createdAt: Date;
};