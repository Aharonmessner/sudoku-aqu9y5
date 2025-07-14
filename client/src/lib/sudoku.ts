import type { Difficulty, GridSize } from "@shared/schema";

export type Cell = number | null;
export type Board = Cell[][];

export interface SudokuPuzzle {
  puzzle: Board;
  solution: Board;
  difficulty: Difficulty;
  gridSize: GridSize;
}

// Generate a random number between min and max (inclusive)
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle array using Fisher-Yates algorithm
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Check if a number is valid in a specific position
function isValidMove(board: Board, row: number, col: number, num: number, gridSize: GridSize): boolean {
  const boxSize = gridSize === 4 ? 2 : 3;
  
  // Check row
  for (let x = 0; x < gridSize; x++) {
    if (board[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < gridSize; x++) {
    if (board[x][col] === num) return false;
  }
  
  // Check box
  const boxRow = Math.floor(row / boxSize) * boxSize;
  const boxCol = Math.floor(col / boxSize) * boxSize;
  
  for (let i = 0; i < boxSize; i++) {
    for (let j = 0; j < boxSize; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }
  
  return true;
}

// Solve sudoku using backtracking
function solveSudoku(board: Board, gridSize: GridSize): boolean {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (board[row][col] === null) {
        const numbers = shuffle(Array.from({ length: gridSize }, (_, i) => i + 1));
        
        for (const num of numbers) {
          if (isValidMove(board, row, col, num, gridSize)) {
            board[row][col] = num;
            
            if (solveSudoku(board, gridSize)) {
              return true;
            }
            
            board[row][col] = null;
          }
        }
        
        return false;
      }
    }
  }
  
  return true;
}

// Generate a complete solved sudoku board
function generateSolvedBoard(gridSize: GridSize): Board {
  const board: Board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  solveSudoku(board, gridSize);
  return board;
}

// Create a puzzle by removing numbers from a solved board
function createPuzzle(solvedBoard: Board, difficulty: Difficulty, gridSize: GridSize): Board {
  const puzzle = solvedBoard.map(row => [...row]);
  
  // Difficulty settings - number of cells to remove
  const difficultySettings = {
    4: {
      Easy: 6,
      Medium: 8,
      Hard: 10,
      Expert: 12
    },
    9: {
      Easy: 35,
      Medium: 45,
      Hard: 55,
      Expert: 65
    }
  };
  
  const cellsToRemove = difficultySettings[gridSize][difficulty];
  const totalCells = gridSize * gridSize;
  
  // Get all cell positions
  const positions = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      positions.push([i, j]);
    }
  }
  
  // Randomly remove cells
  const shuffledPositions = shuffle(positions);
  for (let i = 0; i < Math.min(cellsToRemove, totalCells); i++) {
    const [row, col] = shuffledPositions[i];
    puzzle[row][col] = null;
  }
  
  return puzzle;
}

// Generate a complete sudoku puzzle
export function generateSudokuPuzzle(difficulty: Difficulty, gridSize: GridSize): SudokuPuzzle {
  const solution = generateSolvedBoard(gridSize);
  const puzzle = createPuzzle(solution, difficulty, gridSize);
  
  return {
    puzzle,
    solution,
    difficulty,
    gridSize
  };
}

// Check if the current board state is valid
export function isValidBoard(board: Board, gridSize: GridSize): boolean {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const num = board[row][col];
      if (num !== null) {
        // Temporarily remove the number to check if it's valid
        board[row][col] = null;
        const isValid = isValidMove(board, row, col, num, gridSize);
        board[row][col] = num;
        
        if (!isValid) return false;
      }
    }
  }
  return true;
}

// Check if the puzzle is complete
export function isPuzzleComplete(board: Board, gridSize: GridSize): boolean {
  // Check if all cells are filled
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (board[row][col] === null) return false;
    }
  }
  
  // Check if the board is valid
  return isValidBoard(board, gridSize);
}

// Get conflicts for a specific cell
export function getCellConflicts(board: Board, row: number, col: number, gridSize: GridSize): boolean {
  const num = board[row][col];
  if (num === null) return false;
  
  // Temporarily remove the number to check for conflicts
  board[row][col] = null;
  const hasConflict = !isValidMove(board, row, col, num, gridSize);
  board[row][col] = num;
  
  return hasConflict;
}

// Create an empty board
export function createEmptyBoard(gridSize: GridSize): Board {
  return Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
}

// Check if a number is complete (all squares filled)
export function isNumberComplete(board: Board, number: number, gridSize: GridSize): boolean {
  let count = 0;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (board[row][col] === number) {
        count++;
      }
    }
  }
  return count === gridSize;
}
