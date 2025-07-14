import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Clock } from "lucide-react";
import type { Difficulty } from "@shared/schema";

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  difficulty: Difficulty;
  completionTime: string;
  level: number;
  streak: number;
  hintsUsed: number;
  maxHints: number;
  onNextLevel: () => void;
  onPlayAgain: () => void;
}

export function WinModal({
  isOpen,
  onClose,
  difficulty,
  completionTime,
  level,
  streak,
  hintsUsed,
  maxHints,
  onNextLevel,
  onPlayAgain,
}: WinModalProps) {
  const getStreakEmoji = (streak: number) => {
    if (streak >= 10) return "🔥";
    if (streak >= 5) return "⚡";
    if (streak >= 3) return "🌟";
    return "✨";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="space-y-6">
          {/* Celebration */}
          <div className="space-y-2">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-foreground">
              Congratulations!
            </h2>
            <p className="text-lg text-muted-foreground">
              You solved the {difficulty} puzzle!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="text-xl font-bold font-mono">
                  {completionTime}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Time
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Trophy className="w-5 h-5" />
                <span className="text-xl font-bold">
                  {level}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Level
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <span className="text-xl">{getStreakEmoji(streak)}</span>
                <span className="text-xl font-bold">
                  {streak}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Streak
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-xl font-bold">
                  {hintsUsed}/{maxHints}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Hints Used
              </p>
            </div>
          </div>

          {/* Bonus message for perfect games */}
          {hintsUsed === 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                Perfect game! No hints used! 🌟
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onNextLevel}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Next Level
            </Button>
            <Button
              onClick={onPlayAgain}
              variant="outline"
            >
              Play Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
