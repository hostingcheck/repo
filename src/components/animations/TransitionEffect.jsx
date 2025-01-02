import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const TransitionEffect = ({ children, location, mode = "default" }) => {
  const transitions = {
    default: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: 0.3
      }
    },
    slide: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        {...transitions[mode]}
      >
        {children}
      </motion.div>

      {/* Gradient Flash Effect */}
      <motion.div
        key={`gradient-${location}`}
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.15, 0],
          transition: {
            duration: 1.5,
            times: [0, 0.5, 1]
          }
        }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />
      </motion.div>

      {/* Page Change Indicator */}
      <motion.div
        key={`indicator-${location}`}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
        initial={{ scaleX: 0, transformOrigin: "0%" }}
        animate={{
          scaleX: [0, 1, 1, 0],
          transformOrigin: ["0%", "0%", "100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.4, 0.6, 1],
        }}
      />
    </AnimatePresence>
  );
};

TransitionEffect.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['default', 'fade', 'slide', 'scale'])
};

export default TransitionEffect;