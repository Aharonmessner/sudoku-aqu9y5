import { cn } from "@/lib/utils";
import type { Board, GridSize } from "@shared/schema";

interface SudokuGridProps {
  board: Board;
  originalPuzzle: Board | null;
  solution: Board | null;
  gridSize: GridSize;
  selectedCell: { row: number; col: number } | null;
  conflicts: boolean[][];
  showConflicts: boolean;
  stupidMode: boolean;
  onCellClick: (row: number, col: number) => void;
}

export function SudokuGrid({ 
  board, 
  originalPuzzle, 
  solution,
  gridSize, 
  selectedCell, 
  conflicts, 
  showConflicts,
  stupidMode,
  onCellClick 
}: SudokuGridProps) {
  const boxSize = gridSize === 4 ? 2 : 3;
  
  const getCellClasses = (row: number, col: number) => {
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const isOriginal = originalPuzzle?.[row]?.[col] !== null;
    const hasConflict = showConflicts && conflicts[row]?.[col];
    const value = board[row][col];
    
    // Stupid mode coloring
    const isCorrect = stupidMode && solution && value !== null && !isOriginal && 
                      solution[row][col] === value;
    const isIncorrect = stupidMode && solution && value !== null && !isOriginal && 
                       solution[row][col] !== value;
    
    // Determine borders for 3x3 or 2x2 box separation
    const rightBorder = (col + 1) % boxSize === 0 && col < gridSize - 1;
    const bottomBorder = (row + 1) % boxSize === 0 && row < gridSize - 1;
    
    return cn(
      "aspect-square border border-gray-400 dark:border-gray-500",
      "bg-white dark:bg-gray-900 cursor-pointer transition-colors",
      "flex items-center justify-center text-lg font-mono font-semibold",
      "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      {
        // Selected cell
        "bg-blue-100 dark:bg-blue-900 border-2 border-primary": isSelected,
        // Original puzzle cells (read-only)
        "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100": isOriginal,
        // User input cells
        "text-primary dark:text-blue-300": !isOriginal && value !== null && !isCorrect && !isIncorrect,
        // Conflict highlighting
        "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400": hasConflict && !isCorrect && !isIncorrect,
        // Stupid mode coloring
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300": isCorrect,
        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300": isIncorrect,
        // Box borders
        "border-r-2 border-r-gray-800 dark:border-r-gray-300": rightBorder,
        "border-b-2 border-b-gray-800 dark:border-b-gray-300": bottomBorder,
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div 
          className={cn(
            "grid gap-0 border-2 border-gray-800 dark:border-gray-300 rounded-lg overflow-hidden",
            gridSize === 4 ? "grid-cols-4" : "grid-cols-9"
          )}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellClasses(rowIndex, colIndex)}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                {cell || ""}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
