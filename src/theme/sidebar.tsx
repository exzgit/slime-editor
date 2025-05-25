import React, { useRef, useState } from "react";

type SidebarProps = {
  position?: "left" | "right";
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
  children?: React.ReactNode;
};

export const Sidebar = ({
  position = "left",
  initialWidth = 300,
  minWidth = 50,
  maxWidth = 600,
  className = "",
  children,
}: SidebarProps) => {
  const [width, setWidth] = useState(initialWidth);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const startResize = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    if (position === "left") {
      const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
      setWidth(newWidth);
    } else {
      const windowWidth = window.innerWidth;
      const newWidth = Math.min(
        Math.max(windowWidth - e.clientX, minWidth),
        maxWidth
      );
      setWidth(newWidth);
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResize);
  };

  const resizeHandlePosition =
    position === "left" ? "right-0 cursor-ew-resize border-r border-[#444]" : "left-0 border-l border-[#444] cursor-ew-resize";

  return (
    <div
      ref={sidebarRef}
      className="relative h-full z-50"
      style={{ width }}
    >
      <div className="h-full bg-zinc-900 shadow-md relative box-border">
        {/* Kontainer dengan padding / margin yang dikontrol oleh className */}
        <div className={`overflow-auto w-full h-full box-border ${className}`}>
          {children}
        </div>

        {/* Resize Handle */}
        <div
          className={`absolute top-0 h-full w-1 ${resizeHandlePosition}`}
          onMouseDown={startResize}
        />
      </div>
    </div>
  );
};


