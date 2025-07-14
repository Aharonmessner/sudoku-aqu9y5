import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Info, Trophy, Lightbulb, Target, Star, Flame } from "lucide-react";
import type { GridSize } from "@shared/schema";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  gridSize: GridSize;
}

export function InfoModal({ isOpen, onClose, gridSize }: InfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            How to Play Sudoku
          </DialogTitle>
          <DialogDescription>
            Learn the rules and master the progression system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Rules */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Basic Rules
            </h3>
            <div className="space-y-2 text-sm">
              <p>• Fill every cell with a number from 1 to {gridSize}</p>
              <p>• Each number can only appear once in each row</p>
              <p>• Each number can only appear once in each column</p>
              <p>• Each number can only appear once in each {gridSize === 4 ? "2×2" : "3×3"} box</p>
              <p>• Numbers already filled in are part of the puzzle and cannot be changed</p>
            </div>
          </div>

          <Separator />

          {/* How to Play */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">How to Play</h3>
            <div className="space-y-2 text-sm">
              <p>1. <strong>Tap a cell</strong> to select it (highlighted in blue)</p>
              <p>2. <strong>Tap a number</strong> from the number bar to fill the cell</p>
              <p>3. <strong>Use the Clear button</strong> to remove a number from the selected cell</p>
              <p>4. <strong>Numbers get crossed out</strong> when all {gridSize} instances are placed</p>
              <p>5. <strong>Conflicts are highlighted</strong> in red when enabled</p>
            </div>
          </div>

          <Separator />

          {/* Hint System */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Hint System
            </h3>
            <div className="space-y-2 text-sm">
              <p>Use hints wisely - they're limited per game!</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">Easy</Badge>
                  <span className="text-xs">5 hints</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Medium</Badge>
                  <span className="text-xs">3 hints</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">Hard</Badge>
                  <span className="text-xs">2 hints</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700">Expert</Badge>
                  <span className="text-xs">1 hint</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>Perfect Game Bonus:</strong> Complete without using any hints for special recognition!
              </p>
            </div>
          </div>

          <Separator />

          {/* Level Progression */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Level Progression
            </h3>
            <div className="space-y-2 text-sm">
              <p>• Your <strong>level increases</strong> every time you complete a puzzle</p>
              <p>• Build up your <strong>streak</strong> by completing puzzles consecutively</p>
              <p>• Track your progress with completion time and hints used</p>
              <div className="bg-muted rounded-lg p-3 mt-3">
                <p className="text-xs font-medium mb-2">Streak Rewards:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>3+ games: ⭐</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-blue-500" />
                    <span>5+ games: ⚡</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span>10+ games: 🔥</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tips */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Pro Tips</h3>
            <div className="space-y-2 text-sm">
              <p>• Start with numbers that appear most frequently in the puzzle</p>
              <p>• Look for rows, columns, or boxes with the most numbers already filled</p>
              <p>• Use the process of elimination - if 8 numbers are placed in a row, the 9th is obvious</p>
              <p>• Pay attention to crossed-out numbers - they can't be placed anymore</p>
              <p>• Enable conflict highlighting in settings if you need help spotting mistakes</p>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button onClick={onClose} className="w-full sm:w-auto">
              Got it!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}