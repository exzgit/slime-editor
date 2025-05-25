import React, { useRef, useState } from "react";

type BottomPanelProps = {
  initialHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
  children?: React.ReactNode;
};

export const BottomPanel = ({
  initialHeight = 200,
  minHeight = 50,
  maxHeight = 500,
  className = "",
  children,
}: BottomPanelProps) => {
  const [height, setHeight] = useState(initialHeight);
  const isResizing = useRef(false);

  const startResize = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    const windowHeight = window.innerHeight;
    const newHeight = Math.min(
      Math.max(windowHeight - e.clientY, minHeight),
      maxHeight
    );
    setHeight(newHeight);
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResize);
  };

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50 box-border"
      style={{ height }}
    >
      <div className="relative h-full bg-zinc-900 border-t border-[#444] shadow-md">
        {/* Resize handle */}
        <div
          className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize border-t border-[#444]"
          onMouseDown={startResize}
        />
        
        {/* Konten */}
        <div className={`h-full overflow-auto box-border ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
