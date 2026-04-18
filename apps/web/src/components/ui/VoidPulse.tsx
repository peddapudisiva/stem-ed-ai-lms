import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
  id: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

const COLORS = [
  '#0ea5e9', // Deep sky blue
  '#38bdf8', // Light blue
  '#7dd3fc', // Cyan tint
  '#e0f2fe', // Off-white blue
  '#ffffff', // Pure white
];

export function VoidPulse({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  // Track mouse relative to the whole document - works even with overlapping z-layers
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Use window-level mouse tracking so z-order overlays don't block it
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Only track if cursor is over the canvas area
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const spawnParticle = (canvas: HTMLCanvasElement) => {
      // Add padding so particles spawn/die seamlessly off-screen, preventing popping
      const margin = 200;
      const w = canvas.width;
      const h = canvas.height;

      // 40% spawn from edges, 60% spawn anywhere on canvas
      // Spawn completely off-screen or randomly inside logic
      let x: number, y: number;
      if (Math.random() < 0.5) {
        // Spawn from edges (including margin)
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { x = Math.random() * (w + margin * 2) - margin; y = -margin; }
        else if (edge === 1) { x = w + margin; y = Math.random() * (h + margin * 2) - margin; }
        else if (edge === 2) { x = Math.random() * (w + margin * 2) - margin; y = h + margin; }
        else { x = -margin; y = Math.random() * (h + margin * 2) - margin; }
      } else {
        // Spawn inside canvas bounds
        x = Math.random() * w;
        y = Math.random() * h;
      }

      // Slower, strictly linear constant speed for realistic "drift"
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.6;

      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 500 + Math.random() * 500, // Very long life for slow drift
        size: 0.8 + Math.random() * 1.2, // Smaller, uniform "data nodes"
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0,
        id: Math.random() * 1000,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.03 + Math.random() * 0.06, // Slightly faster twinkling
      });
    };

    // Pre-populate with many particles immediately
    for (let i = 0; i < 200; i++) {
      spawnParticle(canvas);
      // Give them head starts at various life stages
      const p = particlesRef.current[particlesRef.current.length - 1];
      const headStart = Math.random() * p.maxLife * 0.5;
      p.life = headStart;
      p.x += p.vx * headStart;
      p.y += p.vy * headStart;
    }

    const drawGrid = (canvas: HTMLCanvasElement) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      const step = 52;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      ctx.restore();
    };

    const drawConnections = () => {
      const ps = particlesRef.current;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) { // Increased distance for a denser mesh
            // Crisp, realistic geometric lines
            const alpha = (1 - dist / 180) * 0.4 * Math.min(ps[i].opacity, ps[j].opacity);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#38bdf8'; // Uniform high-tech line color
            ctx.lineWidth = 0.6; // Thin, precise lines
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    let frame = 0;
    const animate = () => {
      frame++;
      
      // Solid clear for a crisp, scientific look (No motion blur trails)
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Background Light Flares (Aurora Effect)
      ctx.save();
      const flareX = canvas.width * 0.5 + Math.sin(frame * 0.015) * canvas.width * 0.25;
      const flareY = canvas.height * 0.5 + Math.cos(frame * 0.012) * canvas.height * 0.25;
      const grad = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, canvas.width * 0.6);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = grad;
      ctx.globalCompositeOperation = 'screen';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      drawGrid(canvas);

      // Maintain dense particle field
      if (particlesRef.current.length < 380) {
        spawnParticle(canvas);
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mx > 0 && mx < canvas.width && my > 0 && my < canvas.height;

      ctx.save();
      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);
      for (const p of particlesRef.current) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // No screen wrapping! Teleportation causes the connecting lines to stretch across the whole screen.
        // Instead, kill particles when they go way off-screen.
        if (p.x < -200 || p.x > canvas.width + 200 || p.y < -200 || p.y > canvas.height + 200) {
           p.life = p.maxLife; // force despawn
        }

        // No "Flow Field" wobbling - realistic neural networks use straight linear drifting
        // Mouse interaction is the only steering force.

        // Strong mouse repulsion / attraction when cursor is visible
        if (mouseActive) {
          const mdx = mx - p.x;
          const mdy = my - p.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 180 && md > 1) {
            // Attract within 180px
            const force = (180 - md) / 180 * 0.08;
            p.vx += (mdx / md) * force;
            p.vy += (mdy / md) * force;
          }
        }

        // Cap speed strictly
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 1.0) { p.vx = (p.vx / sp) * 1.0; p.vy = (p.vy / sp) * 1.0; }

        // Fade in/out
        const halfLife = p.maxLife / 2;
        p.opacity = p.life < halfLife
          ? Math.min(1, p.life / (halfLife * 0.3))
          : 1 - (p.life - halfLife) / halfLife;

        // Twinkle Logic
        p.twinklePhase += p.twinkleSpeed;
        const twinkleFactor = 0.5 + Math.sin(p.twinklePhase) * 0.5;

        // Draw glowing particle with multi-layer glow
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.globalCompositeOperation = 'lighter';
        
        // Clean, uniform glow (No white core flash)
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        
        // Inner Core
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
      ctx.restore();

      drawConnections();
      animRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
