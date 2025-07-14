import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SudokuGrid } from "@/components/sudoku-grid";
import { NumberBar } from "@/components/number-bar";
import { SettingsModal } from "@/components/settings-modal";
import { WinModal } from "@/components/win-modal";
import { InfoModal } from "@/components/info-modal";
import { DifficultySlider } from "@/components/difficulty-slider";
import { StupidModeToggle } from "@/components/stupid-mode-toggle";
import { useGameState } from "@/hooks/use-game-state";
import { Settings, Play, Pause, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@shared/schema";

export default function Home() {
  const {
    gameState,
    startNewGame,
    resetGame,
    selectCell,
    inputNumber,
    clearCell,
    togglePause,
    setDifficulty,
    setGridSize,
    toggleShowConflicts,
    toggleStupidMode,
    toggleMusic,
    toggleSoundEffects,
    useHint,
    formatTimer,
  } = useGameState();

  const [showSettings, setShowSettings] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Show win modal when game is completed
  useEffect(() => {
    if (gameState.isCompleted && !showWin) {
      setShowWin(true);
    }
  }, [gameState.isCompleted, showWin]);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };

  const handleNewGame = () => {
    startNewGame(gameState.difficulty, gameState.gridSize);
    setShowSettings(false);
  };

  const handleResetGame = () => {
    resetGame();
    setShowSettings(false);
  };

  const handleNextLevel = () => {
    const difficulties: Difficulty[] = ["Easy", "Medium", "Hard", "Expert"];
    const currentIndex = difficulties.indexOf(gameState.difficulty);
    const nextDifficulty = difficulties[Math.min(currentIndex + 1, difficulties.length - 1)];
    
    setDifficulty(nextDifficulty);
    startNewGame(nextDifficulty, gameState.gridSize);
    setShowWin(false);
  };

  const handlePlayAgain = () => {
    startNewGame(gameState.difficulty, gameState.gridSize);
    setShowWin(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img 
                src="/attached_assets/s-sudoku-logo-cb26fe01-c063-4381-915d-ee1c94b1c0bb_1752251554980.jpg" 
                alt="Sudoku Logo" 
                className="w-10 h-10 rounded-lg" 
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Sudoku</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{gameState.difficulty} Level</span>
                <span>•</span>
                <span>Level {gameState.level}</span>
                {gameState.streak > 0 && (
                  <>
                    <span>•</span>
                    <span>🔥 {gameState.streak}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-lg font-mono font-semibold">
                {formatTimer(gameState.timer)}
              </div>
              <div className="text-xs text-muted-foreground">Time</div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowInfo(true)}
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
        {/* Difficulty Slider */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Difficulty</h2>
            <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded">
              {gameState.gridSize}×{gameState.gridSize}
            </span>
          </div>
          <div className="flex justify-center">
            <DifficultySlider difficulty={gameState.difficulty} />
          </div>
        </div>

        {/* Stupid Mode Toggle */}
        {gameState.puzzle && (
          <div className="w-full max-w-md flex justify-center">
            <StupidModeToggle 
              enabled={gameState.stupidMode} 
              onToggle={toggleStupidMode} 
            />
          </div>
        )}

        {/* Game Actions */}
        {!gameState.puzzle && (
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Choose your difficulty and start playing!
              </p>
              <Button onClick={handleNewGame} className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Start New Game
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sudoku Grid */}
        {gameState.puzzle && (
          <SudokuGrid
            board={gameState.board}
            originalPuzzle={gameState.puzzle.puzzle}
            solution={gameState.puzzle.solution}
            gridSize={gameState.gridSize}
            selectedCell={gameState.selectedCell}
            conflicts={gameState.conflicts}
            showConflicts={gameState.showConflicts}
            stupidMode={gameState.stupidMode}
            onCellClick={selectCell}
          />
        )}

        {/* Number Bar */}
        {gameState.puzzle && (
          <NumberBar
            gridSize={gameState.gridSize}
            board={gameState.board}
            onNumberClick={inputNumber}
            onClearClick={clearCell}
            onHintClick={useHint}
            hintsUsed={gameState.hintsUsed}
            maxHints={gameState.maxHints}
            hasSelectedCell={gameState.selectedCell !== null}
          />
        )}

        {/* Pause/Resume Button */}
        {gameState.puzzle && !gameState.isCompleted && (
          <Button
            variant="outline"
            onClick={togglePause}
            className="w-full max-w-md"
          >
            {gameState.isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Game
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume Game
              </>
            )}
          </Button>
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        difficulty={gameState.difficulty}
        gridSize={gameState.gridSize}
        showConflicts={gameState.showConflicts}
        musicEnabled={gameState.musicEnabled}
        soundEnabled={gameState.soundEnabled}
        onDifficultyChange={handleDifficultyChange}
        onGridSizeChange={setGridSize}
        onShowConflictsChange={toggleShowConflicts}
        onMusicToggle={toggleMusic}
        onSoundToggle={toggleSoundEffects}
        onNewGame={handleNewGame}
        onResetGame={handleResetGame}
      />

      {/* Win Modal */}
      <WinModal
        isOpen={showWin}
        onClose={() => setShowWin(false)}
        difficulty={gameState.difficulty}
        completionTime={formatTimer(gameState.timer)}
        level={gameState.level}
        streak={gameState.streak}
        hintsUsed={gameState.hintsUsed}
        maxHints={gameState.maxHints}
        onNextLevel={handleNextLevel}
        onPlayAgain={handlePlayAgain}
      />

      {/* Info Modal */}
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        gridSize={gameState.gridSize}
      />
    </div>
  );
}
