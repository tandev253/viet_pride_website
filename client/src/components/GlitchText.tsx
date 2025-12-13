import { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 -z-10 text-primary/50 animate-glitch-1"
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 -z-10 text-accent/50 animate-glitch-2"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
