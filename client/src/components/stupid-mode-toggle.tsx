import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface StupidModeToggleProps {
  enabled: boolean;
  onToggle: () => void;
  className?: string;
}

export function StupidModeToggle({ enabled, onToggle, className }: StupidModeToggleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Switch
        id="stupid-mode"
        checked={enabled}
        onCheckedChange={onToggle}
      />
      <label 
        htmlFor="stupid-mode" 
        className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
      >
        STUPID MODE
      </label>
      {enabled && (
        <span className="text-xs text-muted-foreground">
          (Green = Correct, Red = Wrong)
        </span>
      )}
    </div>
  );
}