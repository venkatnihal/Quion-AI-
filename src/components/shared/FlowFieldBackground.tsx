"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlowFieldBackgroundProps {
  className?: string;
  color?: string;
  color2?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
}

export default function FlowFieldBackground({
  className,
  color = "#00D4FF",
  color2 = "#6D5DFC",
  trailOpacity = 0.08,
  particleCount = 500,
  speed = 0.7,
}: FlowFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };

    // Parse hex to rgb
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb1 = hexToRgb(color);
    const rgb2 = hexToRgb(color2);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      life: number;
      colorMix: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
        this.colorMix = Math.random();
      }

      update() {
        const angle = (Math.cos(this.x * 0.004) + Math.sin(this.y * 0.004)) * Math.PI;
        this.vx += Math.cos(angle) * 0.15 * speed;
        this.vy += Math.sin(angle) * 0.15 * speed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 120;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx -= dx * force * 0.04;
          this.vy -= dy * force * 0.04;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.age++;

        if (this.age > this.life) this.reset();

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
        this.colorMix = Math.random();
      }

      draw(context: CanvasRenderingContext2D) {
        const alpha = (1 - Math.abs((this.age / this.life) - 0.5) * 2) * 0.6;
        const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * this.colorMix);
        const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * this.colorMix);
        const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * this.colorMix);
        context.globalAlpha = alpha;
        context.fillStyle = `rgb(${r},${g},${b})`;
        context.fillRect(this.x, this.y, 1.5, 1.5);
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Fewer particles on mobile for performance
      const count = width < 768 ? Math.floor(particleCount * 0.3) : particleCount;
      particles = Array.from({ length: count }, () => new Particle());
    };

    const animate = () => {
      ctx.fillStyle = `rgba(5, 8, 22, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    init();
    animate();

    window.addEventListener("resize", handleResize, { passive: true });
    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, color2, trailOpacity, particleCount, speed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{ backgroundColor: "#050816" }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden />
    </div>
  );
}
