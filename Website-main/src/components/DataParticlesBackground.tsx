import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  size: number;
  opacity: number;
  waveOffset: number;
  waveAmplitude: number;
  waveFrequency: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

const DataParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Determine particle count and speed based on screen size
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 20;
    const minSpeed = isMobile ? 0.8 : 1.2;
    const maxSpeed = isMobile ? 1.3 : 2.0;

    particlesRef.current = Array.from({ length: particleCount }, () => {
      const baseY = Math.random() * canvas.height;
      return {
        x: Math.random() * canvas.width,
        y: baseY,
        baseY,
        speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
        size: 3 + Math.random() * 4,
        opacity: 0.12 + Math.random() * 0.16,
        waveOffset: Math.random() * Math.PI * 2,
        waveAmplitude: 30 + Math.random() * 50,
        waveFrequency: 0.001 + Math.random() * 0.002,
      };
    });

    const createSparkles = (x: number, y: number) => {
      const count = 10;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 0.9;
        sparklesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2,
          opacity: 0.5 + Math.random() * 0.3,
          life: 24 + Math.random() * 12,
        });
      }
    };

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let closest: Particle | null = null;
      let closestDist = Infinity;

      for (const particle of particlesRef.current) {
        const dx = particle.x - x;
        const dy = particle.y - y;
        const dist = Math.hypot(dx, dy);
        if (dist < closestDist) {
          closestDist = dist;
          closest = particle;
        }
      }

      if (closest && closestDist <= closest.size + 10) {
        createSparkles(closest.x, closest.y);
      }
    };

    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Move particle from left to right
        particle.x += particle.speed;

        // Add wave motion for unpredictable path
        particle.y = particle.baseY + 
          Math.sin(particle.x * particle.waveFrequency + particle.waveOffset) * 
          particle.waveAmplitude;

        // Reset particle when it goes off screen
        if (particle.x > canvas.width + 20) {
          particle.x = -20;
          particle.baseY = Math.random() * canvas.height;
          particle.y = particle.baseY;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(44, 82, 129, ${particle.opacity})`;
        ctx.fill();

        // Add subtle glow
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(44, 82, 129, ${particle.opacity * 0.4})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw sparkle bursts
      if (sparklesRef.current.length > 0) {
        sparklesRef.current = sparklesRef.current.filter((sparkle) => {
          sparkle.x += sparkle.vx;
          sparkle.y += sparkle.vy;
          sparkle.life -= 1;
          sparkle.opacity *= 0.96;

          ctx.beginPath();
          ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(44, 82, 129, ${sparkle.opacity})`;
          ctx.fill();

          return sparkle.life > 0 && sparkle.opacity > 0.02;
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
};

export default DataParticlesBackground;
