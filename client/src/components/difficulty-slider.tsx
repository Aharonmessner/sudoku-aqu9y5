import { cn } from "@/lib/utils";
import type { Difficulty } from "@shared/schema";

interface DifficultySliderProps {
  difficulty: Difficulty;
  className?: string;
}

const difficultyColors = {
  Easy: "bg-green-500 text-white",
  Medium: "bg-yellow-500 text-white",
  Hard: "bg-orange-500 text-white",
  Expert: "bg-red-500 text-white",
};

const difficultyOrder: Difficulty[] = ["Easy", "Medium", "Hard", "Expert"];

export function DifficultySlider({ difficulty, className }: DifficultySliderProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {difficultyOrder.map((level) => {
        const isActive = level === difficulty;
        const isFaded = !isActive;
        
        return (
          <div
            key={level}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
              difficultyColors[level],
              {
                "opacity-30": isFaded,
                "opacity-100 scale-105": isActive,
              }
            )}
          >
            {level}
          </div>
        );
      })}
    </div>
  );
}