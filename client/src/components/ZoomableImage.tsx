import { Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ZoomableImage({ src, alt, className = "" }: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number>(0);

  const minScale = 1;
  const maxScale = 4;
  const zoomStep = 0.3;

  // Reset zoom when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    
    if (newScale === minScale) {
      setPosition({ x: 0, y: 0 });
    }
    
    setScale(newScale);
  };

  // Handle double click to toggle zoom
  const handleDoubleClick = () => {
    if (scale > minScale) {
      setScale(minScale);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > minScale) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > minScale) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      lastTouchDistance.current = distance;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (lastTouchDistance.current > 0) {
        const delta = distance - lastTouchDistance.current;
        const newScale = Math.min(
          maxScale,
          Math.max(minScale, scale + delta * 0.01)
        );
        
        if (newScale === minScale) {
          setPosition({ x: 0, y: 0 });
        }
        
        setScale(newScale);
      }

      lastTouchDistance.current = distance;
    }
  };

  const handleTouchEnd = () => {
    lastTouchDistance.current = 0;
  };

  // Zoom controls
  const zoomIn = () => {
    const newScale = Math.min(maxScale, scale + zoomStep);
    setScale(newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(minScale, scale - zoomStep);
    if (newScale === minScale) {
      setPosition({ x: 0, y: 0 });
    }
    setScale(newScale);
  };

  const resetZoom = () => {
    setScale(minScale);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          disabled={scale >= maxScale}
          className="w-10 h-10 bg-primary/80 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed clip-corner-sm flex items-center justify-center transition-colors"
          title="Zoom In"
        >
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
        <button
          onClick={zoomOut}
          disabled={scale <= minScale}
          className="w-10 h-10 bg-primary/80 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed clip-corner-sm flex items-center justify-center transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5 text-primary-foreground" />
        </button>
        <button
          onClick={resetZoom}
          disabled={scale === minScale}
          className="w-10 h-10 bg-primary/80 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed clip-corner-sm flex items-center justify-center transition-colors"
          title="Reset Zoom"
        >
          <RotateCcw className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Zoom Level Indicator */}
      {scale > minScale && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-primary/80 clip-corner-sm">
          <span className="text-sm font-bold text-primary-foreground font-mono">
            {Math.round(scale * 100)}%
          </span>
        </div>
      )}

      {/* Instruction Hint */}
      {scale === minScale && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-background/80 border border-primary/30 clip-corner-sm">
          <p className="text-xs text-muted-foreground text-center">
            <span className="hidden md:inline">Scroll to zoom • Double-click to zoom in</span>
            <span className="md:hidden">Pinch to zoom • Double-tap to zoom in</span>
          </p>
        </div>
      )}

      {/* Image Container */}
      <div
        ref={imageRef}
        className={`w-full h-full flex items-center justify-center ${
          scale > minScale ? "cursor-move" : "cursor-zoom-in"
        } ${className}`}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain select-none pointer-events-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
