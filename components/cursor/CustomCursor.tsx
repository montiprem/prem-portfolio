"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      className="hidden md:block fixed z-998 pointer-events-none rounded-full border border-blue-400/60 transition-[width,height,background-color] duration-150 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        width: hovering ? 40 : 20,
        height: hovering ? 40 : 20,
        transform: "translate(-50%, -50%)",
        backgroundColor: hovering
          ? "rgba(59,130,246,0.15)"
          : "transparent",
      }}
    />
  );
}