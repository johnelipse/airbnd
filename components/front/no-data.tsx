import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

interface NoPropertiesProps {
  className?: string;
}

export function NoProperties({ className }: NoPropertiesProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed bg-background p-8 text-center animate-in fade-in-50",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Home className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="max-w-md space-y-1">
        <h3 className="text-xl font-medium">No properties yet</h3>
        <p className="text-sm text-muted-foreground">
          Properties you add will appear here.
        </p>
      </div>
    </div>
  );
}
