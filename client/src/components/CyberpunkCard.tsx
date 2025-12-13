import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CyberpunkCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  cornerCut?: boolean;
}

export function CyberpunkCard({
  children,
  className,
  glowColor = "oklch(0.55 0.25 20)", // Default red
  cornerCut = true,
}: CyberpunkCardProps) {
  return (
    <div
      className={cn(
        "relative bg-card text-card-foreground p-6",
        "border border-primary/30",
        "transition-all duration-300",
        "hover:border-primary/60 hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]",
        cornerCut && "clip-corner",
        className
      )}
      style={{
        boxShadow: `0 0 10px ${glowColor}20`,
      }}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(0.9_0_0)_2px,oklch(0.9_0_0)_4px)]" />
      </div>
      
      {children}
    </div>
  );
}

interface CyberpunkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  glitch?: boolean;
}

export function CyberpunkButton({
  children,
  className,
  variant = "primary",
  glitch = false,
  ...props
}: CyberpunkButtonProps) {
  const baseStyles = "relative px-6 py-3 font-bold uppercase tracking-wider transition-all duration-200 clip-corner-sm";
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(220,20,60,0.5)]",
    secondary: "bg-transparent text-primary border-2 border-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(220,20,60,0.3)]",
    ghost: "bg-transparent text-foreground border border-border hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], glitch && "glitch-effect", className)}
      {...props}
    >
      {children}
      
      {/* Corner markers */}
      <span className="absolute bottom-0 right-0 w-1 h-1 bg-primary" />
    </button>
  );
}

interface DataDecorProps {
  text?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function DataDecor({ 
  text = `[${Math.random().toString(16).slice(2, 8).toUpperCase()}]`,
  position = "top-left",
  className 
}: DataDecorProps) {
  const positionStyles = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <div 
      className={cn(
        "absolute text-[10px] font-mono text-muted-foreground opacity-30 pointer-events-none",
        positionStyles[position],
        className
      )}
    >
      {text}
    </div>
  );
}

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function GlitchText({ children, className, intensity = "medium" }: GlitchTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 w-full h-full text-primary opacity-70 animate-glitch-1"
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 w-full h-full text-chart-4 opacity-70 animate-glitch-2"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}

interface ScanlineOverlayProps {
  opacity?: number;
}

export function ScanlineOverlay({ opacity = 0.05 }: ScanlineOverlayProps) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity }}
    >
      <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(0.9_0_0)_2px,oklch(0.9_0_0)_4px)]" />
    </div>
  );
}
