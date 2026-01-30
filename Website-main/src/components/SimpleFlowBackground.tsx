import React, { useEffect, useRef, useState } from "react";

const STAGES = [
  { id: "process", label: "Process", color: "#2563eb" },
  { id: "data", label: "Data", color: "#0ea5a4" },
  { id: "model", label: "Model", color: "#7c3aed" },
  { id: "business", label: "Business", color: "#ef4444" },
];

const PARTICLES_PER_LINK = 6;
const RESPAWN_MS = 1100;

const SimpleFlowBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const flowsRef = useRef<any[]>([]);
  const rafRef = useRef<number | null>(null);

  const [debug, setDebug] = useState({ flows: 0, particles: 0, running: false });

  useEffect(() => {
    console.debug("SimpleFlowBackground: init");
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // show static layout (no animation)

    const container = containerRef.current!;

    const calcLayout = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const gap = w / (STAGES.length + 1);
      const y = h * 0.52;
      const stages = STAGES.map((s, i) => ({
        ...s,
        x: gap * (i + 1),
        y,
        w: Math.max(80, Math.min(160, Math.floor(w / (STAGES.length * 2.6)))),
        h: 44,
      }));

      // build flows for each link
      flowsRef.current = [];
      for (let i = 0; i < stages.length - 1; i++) {
        const a = stages[i];
        const b = stages[i + 1];
        const startX = a.x + a.w / 2;
        const endX = b.x - b.w / 2;
        const len = Math.max(1, endX - startX);
        for (let p = 0; p < PARTICLES_PER_LINK; p++) {
          flowsRef.current.push({
            id: `${i}-${p}-${Math.random().toString(36).slice(2, 8)}`,
            link: i,
            size: 4 + Math.random() * 2,
            color: a.color,
            t: (p / PARTICLES_PER_LINK) * 0.9 + Math.random() * 0.1,
            speed: 0.0004 + Math.random() * 0.001,
            startX,
            endX,
            y: a.y + (Math.random() - 0.5) * 12,
            len,
            popped: false,
          });
        }
      }

      // create particle elements if missing
      // reuse elements if available
      while (particlesRef.current.length < flowsRef.current.length) {
        const el = document.createElement("div");
        el.className = "absolute rounded-full pointer-events-auto";
        el.style.willChange = "transform, opacity";
        container.appendChild(el);
        particlesRef.current.push(el);
      }

      // hide extra
      for (let i = flowsRef.current.length; i < particlesRef.current.length; i++) {
        const el = particlesRef.current[i];
        el.style.display = "none";
      }

      // initial style
      for (let i = 0; i < flowsRef.current.length; i++) {
        const f = flowsRef.current[i];
        const el = particlesRef.current[i];
        el.style.display = f.popped ? "none" : "block";
        el.style.width = `${f.size * 2}px`;
        el.style.height = `${f.size * 2}px`;
        el.style.background = f.color;
        el.style.left = `${f.startX - f.size}px`;
        el.style.top = `${f.y - f.size}px`;
        el.style.opacity = "1";
        el.style.transform = `translateX(0px)`;

        // click to pop
        el.onclick = () => {
          if (f.popped) return;
          f.popped = true;
          el.style.transition = "transform 260ms ease-out, opacity 260ms ease-out";
          el.style.opacity = "0";
          el.style.transform = "scale(1.6)";
          setTimeout(() => {
            el.style.display = "none";
            // respawn later
            setTimeout(() => {
              f.popped = false;
              f.t = 0;
              el.style.display = "block";
              el.style.opacity = "1";
              el.style.transform = "scale(1)";
            }, RESPAWN_MS + Math.random() * 800);
          }, 260);
        };
      }
    };

    calcLayout();
    window.addEventListener("resize", calcLayout);

    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      for (let i = 0; i < flowsRef.current.length; i++) {
        const f = flowsRef.current[i];
        const el = particlesRef.current[i];
        if (!el) continue;
        if (f.popped) continue;
        f.t += f.speed * dt;
        if (f.t > 1) f.t = 0;
        const x = f.startX + f.len * f.t;
        el.style.transform = `translateX(${x - f.startX}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    // debug updater (only in dev)
    const timer = setInterval(() => {
      setDebug({ flows: flowsRef.current.length, particles: particlesRef.current.length, running: !!rafRef.current });
    }, 500);

    console.debug("SimpleFlowBackground: started", flowsRef.current.length, "flows");

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(timer);
      window.removeEventListener("resize", calcLayout);
      // remove created elements
      for (let el of particlesRef.current) {
        if (el.parentNode === container) container.removeChild(el);
      }
      particlesRef.current = [];
      flowsRef.current = [];
    };
  }, []);

  // static pipelines using SVG for reduced-motion users or as base
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <filter id="soft2" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0b1220" floodOpacity="0.04" />
          </filter>
        </defs>
        {STAGES.slice(0, STAGES.length - 1).map((s, i) => {
          const x0 = 1200 / (STAGES.length + 1) * (i + 1) + 20;
          const x1 = 1200 / (STAGES.length + 1) * (i + 2) - 20;
          const y = 150;
          const cx1 = x0 + (x1 - x0) * 0.33;
          const cy1 = y - 28;
          const cx2 = x0 + (x1 - x0) * 0.66;
          const cy2 = y + 28;
          const d = `M ${x0} ${y} C ${cx1} ${cy1} ${cx2} ${cy2} ${x1} ${y}`;
          return (
            <g key={i} aria-hidden>
              <path d={d} fill="none" stroke="rgba(60,120,180,0.08)" strokeWidth="3" strokeLinecap="round" />
              <path d={d} fill="none" stroke="rgba(60,130,200,0.09)" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          );
        })}

        {/* stage boxes */}
        {STAGES.map((s, i) => {
          const x = 1200 / (STAGES.length + 1) * (i + 1);
          const y = 150;
          const w = 110;
          const h = 44;
          return (
            <g key={s.id} transform={`translate(${x - w / 2}, ${y - h / 2})`} aria-hidden>
              <rect rx={10} width={w} height={h} fill={s.color} filter="url(#soft2)" />
              <text x={w / 2} y={h / 2} alignmentBaseline="middle" textAnchor="middle" fontFamily="Inter, ui-sans-serif, system-ui" fontWeight={600} fontSize={14} fill="#fff">{s.label}</text>
            </g>
          );
        })}
      </svg>

      {/* debug badge (dev only) */}
      {import.meta.env.DEV && (
        <div className="pointer-events-none absolute top-4 right-4 z-30">
          <div className="bg-black/65 text-white text-xs rounded-md px-3 py-2 backdrop-blur-sm">
            <div>flows: {debug.flows} • particles: {debug.particles}</div>
            <div>running: {debug.running ? "yes" : "no"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleFlowBackground;
