"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      // Direct lerp for zero lag
      pos.current.x += (targetPos.current.x - pos.current.x) * 0.22;
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button']")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Precision Center Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[999] w-2 h-2 rounded-full bg-cyan-400 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${clicked ? 0.6 : hovered ? 1.8 : 1})`,
        }}
      />

      {/* Target Crosshair Ticks (No Ring, No Blur, Pure Transparent) */}
      <div
        ref={crosshairRef}
        className={`fixed top-0 left-0 z-[998] pointer-events-none transition-all duration-200 ease-out flex items-center justify-center ${
          hovered ? "w-10 h-10" : "w-7 h-7"
        }`}
        style={{
          transform: `scale(${clicked ? 0.8 : 1})`,
        }}
      >
        {/* Top Tick */}
        <span
          className={`absolute top-0 w-[2px] transition-all duration-200 ${
            hovered ? "h-2.5 bg-cyan-400" : "h-1.5 bg-white/40"
          }`}
        />
        {/* Bottom Tick */}
        <span
          className={`absolute bottom-0 w-[2px] transition-all duration-200 ${
            hovered ? "h-2.5 bg-cyan-400" : "h-1.5 bg-white/40"
          }`}
        />
        {/* Left Tick */}
        <span
          className={`absolute left-0 h-[2px] transition-all duration-200 ${
            hovered ? "w-2.5 bg-cyan-400" : "w-1.5 bg-white/40"
          }`}
        />
        {/* Right Tick */}
        <span
          className={`absolute right-0 h-[2px] transition-all duration-200 ${
            hovered ? "w-2.5 bg-cyan-400" : "w-1.5 bg-white/40"
          }`}
        />
      </div>
    </div>
  );
}