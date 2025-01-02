import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ children, intensity = 0.5 }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create gradient animation
    const animate = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple wave patterns
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(106, 17, 203, ${0.1 * intensity})`;
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = Math.sin(x * 0.01 + time + i) * 50 + canvas.height / 2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      // Create moving gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(106, 17, 203, ${0.2 * intensity})`);
      gradient.addColorStop(1, `rgba(37, 117, 252, ${0.2 * intensity})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ mixBlendMode: 'overlay' }}
      />
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/assets/images/bg2.png")',
          opacity: 0.6 
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

AnimatedBackground.propTypes = {
  children: PropTypes.node.isRequired,
  intensity: PropTypes.number
};

export default AnimatedBackground;