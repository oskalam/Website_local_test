import React, { useEffect, useRef, useState } from "react";

type Stage = {
  id: string;
  label: string;
  desc: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const STAGES: Omit<Stage, "x" | "y" | "w" | "h">[] = [
  { id: "process", label: "Process", desc: "Business processes & optimization", color: "#2563eb" },
  { id: "data", label: "Data", desc: "Data engineering, analytics & pipelines", color: "#0ea5a4" },
  { id: "model", label: "Model", desc: "ML models, evaluation & deployment", color: "#7c3aed" },
  { id: "business", label: "Business", desc: "Value & deployment into business outcomes", color: "#ef4444" },
];

const FLOW_PARTICLES = 22;
const POP_RESPAWN_MS = 1200;

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const flowsRef = useRef<any[]>([]);
  const popsRef = useRef<any[]>([]);
  const stagesRef = useRef<Stage[] | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; label?: string; desc?: string }>({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = window.devicePixelRatio || 1;

    const stagesEqual = (a: Stage[] | null, b: Stage[]) => {
      if (!a) return false;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        const aa = a[i];
        const bb = b[i];
        if (aa.id !== bb.id) return false;
        if (Math.abs(aa.x - bb.x) > 1) return false;
        if (Math.abs(aa.y - bb.y) > 1) return false;
        if (Math.abs(aa.w - bb.w) > 1) return false;
        if (Math.abs(aa.h - bb.h) > 1) return false;
      }
      return true;
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // position stages in a horizontal layout centered vertically
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const gap = w / (STAGES.length + 1);
      const newStages: Stage[] = STAGES.map((s, i) => ({
        ...s,
        x: gap * (i + 1),
        y: h * 0.52,
        w: Math.max(80, Math.min(160, Math.floor(w / (STAGES.length * 2.6)))),
        h: 44,
      }));

      // only update when positions actually change to avoid constant re-renders
      if (!stagesEqual(stagesRef.current, newStages)) {
        stagesRef.current = newStages;
        setStages(newStages);
        initFlows(newStages);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    type Flow = { path: [number, number, number, number, number, number, number, number]; t: number; speed: number; size: number; color: string; linkIdx: number; popped?: boolean; deadAt?: number };

    const initFlows = (localStages: Stage[]) => {
      flowsRef.current = [];
      if (localStages.length === 0) return;
      for (let i = 0; i < localStages.length - 1; i++) {
        const a = localStages[i];
        const b = localStages[i + 1];
        const cx1 = a.x + (b.x - a.x) * 0.36;
        const cy1 = a.y - 34;
        const cx2 = a.x + (b.x - a.x) * 0.64;
        const cy2 = b.y + 34;
        const count = Math.ceil(FLOW_PARTICLES / (localStages.length - 1));
        for (let p = 0; p < count; p++) {
          flowsRef.current.push({
            path: [a.x, a.y, cx1, cy1, cx2, cy2, b.x, b.y] as any,
            t: (p / count) * 0.9 + Math.random() * 0.1,
            speed: 0.00035 + Math.random() * 0.0007,
            size: 2 + Math.random() * 1.8,
            color: a.color,
            linkIdx: i,
            popped: false,
          });
        }
      }
    };

    initFlows(stages);

    let mouse = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // detect hover over a stage rectangle
      let found: Stage | null = null;
      for (let s of stages) {
        if (mouse.x >= s.x - s.w / 2 && mouse.x <= s.x + s.w / 2 && mouse.y >= s.y - s.h / 2 && mouse.y <= s.y + s.h / 2) {
          found = s;
          break;
        }
      }

      if (found) setTooltip({ visible: true, x: found.x, y: found.y - found.h / 2 - 10, label: found.label, desc: found.desc });
      else setTooltip((t) => ({ ...t, visible: false }));

      // pointer for particles
      let overParticle = false;
      for (let f of flowsRef.current) {
        if (f.popped) continue;
        const pos = pointOnCubic(f.path, f.t);
        const dx = pos.x - mouse.x;
        const dy = pos.y - mouse.y;
        if (dx * dx + dy * dy < 12 * 12) {
          overParticle = true;
          break;
        }
      }
      canvas.style.cursor = overParticle || found ? "pointer" : "default";
    };

    const onLeave = () => {
      mouse.x = -9999; mouse.y = -9999;
      setTooltip((t) => ({ ...t, visible: false }));
      canvas.style.cursor = "default";
    };

    const onClick = () => {
      // pop nearest particle within threshold
      let nearest: { idx: number; dist: number; x: number; y: number } | null = null;
      for (let i = 0; i < flowsRef.current.length; i++) {
        const f = flowsRef.current[i];
        if (f.popped) continue;
        const pos = pointOnCubic(f.path, f.t);
        const dx = pos.x - mouse.x;
        const dy = pos.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16 * 16 && (nearest === null || d2 < nearest.dist)) {
          nearest = { idx: i, dist: d2, x: pos.x, y: pos.y };
        }
      }
      if (nearest) {
        // mark popped and add pop visual
        const f = flowsRef.current[nearest.idx];
        f.popped = true;
        f.deadAt = performance.now();
        popsRef.current.push({ x: nearest.x, y: nearest.y, start: performance.now(), r: 6 });
      }

      // also handle stage clicks
      for (let s of stages) {
        if (mouse.x >= s.x - s.w / 2 && mouse.x <= s.x + s.w / 2 && mouse.y >= s.y - s.h / 2 && mouse.y <= s.y + s.h / 2) {
          const target = document.getElementById(s.id);
          if (target) target.scrollIntoView({ behavior: "smooth" });
          break;
        }
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const cubicAt = (p0: number, p1: number, p2: number, p3: number, t: number) => ((1 - t) ** 3) * p0 + 3 * ((1 - t) ** 2) * t * p1 + 3 * (1 - t) * (t ** 2) * p2 + (t ** 3) * p3;
    const pointOnCubic = (path: number[], t: number) => ({ x: cubicAt(path[0], path[2], path[4], path[6], t), y: cubicAt(path[1], path[3], path[5], path[7], t) });

    const step = (time = 0) => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // subtle background
      ctx.fillStyle = "rgba(255,255,255,0.01)";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // draw pipelines
      for (let i = 0; i < stages.length - 1; i++) {
        const a = stages[i];
        const b = stages[i + 1];
        const cx1 = a.x + (b.x - a.x) * 0.33;
        const cy1 = a.y - 34;
        const cx2 = a.x + (b.x - a.x) * 0.66;
        const cy2 = b.y + 34;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, b.x, b.y);
        ctx.lineWidth = 2.6;
        ctx.strokeStyle = "rgba(60,120,180,0.12)";
        ctx.stroke();
      }

      // flow particles
      if (!prefersReduced) {
        const now = performance.now();
        for (let i = 0; i < flowsRef.current.length; i++) {
          const f = flowsRef.current[i];

          // respawn popped flows after delay
          if (f.popped) {
            if (now - (f.deadAt || 0) > POP_RESPAWN_MS) {
              f.popped = false;
              f.t = 0;
              f.speed = 0.00035 + Math.random() * 0.0008;
            } else continue;
          }

          f.t += f.speed * (1 + Math.sin(time * 0.001 + f.linkIdx));
          if (f.t > 1) f.t = 0;

          const pos = pointOnCubic(f.path, f.t);
          ctx.beginPath();
          ctx.fillStyle = f.color;
          ctx.globalAlpha = 0.98;
          ctx.arc(pos.x, pos.y, f.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // pop visuals
        for (let i = popsRef.current.length - 1; i >= 0; i--) {
          const p = popsRef.current[i];
          const age = now - p.start;
          if (age > 520) { popsRef.current.splice(i, 1); continue; }
          const prog = age / 520;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${1 - prog})`;
          ctx.lineWidth = 1.2;
          ctx.arc(p.x, p.y, p.r + prog * 18, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      }

      // draw stage boxes on top
      for (let s of stages) {
        ctx.beginPath(); ctx.fillStyle = "rgba(10,20,30,0.06)"; roundRect(ctx, s.x - s.w / 2 + 2, s.y - s.h / 2 + 6, s.w, s.h, 10); ctx.fill();
        ctx.beginPath(); ctx.fillStyle = s.color; roundRect(ctx, s.x - s.w / 2, s.y - s.h / 2, s.w, s.h, 10); ctx.fill();
        ctx.fillStyle = "white"; ctx.font = "500 14px Inter, ui-sans-serif, system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(s.label, s.x, s.y);
      }

      // hover halo
      if (tooltip.visible && tooltip.label) {
        ctx.beginPath(); ctx.fillStyle = "rgba(0,0,0,0.04)"; ctx.arc(tooltip.x, tooltip.y + 10, 52, 0, Math.PI * 2); ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      const min = Math.min(w, h) / 2; if (r > min) r = min;
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [stages]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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
