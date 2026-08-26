"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue } from "framer-motion";

export default function AnimatedBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // High performance mouse tracking using Framer Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement for the gradient layers
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollY } = useScroll();

  // Scroll parallax effects for different layers
  const yGlow = useTransform(scrollY, [0, 1000], [0, 50]);
  const yGrid = useTransform(scrollY, [0, 1000], [0, 100]);
  const yCanvas = useTransform(scrollY, [0, 1000], [0, 150]);

  // Determine Variant
  const getVariant = () => {
    if (pathname === "/") return "hero";
    if (pathname?.includes("projects")) return "projects";
    if (pathname?.includes("skills")) return "skills";
    if (pathname?.includes("experience")) return "experience";
    if (pathname?.includes("certifications")) return "certifications";
    if (pathname?.includes("contact")) return "contact";
    return "default";
  };
  const variant = getVariant();

  // Mouse move handler
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 based on screen center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  // Canvas particle logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        if (!canvas) {
          this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; this.radius = 1;
          return;
        }
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.15; // Slower speed
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Subtle mouse repel (read directly from framer motion values for no re-renders)
        const mx = (mouseX.get() + 1) / 2 * canvas.width;
        const my = (mouseY.get() + 1) / 2 * canvas.height;

        if (mx !== canvas.width / 2 || my !== canvas.height / 2) {
           const dx = mx - this.x;
           const dy = my - this.y;
           const distance = Math.sqrt(dx * dx + dy * dy);

           if (distance < 150) {
             this.x -= (dx / distance) * 0.5;
             this.y -= (dy / distance) * 0.5;
           }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const isDark = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDark ? "rgba(100, 200, 255, 0.4)" : "rgba(37, 99, 235, 0.4)";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 80);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const isDark = document.documentElement.classList.contains("dark");
            const opacity = 1 - distance / 120;
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(100, 200, 255, ${opacity * 0.15})`
              : `rgba(37, 99, 235, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, mouseX, mouseY]);

  // Mapping mouse values to subtle offsets
  const layer1X = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const layer1Y = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  const layer2X = useTransform(smoothMouseX, [-1, 1], [30, -30]);
  const layer2Y = useTransform(smoothMouseY, [-1, 1], [30, -30]);

  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden bg-transparent pointer-events-none transition-colors duration-500"
      ref={containerRef}
    >
      {/* 1. Ambient Gradients */}
      <motion.div
        style={!prefersReducedMotion ? { y: yGlow } : {}}
        className="absolute inset-0 w-full h-full"
      >
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 dark:opacity-20 transition-all duration-1000 ease-in-out"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(0,0,0,0) 70%)",
            top: variant === "hero" ? "-10%" : "20%",
            left: variant === "contact" ? "40%" : "-10%",
            x: layer1X,
            y: layer1Y
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 dark:opacity-15 transition-all duration-1000 ease-in-out"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(0,0,0,0) 70%)",
            bottom: variant === "projects" ? "0%" : "-20%",
            right: variant === "skills" ? "10%" : "-10%",
            x: layer2X,
            y: layer2Y
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 dark:opacity-10 transition-all duration-1000 ease-in-out"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(0,0,0,0) 70%)",
            top: "40%",
            right: "20%",
            display: variant === "experience" || variant === "hero" ? "block" : "none",
            x: layer1X,
            y: layer2Y
          }}
        />
      </motion.div>

      {/* 2. Grid / Dot Texture */}
      <motion.div
        style={!prefersReducedMotion ? { y: yGrid } : {}}
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={variant === 'contact' ? "url(#grid-pattern)" : "url(#dot-pattern)"} className="text-blue-900 dark:text-blue-200" />
        </svg>
      </motion.div>

      {/* 3. Data Particle Field & Lines (Canvas) */}
      {!prefersReducedMotion && (
        <motion.div
          style={{ y: yCanvas }}
          className="absolute inset-0"
        >
          <canvas
            ref={canvasRef}
            className="block w-full h-full"
          />
        </motion.div>
      )}

      {/* 4. Subtle Data Flow Lines for specific variants */}
      {!prefersReducedMotion && (variant === "experience" || variant === "projects") && (
        <motion.div
          style={{ y: yCanvas }}
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <path
              d="M -100,200 C 300,400 600,0 1200,300"
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="1"
              className="animate-pulse-glow"
            />
            <path
              d="M -100,600 C 400,200 800,800 1400,400"
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="0.5"
              className="animate-pulse-glow"
              style={{ animationDelay: "2s" }}
            />
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59,130,246,0)" />
                <stop offset="50%" stopColor="rgba(59,130,246,1)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </div>
  );
}
