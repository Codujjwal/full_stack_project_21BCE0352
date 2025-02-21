import { type User, type InsertUser, type Task, type InsertTask } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getTasks(userId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask & { userId: number }): Promise<Task>;
  updateTask(id: number, completed: boolean): Promise<Task | undefined>;
  deleteTask(id: number): Promise<void>;

  sessionStore: session.Store;
}

class MemStorage implements IStorage {
  private users: User[] = [];
  private tasks: Task[] = [];
  private nextUserId = 1;
  private nextTaskId = 1;
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new SessionStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      ...insertUser
    };
    this.users.push(user);
    return user;
  }

  async getTasks(userId: number): Promise<Task[]> {
    return this.tasks.filter(t => t.userId === userId);
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.find(t => t.id === id);
  }

  async createTask(data: InsertTask & { userId: number }): Promise<Task> {
    const task: Task = {
      id: this.nextTaskId++,
      ...data,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(task);
    return task;
  }

  async updateTask(id: number, completed: boolean): Promise<Task | undefined> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = completed;
      return task;
    }
    return undefined;
  }

  async deleteTask(id: number): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}

export const storage = new MemStorage();