import { cn } from "@/lib/utils";
import type { GridSize } from "@shared/schema";
import { isNumberComplete, type Board } from "@/lib/sudoku";

interface NumberBarProps {
  gridSize: GridSize;
  board: Board;
  onNumberClick: (num: number) => void;
  onClearClick: () => void;
  onHintClick: () => void;
  hintsUsed: number;
  maxHints: number;
  hasSelectedCell: boolean;
}

export function NumberBar({ gridSize, board, onNumberClick, onClearClick, onHintClick, hintsUsed, maxHints, hasSelectedCell }: NumberBarProps) {
  const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Number selection buttons */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div 
          className={cn(
            "grid gap-2",
            gridSize === 4 ? "grid-cols-4" : "grid-cols-9"
          )}
        >
          {numbers.map((num) => {
            const isComplete = board ? isNumberComplete(board, num, gridSize) : false;
            return (
              <button
                key={num}
                onClick={() => onNumberClick(num)}
                disabled={isComplete}
                className={cn(
                  "aspect-square bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg font-mono font-semibold text-lg text-gray-900 dark:text-white hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:dark:bg-gray-800 disabled:hover:border-gray-200 disabled:hover:dark:border-gray-600 disabled:hover:text-gray-900 disabled:hover:dark:text-white",
                  isComplete && "relative"
                )}
              >
                {num}
                {isComplete && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-red-500 dark:bg-red-400 transform rotate-45"></div>
                    <div className="absolute w-full h-0.5 bg-red-500 dark:bg-red-400 transform -rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Hint button */}
        <button
          onClick={onHintClick}
          disabled={!hasSelectedCell || hintsUsed >= maxHints}
          className={cn(
            "bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg",
            "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Hint ({hintsUsed}/{maxHints})</span>
        </button>

        {/* Clear button */}
        <button
          onClick={onClearClick}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
