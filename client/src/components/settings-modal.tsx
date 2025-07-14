import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "./theme-provider";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Difficulty, GridSize } from "@shared/schema";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  difficulty: Difficulty;
  gridSize: GridSize;
  showConflicts: boolean;
  musicEnabled: boolean;
  soundEnabled: boolean;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onGridSizeChange: (gridSize: GridSize) => void;
  onShowConflictsChange: () => void;
  onMusicToggle: () => void;
  onSoundToggle: () => void;
  onNewGame: () => void;
  onResetGame: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  difficulty,
  gridSize,
  showConflicts,
  musicEnabled,
  soundEnabled,
  onDifficultyChange,
  onGridSizeChange,
  onShowConflictsChange,
  onMusicToggle,
  onSoundToggle,
  onNewGame,
  onResetGame,
}: SettingsModalProps) {
  const { theme, toggleTheme } = useTheme();

  const difficulties: Difficulty[] = ["Easy", "Medium", "Hard", "Expert"];
  const gridSizes: GridSize[] = [4, 9];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>

          <Separator />

          {/* Grid Size Selector */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Grid Size</Label>
            <div className="grid grid-cols-2 gap-3">
              {gridSizes.map((size) => (
                <Button
                  key={size}
                  variant={gridSize === size ? "default" : "outline"}
                  className={cn(
                    "flex flex-col h-auto py-3",
                    gridSize === size && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => onGridSizeChange(size)}
                >
                  <div className="text-sm font-medium">{size}×{size} Grid</div>
                  <div className="text-xs opacity-70">
                    Numbers 1-{size}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Difficulty Selector */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Difficulty</Label>
            <div className="grid grid-cols-2 gap-2">
              {difficulties.map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  className={cn(
                    "text-sm",
                    difficulty === level && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => onDifficultyChange(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Game Options */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Game Options</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-conflicts" className="text-sm">
                  Highlight conflicts
                </Label>
                <Switch
                  id="show-conflicts"
                  checked={showConflicts}
                  onCheckedChange={onShowConflictsChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="music-enabled" className="text-sm">
                  Background Music
                </Label>
                <Switch
                  id="music-enabled"
                  checked={musicEnabled}
                  onCheckedChange={onMusicToggle}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-enabled" className="text-sm">
                  Sound Effects
                </Label>
                <Switch
                  id="sound-enabled"
                  checked={soundEnabled}
                  onCheckedChange={onSoundToggle}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Game Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onNewGame}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              New Game
            </Button>
            <Button
              onClick={onResetGame}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
