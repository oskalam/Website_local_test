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
  trail: { x: number; y: number }[];
}

const DataParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
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

    // Initialize particles
    const particleCount = 15;
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const baseY = Math.random() * canvas.height;
      return {
        x: Math.random() * canvas.width,
        y: baseY,
        baseY,
        speed: 1.0 + Math.random() * 1.5,
        size: 4 + Math.random() * 6,
        opacity: 0.3 + Math.random() * 0.4,
        waveOffset: Math.random() * Math.PI * 2,
        waveAmplitude: 30 + Math.random() * 50,
        waveFrequency: 0.001 + Math.random() * 0.002,
        trail: [],
      };
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Move particle from left to right
        particle.x += particle.speed;

        // Add wave motion for unpredictable path
        particle.y = particle.baseY + 
          Math.sin(particle.x * particle.waveFrequency + particle.waveOffset) * 
          particle.waveAmplitude;

        // Add current position to trail
        particle.trail.push({ x: particle.x, y: particle.y });
        
        // Keep only last 15 positions for trail effect
        if (particle.trail.length > 15) {
          particle.trail.shift();
        }

        // Reset particle when it goes off screen
        if (particle.x > canvas.width + 20) {
          particle.x = -20;
          particle.baseY = Math.random() * canvas.height;
          particle.y = particle.baseY;
          particle.trail = [];
        }

        // Draw trail (tube effect)
        if (particle.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          
          ctx.strokeStyle = `rgba(44, 82, 129, ${particle.opacity * 0.3})`;
          ctx.lineWidth = particle.size * 0.6;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(44, 82, 129, ${particle.opacity})`;
        ctx.fill();

        // Add subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(44, 82, 129, ${particle.opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
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
      style={{ opacity: 0.6 }}
    />
  );
};

export default DataParticlesBackground;
