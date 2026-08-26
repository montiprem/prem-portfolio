"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue } from "framer-motion";

export default function AnimatedBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track active section for homepage scrolling
  const [activeSection, setActiveSection] = useState("hero");
  const variantRef = useRef("hero");

  useEffect(() => {
    if (pathname !== "/") {
      let v = "default";
      if (pathname?.includes("projects")) v = "projects";
      else if (pathname?.includes("certifications")) v = "certifications";
      else if (pathname?.includes("contact")) v = "contact";
      variantRef.current = v;
      return;
    }

    // Intersection Observer to track homepage sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "hero");
            variantRef.current = entry.target.id || "hero";
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );

    // Observe specific homepage sections
    const sections = ["about", "skills", "experience", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Also observe the top hero wrapper if possible, or fallback to hero when near top
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("hero");
        variantRef.current = "hero";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // High performance mouse tracking using Framer Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement for the gradient layers
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const { scrollY } = useScroll();

  // Gentle scroll parallax effects for different layers
  const yGlow = useTransform(scrollY, [0, 1500], [0, 80]);
  const yNetwork = useTransform(scrollY, [0, 1500], [0, 150]);

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

  // Main Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNetwork();
      initTrails();
    };

    window.addEventListener("resize", resizeCanvas);

    const isMobile = window.innerWidth < 768;

    // --------------------------------------------------------
    // 1. STRUCTURED NETWORK
    // --------------------------------------------------------
    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      isGlowing: boolean;
      glowIntensity: number;
      pulseSpeed: number;
      targetX: number | null = null;
      targetY: number | null = null;

      constructor(x: number, y: number, isGlowing: boolean = false) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = (Math.random() - 0.5) * 0.05;
        this.vy = (Math.random() - 0.5) * 0.05;
        this.radius = isGlowing ? Math.random() * 2 + 1.5 : Math.random() * 1 + 0.5;
        this.isGlowing = isGlowing;
        this.glowIntensity = Math.random();
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
      }

      update(time: number, mx: number, my: number, variant: string) {
        // Dynamic Behavior based on Variant
        if (variant === "experience") {
            // Vertical data flow
            this.y += (this.vy > 0 ? this.vy : this.vy * -1) + 0.1; // Gentle downward drift
            this.x += Math.sin(time * 0.001 + this.baseY) * 0.05;

            // Loop back to top
            if (this.y > canvas!.height + 50) {
                this.y = -50;
                this.x = this.baseX;
            }
        } else if (variant === "contact") {
            // Converge slightly towards center
            const cx = canvas!.width / 2;
            const cy = canvas!.height / 2;
            this.x += (cx - this.x) * 0.0001 + this.vx;
            this.y += (cy - this.y) * 0.0001 + this.vy;
        } else {
            // Very slow drifting around base position
            this.x += Math.sin(time * 0.001 + this.baseY) * 0.2 + this.vx;
            this.y += Math.cos(time * 0.001 + this.baseX) * 0.2 + this.vy;

            // Gentle constraint to base position
            this.x += (this.baseX - this.x) * 0.01;
            this.y += (this.baseY - this.y) * 0.01;
        }

        // Pulse glowing nodes
        if (this.isGlowing) {
           this.glowIntensity = (Math.sin(time * this.pulseSpeed) + 1) / 2;
        }

        // Extremely subtle mouse repel
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0 && dist < 180) {
          const force = (180 - dist) / 180;
          const repelStrength = variant === "experience" ? 0.2 : 0.5;
          this.x -= (dx / dist) * force * repelStrength;
          this.y -= (dy / dist) * force * repelStrength;
        }
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        if (this.isGlowing) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = isDark ? "rgba(96, 165, 250, 0.8)" : "rgba(37, 99, 235, 0.6)";
          ctx.fillStyle = isDark
            ? `rgba(191, 219, 254, ${0.4 + this.glowIntensity * 0.6})`
            : `rgba(37, 99, 235, ${0.4 + this.glowIntensity * 0.6})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = isDark ? "rgba(147, 197, 253, 0.3)" : "rgba(37, 99, 235, 0.3)";
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let nodes: Node[] = [];

    const initNetwork = () => {
      nodes = [];
      // Use maximum node count, hide/show based on density later if needed
      const nodeCount = isMobile ? 45 : 100;

      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        const isGlowing = Math.random() < 0.15;
        nodes.push(new Node(x, y, isGlowing));
      }
    };

    // --------------------------------------------------------
    // 2. LIGHT TRAILS (Data streams)
    // --------------------------------------------------------
    class Trail {
       path: {x: number, y: number}[];
       progress: number;
       speed: number;
       length: number;

       constructor() {
           this.path = [];
           this.progress = 0;
           this.speed = 0.001 + Math.random() * 0.002;
           this.length = 0.1 + Math.random() * 0.2;
           this.generatePath();
       }

       generatePath() {
           this.path = [];
           const v = variantRef.current;

           if (v === "experience") {
               // Vertical streams
               const startX = Math.random() * canvas!.width;
               const startY = -100;
               this.path.push({x: startX, y: startY});

               let cy = startY;
               let cx = startX;
               for(let i=0; i<3; i++) {
                   cy += canvas!.height / 3 + Math.random() * 100;
                   cx += (Math.random() - 0.5) * 150;
                   this.path.push({x: cx, y: cy});
               }
           } else {
               // Horizontal-ish streams
               const startX = Math.random() < 0.5 ? -50 : canvas!.width + 50;
               const startY = Math.random() * canvas!.height;
               this.path.push({x: startX, y: startY});

               let cx = startX;
               let cy = startY;

               for(let i=0; i<3; i++) {
                   cx += (startX < 0 ? 1 : -1) * (canvas!.width / 3) + (Math.random() - 0.5) * 200;
                   cy += (Math.random() - 0.5) * 400;
                   this.path.push({x: cx, y: cy});
               }
           }
       }

       update() {
           this.progress += this.speed;
           if (this.progress > 1 + this.length) {
               this.progress = 0;
               this.generatePath();
           }
       }

       getPointAt(t: number) {
           if (t < 0) t = 0;
           if (t > 1) t = 1;
           const p = this.path;
           const segments = p.length - 1;
           const segment = Math.min(Math.floor(t * segments), segments - 1);
           const localT = (t * segments) - segment;

           const p0 = p[Math.max(0, segment - 1)];
           const p1 = p[segment];
           const p2 = p[Math.min(segments, segment + 1)];
           const p3 = p[Math.min(segments, segment + 2)] || p2;

           const t2 = localT * localT;
           const t3 = t2 * localT;

           const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * localT + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
           const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * localT + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

           return {x, y};
       }

       draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
           if (this.progress === 0 || this.path.length < 2) return;

           const startT = Math.max(0, this.progress - this.length);
           const endT = Math.min(1, this.progress);
           if (startT >= endT) return;

           ctx.beginPath();
           for (let t = startT; t <= endT; t += 0.02) {
               const pt = this.getPointAt(t);
               if (t === startT) ctx.moveTo(pt.x, pt.y);
               else ctx.lineTo(pt.x, pt.y);
           }

           const startPt = this.getPointAt(startT);
           const endPt = this.getPointAt(endT);
           const grad = ctx.createLinearGradient(startPt.x, startPt.y, endPt.x, endPt.y);
           const color = isDark ? "139, 92, 246" : "99, 102, 241"; // Violet/Indigo

           grad.addColorStop(0, `rgba(${color}, 0)`);
           grad.addColorStop(0.8, `rgba(${color}, 0.5)`);
           grad.addColorStop(1, `rgba(${color}, 0.8)`);

           ctx.strokeStyle = grad;
           ctx.lineWidth = 2;
           ctx.shadowBlur = 10;
           ctx.shadowColor = `rgba(${color}, 0.6)`;
           ctx.stroke();
           ctx.shadowBlur = 0;
       }
    }

    let trails: Trail[] = [];
    const initTrails = () => {
        trails = [];
        for (let i=0; i < (isMobile ? 3 : 5); i++) {
            trails.push(new Trail());
        }
    }

    // --------------------------------------------------------
    // 3. DATA WAVE / TERRAIN
    // --------------------------------------------------------
    const drawWave = (ctx: CanvasRenderingContext2D, time: number, isDark: boolean, variant: string) => {
       const waveHeight = canvas!.height * 0.25;
       const yBase = canvas!.height * (variant === "hero" ? 0.75 : 0.85);

       ctx.beginPath();
       for (let x = 0; x <= canvas!.width; x += 20) {
           const nx = x / canvas!.width;
           const y1 = Math.sin(nx * 5 + time * 0.001) * waveHeight * 0.3;
           const y2 = Math.cos(nx * 10 - time * 0.0015) * waveHeight * 0.15;
           const y3 = Math.sin(nx * 2 + time * 0.0005) * waveHeight * 0.5;

           const perspective = 1 + Math.abs(nx - 0.5) * 2;
           const y = yBase + (y1 + y2 + y3) * perspective;

           if (x === 0) ctx.moveTo(x, y);
           else ctx.lineTo(x, y);
       }
       ctx.strokeStyle = isDark ? "rgba(6, 182, 212, 0.15)" : "rgba(37, 99, 235, 0.1)";
       ctx.lineWidth = 1;
       ctx.stroke();

       ctx.beginPath();
       for (let x = 0; x <= canvas!.width; x += 20) {
           const nx = x / canvas!.width;
           const y1 = Math.sin(nx * 4 + time * 0.0012 + Math.PI) * waveHeight * 0.35;
           const y2 = Math.cos(nx * 8 - time * 0.0018 + Math.PI/2) * waveHeight * 0.1;
           const y3 = Math.sin(nx * 1.5 + time * 0.0007) * waveHeight * 0.4;

           const perspective = 1 + Math.abs(nx - 0.5) * 1.5;
           const y = yBase + 40 + (y1 + y2 + y3) * perspective;

           if (x === 0) ctx.moveTo(x, y);
           else ctx.lineTo(x, y);
       }
       ctx.strokeStyle = isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(99, 102, 241, 0.08)";
       ctx.lineWidth = 1.5;
       ctx.stroke();
    };

    // --------------------------------------------------------
    // 4. SUBTLE GRID
    // --------------------------------------------------------
    const drawGrid = (ctx: CanvasRenderingContext2D, isDark: boolean) => {
        const size = 50;
        const width = canvas!.width;
        const height = canvas!.height;

        ctx.beginPath();
        for (let x = 0; x <= width; x += size) {
            for (let y = 0; y <= height; y += size) {
                ctx.moveTo(x - 2, y);
                ctx.lineTo(x + 2, y);
                ctx.moveTo(x, y - 2);
                ctx.lineTo(x, y + 2);
            }
        }
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();
    };

    // --------------------------------------------------------
    // MAIN RENDER LOOP
    // --------------------------------------------------------
    const animate = (timestamp: number) => {
      if (!canvas) return;
      time = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");

      const mx = (mouseX.get() + 1) / 2 * canvas.width;
      const my = (mouseY.get() + 1) / 2 * canvas.height;
      const v = variantRef.current;

      // Draw Grid
      if (v === "projects" || v === "contact" || v === "skills" || v === "hero") {
          drawGrid(ctx, isDark);
      }

      // Draw Data Wave
      if (v === "hero" || v === "projects" || v === "contact") {
          drawWave(ctx, time, isDark, v);
      }

      // Draw Network Connections
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = (v === "contact" || v === "skills") ? 130 : 150;

          if (distance < maxDist) {
            const opacity = Math.pow(1 - distance / maxDist, 2) * 0.25;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const color = (nodes[i].isGlowing || nodes[j].isGlowing) && isDark
                ? `rgba(139, 92, 246, ${opacity * 1.5})`
                : (isDark ? `rgba(96, 165, 250, ${opacity})` : `rgba(37, 99, 235, ${opacity})`);

            ctx.strokeStyle = color;
          }
        }
      }
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Draw Nodes
      nodes.forEach(node => {
        node.update(time, mx, my, v);
        node.draw(ctx, isDark);
      });

      // Draw Trails
      trails.forEach(trail => {
          trail.update();
          // Hide trails on certifications page for minimal look
          if (v !== "certifications") {
             trail.draw(ctx, isDark);
          }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, mouseX, mouseY]); // Removed 'variant' to prevent abrupt resets

  // Mapping mouse values to subtle offsets
  const layer1X = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const layer1Y = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const layer2X = useTransform(smoothMouseX, [-1, 1], [40, -40]);
  const layer2Y = useTransform(smoothMouseY, [-1, 1], [40, -40]);

  // Derived style values that adjust gently over time
  // This uses standard React render cycle, but it's okay for these few container wrappers
  const isHeroOrProjects = activeSection === "hero" || activeSection === "projects" || pathname?.includes("projects");
  const isContact = activeSection === "contact" || pathname?.includes("contact");

  const baseBgClass = "fixed inset-0 z-[-2] pointer-events-none transition-colors duration-700 bg-slate-50 dark:bg-[#050816]";

  return (
    <>
      <div className={baseBgClass} />

      <div
        className="fixed inset-0 z-[-1] overflow-hidden bg-transparent pointer-events-none"
        ref={containerRef}
      >
        <motion.div
          style={!prefersReducedMotion ? { y: yGlow } : {}}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Atmospheric Glow */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-[0.15] dark:opacity-[0.12] transition-all duration-1000 ease-in-out mix-blend-screen dark:mix-blend-lighten"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,1) 0%, rgba(59,130,246,0.6) 40%, rgba(0,0,0,0) 70%)",
              top: isHeroOrProjects ? "-10%" : "10%",
              left: isContact ? "30%" : "-15%",
              x: layer1X,
              y: layer1Y
            }}
          />

          {/* Secondary Glow */}
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.12] dark:opacity-[0.15] transition-all duration-1000 ease-in-out mix-blend-screen dark:mix-blend-lighten"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(79,70,229,0.5) 40%, rgba(0,0,0,0) 70%)",
              top: "5%",
              right: "-10%",
              x: layer2X,
              y: layer2Y
            }}
          />

          {/* Wave Environmental Glow */}
          <motion.div
            className="absolute w-[1000px] h-[500px] rounded-full blur-[130px] opacity-[0.1] dark:opacity-[0.1] transition-all duration-1000 ease-in-out"
            style={{
              background: "radial-gradient(ellipse at center, rgba(59,130,246,0.8) 0%, rgba(14,165,233,0.4) 50%, rgba(0,0,0,0) 70%)",
              bottom: "-20%",
              left: "50%",
              translateX: "-50%",
              opacity: isHeroOrProjects ? 1 : 0,
            }}
          />
        </motion.div>

        {!prefersReducedMotion && (
          <motion.div
            style={{ y: yNetwork }}
            className="absolute inset-0 transition-opacity duration-1000"
          >
            <canvas
              ref={canvasRef}
              className="block w-full h-full opacity-80"
            />
          </motion.div>
        )}
      </div>
    </>
  );
}
