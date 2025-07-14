import { useState, useEffect, useCallback } from "react";
import type { Difficulty, GridSize } from "@shared/schema";
import { 
  generateSudokuPuzzle, 
  isPuzzleComplete, 
  getCellConflicts, 
  createEmptyBoard,
  type Board, 
  type SudokuPuzzle 
} from "@/lib/sudoku";

interface GameState {
  puzzle: SudokuPuzzle | null;
  board: Board;
  selectedCell: { row: number; col: number } | null;
  difficulty: Difficulty;
  gridSize: GridSize;
  isCompleted: boolean;
  timer: number;
  isRunning: boolean;
  conflicts: boolean[][];
  showConflicts: boolean;
  hintsUsed: number;
  maxHints: number;
  level: number;
  streak: number;
  stupidMode: boolean;
  musicEnabled: boolean;
  soundEnabled: boolean;
}

const STORAGE_KEY = "sudoku-game-state";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          isRunning: false, // Don't auto-start timer on load
          conflicts: parsed.conflicts || [],
          stupidMode: parsed.stupidMode || false,
          musicEnabled: parsed.musicEnabled ?? true,
          soundEnabled: parsed.soundEnabled ?? true,
        };
      } catch {
        // If parsing fails, return default state
      }
    }
    
    return {
      puzzle: null,
      board: createEmptyBoard(9),
      selectedCell: null,
      difficulty: "Easy" as Difficulty,
      gridSize: 9 as GridSize,
      isCompleted: false,
      timer: 0,
      isRunning: false,
      conflicts: [],
      showConflicts: true,
      hintsUsed: 0,
      maxHints: 3,
      level: 1,
      streak: 0,
      stupidMode: false,
      musicEnabled: true,
      soundEnabled: true,
    };
  });

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isRunning && !gameState.isCompleted) {
      interval = setInterval(() => {
        setGameState(prev => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.isRunning, gameState.isCompleted]);

  // Generate conflicts matrix
  const updateConflicts = useCallback((board: Board, gridSize: GridSize) => {
    const conflicts: boolean[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        conflicts[row][col] = getCellConflicts(board, row, col, gridSize);
      }
    }
    
    return conflicts;
  }, []);

  // Start a new game
  const startNewGame = useCallback((difficulty: Difficulty, gridSize: GridSize) => {
    const puzzle = generateSudokuPuzzle(difficulty, gridSize);
    const conflicts = updateConflicts(puzzle.puzzle, gridSize);
    
    setGameState(prev => ({
      puzzle,
      board: puzzle.puzzle.map(row => [...row]),
      selectedCell: null,
      difficulty,
      gridSize,
      isCompleted: false,
      timer: 0,
      isRunning: true,
      conflicts,
      showConflicts: prev.showConflicts,
      hintsUsed: 0,
      maxHints: difficulty === "Easy" ? 5 : difficulty === "Medium" ? 3 : difficulty === "Hard" ? 2 : 1,
      level: prev.level,
      streak: prev.streak,
    }));
  }, [updateConflicts]);

  // Reset current game
  const resetGame = useCallback(() => {
    if (gameState.puzzle) {
      const conflicts = updateConflicts(gameState.puzzle.puzzle, gameState.gridSize);
      setGameState(prev => ({
        ...prev,
        board: prev.puzzle!.puzzle.map(row => [...row]),
        selectedCell: null,
        isCompleted: false,
        timer: 0,
        isRunning: true,
        conflicts,
      }));
    }
  }, [gameState.puzzle, gameState.gridSize, updateConflicts]);

  // Select a cell
  const selectCell = useCallback((row: number, col: number) => {
    setGameState(prev => ({
      ...prev,
      selectedCell: { row, col },
    }));
  }, []);

  // Input a number
  const inputNumber = useCallback((num: number) => {
    if (!gameState.selectedCell || !gameState.puzzle) return;
    
    const { row, col } = gameState.selectedCell;
    const newBoard = gameState.board.map(r => [...r]);
    
    // Only allow input if the cell is not part of the original puzzle
    if (gameState.puzzle.puzzle[row][col] === null) {
      newBoard[row][col] = num;
      
      const conflicts = updateConflicts(newBoard, gameState.gridSize);
      const isCompleted = isPuzzleComplete(newBoard, gameState.gridSize);
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        conflicts,
        isCompleted,
        isRunning: !isCompleted,
        level: isCompleted ? prev.level + 1 : prev.level,
        streak: isCompleted ? prev.streak + 1 : prev.streak,
      }));
    }
  }, [gameState.selectedCell, gameState.puzzle, gameState.board, gameState.gridSize, updateConflicts]);

  // Clear selected cell
  const clearCell = useCallback(() => {
    if (!gameState.selectedCell || !gameState.puzzle) return;
    
    const { row, col } = gameState.selectedCell;
    
    // Only allow clearing if the cell is not part of the original puzzle
    if (gameState.puzzle.puzzle[row][col] === null) {
      const newBoard = gameState.board.map(r => [...r]);
      newBoard[row][col] = null;
      
      const conflicts = updateConflicts(newBoard, gameState.gridSize);
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        conflicts,
        isCompleted: false,
        isRunning: true,
      }));
    }
  }, [gameState.selectedCell, gameState.puzzle, gameState.board, gameState.gridSize, updateConflicts]);

  // Toggle game pause
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  }, []);

  // Set difficulty
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState(prev => ({
      ...prev,
      difficulty,
    }));
  }, []);

  // Set grid size
  const setGridSize = useCallback((gridSize: GridSize) => {
    setGameState(prev => ({
      ...prev,
      gridSize,
    }));
  }, []);

  // Toggle show conflicts
  const toggleShowConflicts = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showConflicts: !prev.showConflicts,
    }));
  }, []);

  // Toggle stupid mode
  const toggleStupidMode = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      stupidMode: !prev.stupidMode,
    }));
  }, []);

  // Toggle music
  const toggleMusic = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      musicEnabled: !prev.musicEnabled,
    }));
  }, []);

  // Toggle sound effects
  const toggleSoundEffects = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  }, []);

  // Use a hint
  const useHint = useCallback(() => {
    if (!gameState.puzzle || !gameState.selectedCell || gameState.hintsUsed >= gameState.maxHints) return;
    
    const { row, col } = gameState.selectedCell;
    const correctAnswer = gameState.puzzle.solution[row][col];
    
    if (gameState.puzzle.puzzle[row][col] === null && gameState.board[row][col] !== correctAnswer) {
      const newBoard = gameState.board.map(r => [...r]);
      newBoard[row][col] = correctAnswer;
      
      const conflicts = updateConflicts(newBoard, gameState.gridSize);
      const isCompleted = isPuzzleComplete(newBoard, gameState.gridSize);
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        conflicts,
        isCompleted,
        isRunning: !isCompleted,
        hintsUsed: prev.hintsUsed + 1,
        level: isCompleted ? prev.level + 1 : prev.level,
        streak: isCompleted ? prev.streak + 1 : prev.streak,
      }));
    }
  }, [gameState.puzzle, gameState.selectedCell, gameState.hintsUsed, gameState.maxHints, gameState.board, gameState.gridSize, updateConflicts]);

  // Format timer
  const formatTimer = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
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
  };
}
