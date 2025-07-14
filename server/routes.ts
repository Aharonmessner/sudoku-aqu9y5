import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game routes
  app.post("/api/games", async (req, res) => {
    try {
      const gameData = insertGameSchema.parse(req.body);
      const game = await storage.createGame(gameData);
      res.json(game);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create game" });
    }
  });

  app.get("/api/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const game = await storage.getGame(id);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to get game" });
    }
  });

  app.put("/api/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertGameSchema.partial().parse(req.body);
      const game = await storage.updateGame(id, updates);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update game" });
    }
  });

  app.get("/api/games", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      
      if (userId) {
        const games = await storage.getUserGames(userId);
        res.json(games);
      } else {
        res.status(400).json({ message: "User ID is required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to get games" });
    }
  });

  app.delete("/api/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteGame(id);
      
      if (!success) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json({ message: "Game deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete game" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
