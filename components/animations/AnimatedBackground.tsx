"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDarkRef = useRef(false);

  useEffect(() => {
    // Keep track of dark mode state without triggering React re-renders
    const checkDark = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    let nodes: DataNode[] = [];
    let width = 0;
    let height = 0;

    class DataNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Slow, subtle movement
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(14, 165, 233, 0.4)" : "rgba(37, 99, 235, 0.4)";
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = [];
      // Reduced node count for performance (mobile: 20, tablet: 35, desktop: 50)
      const nodeCount = window.innerWidth < 768 ? 20 : window.innerWidth < 1024 ? 35 : 50;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new DataNode(Math.random() * width, Math.random() * height));
      }
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initNodes();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resizeCanvas();

    const drawGrid = (ctx: CanvasRenderingContext2D, isDark: boolean) => {
        const size = 80;
        ctx.beginPath();
        ctx.setLineDash([2, 4]);

        for (let x = 0; x <= width; x += size) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += size) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }

        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
    };

    const animate = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);
      const isDark = isDarkRef.current;

      // Draw lightweight static grid
      drawGrid(ctx, isDark);

      ctx.lineWidth = 0.5;

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw(ctx, isDark);

        let connections = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          // Hard limit on connections per node to prevent O(n^2) scaling lag
          if (connections >= 2) continue;

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 150;

          if (distSq < maxDist * maxDist) {
            ctx.beginPath();
            const opacity = (1 - Math.sqrt(distSq) / maxDist) * 0.15;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const strokeColor = isDark ? `rgba(147, 197, 253, ${opacity})` : `rgba(148, 163, 184, ${opacity})`;
            ctx.strokeStyle = strokeColor;
            ctx.stroke();
            connections++;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      isRunning = false;
    };
  }, [prefersReducedMotion]);

  const baseBgClass = "fixed inset-0 z-[-2] pointer-events-none transition-colors duration-700 bg-slate-50 dark:bg-[#020617]";

  return (
    <>
      <div className={baseBgClass} />

      <div
        className="fixed inset-0 z-[-1] overflow-hidden bg-transparent pointer-events-none"
      >
        <div className="absolute inset-0 w-full h-full">
          {/* Main Atmospheric Glow - Cyan/Blue */}
          <div
            className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-[0.15] dark:opacity-[0.1] mix-blend-normal dark:mix-blend-screen -top-[10%] -left-[10%]"
            style={{
              background: "radial-gradient(circle, rgba(14,165,233,0.8) 0%, rgba(37,99,235,0.4) 40%, rgba(0,0,0,0) 70%)",
            }}
          />

          {/* Secondary Glow - Indigo/Violet */}
          <div
            className="absolute w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.1] dark:opacity-[0.1] mix-blend-normal dark:mix-blend-screen top-[15%] -right-[10%]"
            style={{
              background: "radial-gradient(circle, rgba(79,70,229,0.7) 0%, rgba(67,56,202,0.4) 40%, rgba(0,0,0,0) 70%)",
            }}
          />

          {/* Power BI Yellow Accent Glow */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.05] dark:opacity-[0.03] bottom-[10%] left-[40%]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(250,204,21,0.8) 0%, rgba(202,138,4,0.3) 50%, rgba(0,0,0,0) 70%)",
            }}
          />
        </div>

        {!prefersReducedMotion && (
          <div className="absolute inset-0 transition-opacity duration-1000 opacity-80">
            <canvas
              ref={canvasRef}
              className="block w-full h-full"
            />
          </div>
        )}
      </div>
    </>
  );
}
