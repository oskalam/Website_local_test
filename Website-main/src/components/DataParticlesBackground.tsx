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
    const particleCount = 25;
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const baseY = Math.random() * canvas.height;
      return {
        x: Math.random() * canvas.width,
        y: baseY,
        baseY,
        speed: 0.3 + Math.random() * 0.7,
        size: 3 + Math.random() * 5,
        opacity: 0.2 + Math.random() * 0.4,
        waveOffset: Math.random() * Math.PI * 2,
        waveAmplitude: 30 + Math.random() * 50,
        waveFrequency: 0.001 + Math.random() * 0.002,
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
