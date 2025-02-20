import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { generateTaskSuggestions } from "./openai";
import { insertTaskSchema, updateTaskSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  function broadcastToUser(userId: number, data: any) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && (client as any).userId === userId) {
        client.send(JSON.stringify(data));
      }
    });
  }

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === 'auth' && data.userId) {
          console.log('WebSocket authenticated for user:', data.userId);
          (ws as any).userId = data.userId;
        }
      } catch (e) {
        console.error('WebSocket message error:', e);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  app.get("/api/tasks", async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const tasks = await storage.getTasks(req.user.id);
    res.json(tasks);
  });

  app.post("/api/tasks", async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    const result = insertTaskSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const task = await storage.createTask({
      ...result.data,
      userId: req.user.id,
    });

    broadcastToUser(req.user.id, {
      type: 'taskCreated',
      task
    });

    res.status(201).json(task);
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    const result = updateTaskSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const task = await storage.updateTask(
      parseInt(req.params.id),
      result.data.completed
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    broadcastToUser(req.user.id, {
      type: 'taskUpdated',
      task
    });

    res.json(task);
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    const task = await storage.getTask(parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await storage.deleteTask(parseInt(req.params.id));

    broadcastToUser(req.user.id, {
      type: 'taskDeleted',
      taskId: parseInt(req.params.id)
    });

    res.sendStatus(204);
  });

  app.post("/api/tasks/suggest", async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const suggestions = await generateTaskSuggestions(title);
    res.json(suggestions);
  });

  return httpServer;
}