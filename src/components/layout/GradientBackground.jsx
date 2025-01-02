import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const GradientBackground = ({ children, intensity = 0.5 }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #6A11CB 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #2575FC 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, #6A11CB 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          opacity: intensity
        }}
      />
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm pointer-events-none" />
    </div>
  );
};

GradientBackground.propTypes = {
  children: PropTypes.node.isRequired,
  intensity: PropTypes.number
};

export default GradientBackground;