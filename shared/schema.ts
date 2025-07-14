import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  difficulty: text("difficulty").notNull(),
  gridSize: integer("grid_size").notNull(),
  puzzle: text("puzzle").notNull(), // JSON string of the puzzle
  solution: text("solution").notNull(), // JSON string of the solution
  currentState: text("current_state").notNull(), // JSON string of current game state
  isCompleted: boolean("is_completed").default(false),
  completionTime: integer("completion_time"), // in seconds
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export const difficultyLevels = ["Easy", "Medium", "Hard", "Expert"] as const;
export type Difficulty = typeof difficultyLevels[number];

export const gridSizes = [4, 9] as const;
export type GridSize = typeof gridSizes[number];
