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

const FLOW_PARTICLES = 18;

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
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

      // position stages in a horizontal layout centered vertically
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const gap = w / (STAGES.length + 1);
      const newStages: Stage[] = STAGES.map((s, i) => ({
        ...s,
        x: gap * (i + 1),
        y: h * 0.5,
        w: Math.max(90, Math.min(160, Math.floor(w / (STAGES.length * 2.4)))),
        h: 44,
      }));
      setStages(newStages);
    };

    resize();
    window.addEventListener("resize", resize);

    // prepare particle flows on each link
    type Flow = { path: [number, number, number, number, number, number, number, number]; t: number; speed: number; size: number; color: string; linkIdx: number };
    const flows: Flow[] = [];

    const initFlows = () => {
      flows.length = 0;
      if (stages.length === 0) return;
      for (let i = 0; i < stages.length - 1; i++) {
        const a = stages[i];
        const b = stages[i + 1];
        // control points for a gentle curve
        const cx1 = a.x + (b.x - a.x) * 0.35;
        const cy1 = a.y - 40;
        const cx2 = a.x + (b.x - a.x) * 0.65;
        const cy2 = b.y + 40;
        for (let p = 0; p < Math.ceil(FLOW_PARTICLES / (stages.length - 1)); p++) {
          flows.push({
            path: [a.x, a.y, cx1, cy1, cx2, cy2, b.x, b.y],
            t: Math.random(),
            speed: 0.0006 + Math.random() * 0.0011,
            size: 2 + Math.random() * 1.6,
            color: a.color,
            linkIdx: i,
          });
        }
      }
    };

    // we need to init after stages are set; watch stages
    initFlows();

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
    };

    const onLeave = () => {
      mouse.x = -9999; mouse.y = -9999;
      setTooltip((t) => ({ ...t, visible: false }));
    };

    const onClick = () => {
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

    const step = (time = 0) => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // background subtle overlay
      ctx.fillStyle = "rgba(255,255,255,0.01)";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // draw links (curved pipelines)
      for (let i = 0; i < stages.length - 1; i++) {
        const a = stages[i];
        const b = stages[i + 1];
        const cx1 = a.x + (b.x - a.x) * 0.33;
        const cy1 = a.y - 40;
        const cx2 = a.x + (b.x - a.x) * 0.66;
        const cy2 = b.y + 40;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, b.x, b.y);
        ctx.lineWidth = 2.6;
        ctx.strokeStyle = "rgba(60,120,180,0.12)";
        ctx.stroke();

        // add a brighter inner line for depth
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, b.x, b.y);
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = "rgba(60,130,200,0.14)";
        ctx.stroke();
      }

      // draw flowing particles
      if (!prefersReduced) {
        for (let f of flows) {
          f.t += f.speed * (1 + Math.sin(time * 0.001 + f.linkIdx));
          if (f.t > 1) f.t = 0;
          const [x0, y0, x1, y1, x2, y2, x3, y3] = f.path;
          const x = cubicAt(x0, x1, x2, x3, f.t);
          const y = cubicAt(y0, y1, y2, y3, f.t);
          ctx.beginPath();
          ctx.fillStyle = f.color;
          ctx.globalAlpha = 0.95;
          ctx.arc(x, y, f.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // draw stage boxes
      for (let s of stages) {
        // shadow
        ctx.beginPath();
        ctx.fillStyle = "rgba(10,20,30,0.06)";
        roundRect(ctx, s.x - s.w / 2 + 2, s.y - s.h / 2 + 6, s.w, s.h, 10);
        ctx.fill();

        // box
        ctx.beginPath();
        ctx.fillStyle = s.color;
        roundRect(ctx, s.x - s.w / 2, s.y - s.h / 2, s.w, s.h, 10);
        ctx.fill();

        // label
        ctx.fillStyle = "white";
        ctx.font = "500 14px Inter, ui-sans-serif, system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, s.x, s.y);
      }

      // hover halo
      if (tooltip.visible && tooltip.label) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,0.04)";
        ctx.arc(tooltip.x, tooltip.y + 10, 52, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    // helper: draw rounded rect path
    function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      const min = Math.min(w, h) / 2;
      if (r > min) r = min;
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
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

  // Tooltip overlay
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
