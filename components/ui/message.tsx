import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export interface MessageProps {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles = {
  info: "bg-primary/10 border-primary/20 text-primary",
  success: "bg-accent border-accent-foreground/20 text-accent-foreground",
  warning: "bg-muted border-muted-foreground/20 text-muted-foreground",
  error: "bg-destructive/10 border-destructive/20 text-destructive",
};

const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export function Message({
  children,
  variant = "info",
  className,
  dismissible = false,
  onDismiss,
}: MessageProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        "p-4 rounded-lg border flex items-start gap-3",
        variantStyles[variant],
        className
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm font-medium">{children}</div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss message"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
