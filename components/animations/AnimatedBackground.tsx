"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue } from "framer-motion";

export default function AnimatedBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [activeSection, setActiveSection] = useState("hero");
  const variantRef = useRef("hero");
  const isDarkRef = useRef(false);

  useEffect(() => {
    // Keep track of dark mode
    const checkDark = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      let v = "default";
      if (pathname?.includes("projects")) v = "projects";
      else if (pathname?.includes("certifications")) v = "certifications";
      else if (pathname?.includes("contact")) v = "contact";
      else if (pathname?.includes("about")) v = "about";
      else if (pathname?.includes("experience")) v = "experience";
      else if (pathname?.includes("skills")) v = "skills";
      variantRef.current = v;
      return;
    }

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

    const sections = ["about", "skills", "experience", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const { scrollY } = useScroll();

  const yGlow = useTransform(scrollY, [0, 1500], [0, 80]);
  const yNetwork = useTransform(scrollY, [0, 1500], [0, 150]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNetwork();
      initPipelines();
    };

    window.addEventListener("resize", resizeCanvas);

    const isMobile = window.innerWidth < 768;

    // --------------------------------------------------------
    // DATA NODES & KPI INDICATORS
    // --------------------------------------------------------
    const kpiLabels = ["Revenue", "Growth", "Sales", "YoY", "Margin", "KPI", "ROI"];
    const daxSqlLabels = ["SUM()", "CALCULATE()", "FILTER()", "SELECT", "JOIN", "GROUP BY", "DAX", "SQL", "ETL"];

    type NodeType = "normal" | "kpi" | "dax" | "chart";

    class DataNode {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      type: NodeType;
      label: string;
      isGlowing: boolean;
      glowIntensity: number;
      pulseSpeed: number;
      chartData: number[];

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = (Math.random() - 0.5) * 0.05;
        this.vy = (Math.random() - 0.5) * 0.05;

        const rand = Math.random();
        if (rand < 0.1) {
            this.type = "kpi";
            this.label = kpiLabels[Math.floor(Math.random() * kpiLabels.length)];
            this.radius = 2.5;
        } else if (rand < 0.2) {
            this.type = "dax";
            this.label = daxSqlLabels[Math.floor(Math.random() * daxSqlLabels.length)];
            this.radius = 1;
        } else if (rand < 0.25) {
            this.type = "chart";
            this.label = "";
            this.radius = 3;
        } else {
            this.type = "normal";
            this.label = "";
            this.radius = Math.random() * 1 + 0.5;
        }

        this.isGlowing = this.type === "kpi" || this.type === "chart" || Math.random() < 0.1;
        if(this.type === "dax") this.isGlowing = false;

        this.glowIntensity = Math.random();
        this.pulseSpeed = 0.01 + Math.random() * 0.02;

        this.chartData = Array.from({length: 4}, () => Math.random());
      }

      update(time: number, mx: number, my: number, variant: string) {
        const cx = canvas!.width / 2;
        const cy = canvas!.height / 2;

        if (variant === "hero") {
            // Orbit slowly or flow towards center (insight effect)
            const dx = cx - this.x;
            const dy = cy - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist > 150) {
                // gentle flow toward center
                this.x += dx * 0.00015 + this.vx;
                this.y += dy * 0.00015 + this.vy;
            } else {
                // slow orbit
                const angle = Math.atan2(dy, dx);
                this.x += Math.cos(angle + Math.PI/2) * 0.35;
                this.y += Math.sin(angle + Math.PI/2) * 0.35;
            }
        } else if (variant === "experience") {
            // Pipeline flow (left to right or vertical)
            this.x += 0.2;
            this.y += Math.sin(time * 0.001 + this.baseX) * 0.1;
            if (this.x > canvas!.width + 50) this.x = -50;
        } else {
            // Drift
            this.x += Math.sin(time * 0.001 + this.baseY) * 0.15 + this.vx;
            this.y += Math.cos(time * 0.001 + this.baseX) * 0.15 + this.vy;
            this.x += (this.baseX - this.x) * 0.005;
            this.y += (this.baseY - this.y) * 0.005;
        }

        if (this.isGlowing) {
           this.glowIntensity = (Math.sin(time * this.pulseSpeed) + 1) / 2;
        }

        // Cursor interaction
        const dxMouse = mx - this.x;
        const dyMouse = my - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse > 0 && distMouse < 200) {
          const force = (200 - distMouse) / 200;
          this.x -= (dxMouse / distMouse) * force * 0.5;
          this.y -= (dyMouse / distMouse) * force * 0.5;
          if(this.type === "kpi" || this.type === "chart") {
              this.glowIntensity = Math.min(1, this.glowIntensity + 0.5);
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
        ctx.beginPath();

        const primaryColor = isDark ? "14, 165, 233" : "37, 99, 235"; // Cyan / Blue
        const yellowAccent = isDark ? "250, 204, 21" : "202, 138, 4"; // Power BI Yellow

        if (this.type === "kpi") {
            // Draw ring
            ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2 * this.glowIntensity);
            ctx.strokeStyle = `rgba(${yellowAccent}, ${0.3 + this.glowIntensity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw center dot
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${primaryColor}, ${0.8})`;
            ctx.fill();

            // Label
            if(isDark) {
               ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + this.glowIntensity * 0.3})`;
            } else {
               ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + this.glowIntensity * 0.3})`;
            }
            ctx.font = "8px sans-serif";
            ctx.fillText(this.label, this.x + 8, this.y + 3);

        } else if (this.type === "chart") {
            // Draw tiny bar chart
            const barW = 2;
            const maxH = 8;
            for(let i=0; i<3; i++) {
                const h = this.chartData[i] * maxH * (0.5 + this.glowIntensity * 0.5);
                ctx.fillStyle = i === 2 ? `rgba(${yellowAccent}, 0.6)` : `rgba(${primaryColor}, 0.6)`;
                ctx.fillRect(this.x - 4 + i*(barW+1), this.y + 4 - h, barW, h);
            }
        } else if (this.type === "dax") {
            if(isDark) ctx.fillStyle = `rgba(255, 255, 255, 0.05)`;
            else ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
            ctx.font = "bold 9px monospace";
            ctx.fillText(this.label, this.x, this.y);
        } else {
            // Normal node
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            if (this.isGlowing) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${primaryColor}, 0.5)`;
                ctx.fillStyle = `rgba(${primaryColor}, ${0.3 + this.glowIntensity * 0.5})`;
            } else {
                ctx.fillStyle = isDark ? "rgba(147, 197, 253, 0.2)" : "rgba(37, 99, 235, 0.2)";
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }
    }

    let nodes: DataNode[] = [];
    const initNetwork = () => {
      nodes = [];
      const nodeCount = isMobile ? 35 : 80;
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        nodes.push(new DataNode(x, y));
      }
    };

    // --------------------------------------------------------
    // DATA PIPELINES (ETL Flows)
    // --------------------------------------------------------
    class DataPipeline {
       path: {x: number, y: number}[];
       progress: number;
       speed: number;
       length: number;

       constructor() {
           this.path = [];
           this.progress = 0;
           this.speed = 0.002 + Math.random() * 0.003;
           this.length = 0.15 + Math.random() * 0.2;
           this.generatePath();
       }

       generatePath() {
           this.path = [];
           const w = canvas!.width;
           const h = canvas!.height;

           // Generate right-angle paths simulating data pipeline logic
           let cx = Math.random() * w;
           let cy = Math.random() * h;
           this.path.push({x: cx, y: cy});

           for(let i=0; i<4; i++) {
               if (i % 2 === 0) {
                   cx += (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 200);
               } else {
                   cy += (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 200);
               }
               this.path.push({x: cx, y: cy});
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

           const segments = this.path.length - 1;
           const scaledT = t * segments;
           const index = Math.min(Math.floor(scaledT), segments - 1);
           const frac = scaledT - index;

           const p1 = this.path[index];
           const p2 = this.path[index + 1];

           return {
               x: p1.x + (p2.x - p1.x) * frac,
               y: p1.y + (p2.y - p1.y) * frac
           };
       }

       draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
           if (this.progress === 0 || this.path.length < 2) return;

           const startT = Math.max(0, this.progress - this.length);
           const endT = Math.min(1, this.progress);
           if (startT >= endT) return;

           ctx.beginPath();

           // Draw path
           for (let t = startT; t <= endT; t += 0.01) {
               const pt = this.getPointAt(t);
               if (t === startT) ctx.moveTo(pt.x, pt.y);
               else ctx.lineTo(pt.x, pt.y);
           }

           const startPt = this.getPointAt(startT);
           const endPt = this.getPointAt(endT);

           const grad = ctx.createLinearGradient(startPt.x, startPt.y, endPt.x, endPt.y);

           // Yellow for insights, cyan/blue for raw data
           const color = isDark ? "14, 165, 233" : "37, 99, 235";

           grad.addColorStop(0, `rgba(${color}, 0)`);
           grad.addColorStop(0.8, `rgba(${color}, 0.5)`);
           grad.addColorStop(1, `rgba(${color}, 0.8)`);

           ctx.strokeStyle = grad;
           ctx.lineWidth = 1.5;
           ctx.shadowBlur = 8;
           ctx.shadowColor = `rgba(${color}, 0.5)`;

           // Sometimes make it a dashed line for 'processing' feel
           if (Math.random() < 0.05) {
               ctx.setLineDash([5, 5]);
           } else {
               ctx.setLineDash([]);
           }

           ctx.stroke();
           ctx.shadowBlur = 0;
           ctx.setLineDash([]);

           // Draw a glowing data packet at the head
           ctx.beginPath();
           ctx.arc(endPt.x, endPt.y, 2.5, 0, Math.PI * 2);
           ctx.fillStyle = isDark ? `rgba(250, 204, 21, 0.9)` : `rgba(202, 138, 4, 0.9)`;
           ctx.shadowBlur = 10;
           ctx.shadowColor = isDark ? `rgba(250, 204, 21, 0.8)` : `rgba(202, 138, 4, 0.8)`;
           ctx.fill();
           ctx.shadowBlur = 0;
       }
    }

    let pipelines: DataPipeline[] = [];
    const initPipelines = () => {
        pipelines = [];
        for (let i=0; i < (isMobile ? 3 : 6); i++) {
            pipelines.push(new DataPipeline());
        }
    }

    // --------------------------------------------------------
    // ANALYTICAL TERRAIN / TREND LINES
    // --------------------------------------------------------
    const drawTrendLines = (ctx: CanvasRenderingContext2D, time: number, isDark: boolean, variant: string, mx: number) => {
       const h = canvas!.height;
       const w = canvas!.width;
       const yBase = h * (variant === "hero" ? 0.8 : 0.9);

       const lines = 3;

       for(let l = 0; l < lines; l++) {
           ctx.beginPath();

           const amplitude = 50 + l * 20;
           const frequency = 0.002 - l * 0.0005;
           const speed = 0.0005 + l * 0.0002;

           for (let x = 0; x <= w; x += 40) { // step size
               const nx = x / w;
               // Create step-like or smooth trend
               let yOffset = Math.sin(x * frequency + time * speed) * amplitude;
               yOffset += Math.cos(x * frequency * 2 - time * speed * 1.5) * (amplitude * 0.5);

               // Interactive bend based on mouse X
               const distToMouseX = Math.abs(x - mx);
               if (distToMouseX < 300) {
                   yOffset -= (300 - distToMouseX) * 0.05 * (l+1);
               }

               const y = yBase - (l * 40) + yOffset;

               if (x === 0) {
                   ctx.moveTo(x, y);
               } else {
                   // Render as smooth curve (Bezier)
                   const prevX = x - 40;
                   const prevYOffset = Math.sin(prevX * frequency + time * speed) * amplitude +
                                       Math.cos(prevX * frequency * 2 - time * speed * 1.5) * (amplitude * 0.5);
                   const prevY = yBase - (l * 40) + prevYOffset;

                   const cpX1 = prevX + 20;
                   const cpX2 = x - 20;

                   ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
               }
           }

           if (l === 0) {
               ctx.strokeStyle = isDark ? "rgba(14, 165, 233, 0.15)" : "rgba(37, 99, 235, 0.1)"; // Cyan
               ctx.lineWidth = 2;
           } else if (l === 1) {
               ctx.strokeStyle = isDark ? "rgba(250, 204, 21, 0.08)" : "rgba(202, 138, 4, 0.08)"; // Yellow
               ctx.lineWidth = 1.5;
           } else {
               ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(79, 70, 229, 0.08)"; // Indigo
               ctx.lineWidth = 1;
           }

           ctx.stroke();

           // Area fill for the bottom line
           if (l === 0) {
               ctx.lineTo(w, h);
               ctx.lineTo(0, h);
               ctx.closePath();

               const areaGrad = ctx.createLinearGradient(0, yBase - 50, 0, h);
               areaGrad.addColorStop(0, isDark ? "rgba(14, 165, 233, 0.03)" : "rgba(37, 99, 235, 0.03)");
               areaGrad.addColorStop(1, "rgba(0,0,0,0)");
               ctx.fillStyle = areaGrad;
               ctx.fill();
           }
       }
    };

    // --------------------------------------------------------
    // DIMENSIONAL GRID
    // --------------------------------------------------------
    const drawGrid = (ctx: CanvasRenderingContext2D, isDark: boolean, time: number) => {
        const size = 60;
        const width = canvas!.width;
        const height = canvas!.height;

        ctx.beginPath();

        // Parallax offset
        const offsetX = (time * 0.01) % size;
        const offsetY = (time * 0.005) % size;

        // Draw dotted/dashed grid lines
        ctx.setLineDash([2, 4]);

        for (let x = -size; x <= width + size; x += size) {
            ctx.moveTo(x + offsetX, 0);
            ctx.lineTo(x + offsetX, height);
        }
        for (let y = -size; y <= height + size; y += size) {
            ctx.moveTo(0, y + offsetY);
            ctx.lineTo(width, y + offsetY);
        }

        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
    };

    // --------------------------------------------------------
    // MAIN RENDER LOOP
    // --------------------------------------------------------
    const animate = (timestamp: number) => {
      if (!canvas) return;
      time = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = isDarkRef.current;

      const mx = (mouseX.get() + 1) / 2 * canvas.width;
      const my = (mouseY.get() + 1) / 2 * canvas.height;
      const v = variantRef.current;

      // 1. Draw Grid
      drawGrid(ctx, isDark, time);

      // 2. Draw Trend Lines / Terrain
      if (v === "hero" || v === "projects" || v === "contact" || v === "experience") {
          drawTrendLines(ctx, time, isDark, v, mx);
      }

      // 3. Draw Network Connections
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        // Only connect normal and KPI nodes
        if (nodes[i].type === "dax") continue;

        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j].type === "dax") continue;

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 120;

          if (distance < maxDist) {
            const opacity = Math.pow(1 - distance / maxDist, 2) * 0.2;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const isInsight = nodes[i].type === "kpi" || nodes[j].type === "kpi";

            let strokeColor;
            if (isInsight) {
                strokeColor = isDark ? `rgba(14, 165, 233, ${opacity * 1.5})` : `rgba(37, 99, 235, ${opacity * 1.5})`;
            } else {
                strokeColor = isDark ? `rgba(147, 197, 253, ${opacity})` : `rgba(148, 163, 184, ${opacity})`;
            }

            ctx.strokeStyle = strokeColor;
          }
        }
      }
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // 4. Draw Nodes
      nodes.forEach(node => {
        node.update(time, mx, my, v);
        node.draw(ctx, isDark);
      });

      // 5. Draw Pipelines
      pipelines.forEach(pipeline => {
          pipeline.update();
          pipeline.draw(ctx, isDark);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, mouseX, mouseY]);

  const layer1X = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const layer1Y = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const layer2X = useTransform(smoothMouseX, [-1, 1], [40, -40]);
  const layer2Y = useTransform(smoothMouseY, [-1, 1], [40, -40]);

  const isHeroOrProjects = activeSection === "hero" || activeSection === "projects" || pathname?.includes("projects");
  const isContact = activeSection === "contact" || pathname?.includes("contact");

  const baseBgClass = "fixed inset-0 z-[-2] pointer-events-none transition-colors duration-700 bg-slate-50 dark:bg-[#020617]"; // Very deep navy/black

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
          {/* Main Atmospheric Glow - Cyan/Blue */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-[0.2] dark:opacity-[0.15] transition-all duration-1000 ease-in-out mix-blend-normal dark:mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(14,165,233,0.8) 0%, rgba(37,99,235,0.4) 40%, rgba(0,0,0,0) 70%)",
              top: isHeroOrProjects ? "-10%" : "10%",
              left: isContact ? "30%" : "-15%",
              x: layer1X,
              y: layer1Y
            }}
          />

          {/* Secondary Glow - Indigo/Violet */}
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.15] dark:opacity-[0.15] transition-all duration-1000 ease-in-out mix-blend-normal dark:mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(79,70,229,0.7) 0%, rgba(67,56,202,0.4) 40%, rgba(0,0,0,0) 70%)",
              top: "15%",
              right: "-10%",
              x: layer2X,
              y: layer2Y
            }}
          />

          {/* Power BI Yellow Accent Glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.08] dark:opacity-[0.05] transition-all duration-1000 ease-in-out"
            style={{
              background: "radial-gradient(ellipse at center, rgba(250,204,21,0.8) 0%, rgba(202,138,4,0.3) 50%, rgba(0,0,0,0) 70%)",
              bottom: "10%",
              left: "40%",
              x: layer1X,
              y: layer2Y
            }}
          />

          {/* Base Environmental Glow */}
          <motion.div
            className="absolute w-[1000px] h-[500px] rounded-full blur-[130px] opacity-[0.1] dark:opacity-[0.1] transition-all duration-1000 ease-in-out"
            style={{
              background: "radial-gradient(ellipse at center, rgba(37,99,235,0.6) 0%, rgba(14,165,233,0.3) 50%, rgba(0,0,0,0) 70%)",
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
              className="block w-full h-full opacity-85"
            />
          </motion.div>
        )}
      </div>
    </>
  );
}
