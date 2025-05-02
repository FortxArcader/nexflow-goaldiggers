import React, { useRef, useEffect } from 'react';

const ParticleScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!container || !ctx) return;

    container.appendChild(canvas);

    // Resize handler
    const handleResize = () => {
      canvas.width = container.offsetWidth || window.innerWidth;
      canvas.height = container.offsetHeight || window.innerHeight;
    };

    // Call once to set initial size
    handleResize();

    // Use ResizeObserver for more robust resizing
    const resizeObserver = (window as any).ResizeObserver
      ? new ResizeObserver(() => handleResize())
      : null;
    if (resizeObserver) {
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', handleResize);
    }

    // Detect if on a phone (mobile device)
    const isMobile = window.innerWidth <= 600;

    // Create particles with positions and velocities
    const particles: Array<{x: number; y: number; vx: number; vy: number}> = [];
    const NUM_PARTICLES = isMobile ? 25 : 60;
    const DISTANCE_THRESHOLD = 120; // Max distance for drawing connections

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5
      });
    }

    // Animation function
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#6f6682';
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < DISTANCE_THRESHOLD) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(153, 102, 255, ${1 - distance / DISTANCE_THRESHOLD})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        overflow: 'hidden',
        opacity: 0.7,
      }} 
    />
  );
};

export default ParticleScene;