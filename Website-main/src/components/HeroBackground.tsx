import React, { useEffect, useRef, useState } from "react";

type NodeItem = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  label: string;
  color: string;
};

const DEFAULT_NODES = [
  "Process",
  "Data",
  "Model",
  "Automation",
  "People",
  "Strategy",
];

const NODE_DESCRIPTIONS: Record<string, string> = {
  Process: "Business processes & optimization",
  Data: "Data engineering, analytics & pipelines",
  Model: "ML models, evaluation & deployment",
  Automation: "Automation, tooling & integration",
  People: "Change management & training",
  Strategy: "Product & AI strategy & governance",
};

const colors = ["#2563eb", "#0ea5a4", "#7c3aed", "#ef4444", "#0ea5a4", "#0369a1"];

const HOVER_RADIUS = 44;

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; label?: string; desc?: string }>({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // build nodes in a loose circular layout
    const nodes: NodeItem[] = [];
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.28;

    for (let i = 0; i < DEFAULT_NODES.length; i++) {
      const angle = (i / DEFAULT_NODES.length) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
      const y = cy + Math.sin(angle) * radius + (Math.random() - 0.5) * 40;
      nodes.push({ x, y, vx: 0, vy: 0, size: 6 + Math.random() * 4, label: DEFAULT_NODES[i], color: colors[i % colors.length] });
    }

    let mouse = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // detect hover
      let found: NodeItem | null = null;
      for (let n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < HOVER_RADIUS * HOVER_RADIUS) {
          found = n;
          break;
        }
      }

      if (found) {
        setTooltip({ visible: true, x: found.x, y: found.y - found.size - 8, label: found.label, desc: NODE_DESCRIPTIONS[found.label] });
      } else {
        setTooltip((t) => ({ ...t, visible: false }));
      }
    };

    const onLeave = () => {
      mouse.x = -9999; mouse.y = -9999;
      setTooltip((t) => ({ ...t, visible: false }));
    };

    const onClick = () => {
      // click nearest node
      let nearest: { node: NodeItem | null; dist: number } = { node: null, dist: Infinity };
      for (let n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < nearest.dist) {
          nearest = { node: n, dist: d };
        }
      }
      if (nearest.node && nearest.dist < HOVER_RADIUS) {
        const id = nearest.node.label.toLowerCase();
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const step = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // if reduced motion, draw a static subtle connection grid
      if (prefersReduced) {
        ctx.fillStyle = "rgba(0,0,0,0.02)";
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        // draw small nodes
        for (let n of nodes) {
          ctx.beginPath();
          ctx.fillStyle = n.color;
          ctx.globalAlpha = 0.6;
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        return;
      }

      // simple physics: gentle spring towards original positions + slight jitter
      for (let n of nodes) {
        // attraction to mouse when near
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 20000) {
          const f = 100 / (d2 + 200);
          n.vx += dx * 0.0007 * f;
          n.vy += dy * 0.0007 * f;
        }

        // small center spring to keep layout
        const cxForce = (canvas.clientWidth / 2 - n.x) * 0.0002;
        const cyForce = (canvas.clientHeight / 2 - n.y) * 0.0002;
        n.vx += cxForce;
        n.vy += cyForce;

        n.vx *= 0.94;
        n.vy *= 0.94;
        n.x += n.vx;
        n.y += n.vy;

        // draw node
        ctx.beginPath();
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.9;
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw links based on distance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            const alpha = Math.max(0.02, 0.12 - d2 / 20000);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(60,120,180,${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw hover halo
      if (tooltip.visible && tooltip.label) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.arc(tooltip.x, tooltip.y + 8, HOVER_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Tooltip overlay */}
      <div
        className="pointer-events-none absolute z-20"
        style={{ transform: `translate(-50%, -100%)`, left: tooltip.x || 0, top: tooltip.y || 0 }}
      >
        {tooltip.visible && (
          <div className="rounded-md bg-zinc-900/85 px-3 py-2 text-sm text-white shadow-lg max-w-xs">
            <div className="font-medium">{tooltip.label}</div>
            <div className="text-xs text-zinc-200 mt-1">{tooltip.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBackground;
