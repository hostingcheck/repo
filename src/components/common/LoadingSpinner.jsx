import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md',
  className = '',
  color = 'primary',
  variant = 'default'
}) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    primary: 'from-primary to-secondary',
    white: 'from-white to-white/50',
    premium: 'from-orange-500 to-purple-500'
  };

  if (variant === 'gradient') {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <motion.div
          className={`${sizes[size]} relative`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`
            absolute inset-0 rounded-full 
            bg-gradient-to-r ${colors[color]}
            blur-sm opacity-50
          `} />
          <div className={`
            absolute inset-0 rounded-full 
            bg-gradient-to-r ${colors[color]}
          `} />
        </motion.div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex justify-center items-center space-x-2 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`
              rounded-full bg-gradient-to-r ${colors[color]}
              ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'}
            `}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        className={`${sizes[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className={`
          h-full w-full rounded-full 
          border-4 border-white/20 
          border-t-primary
          ${color === 'white' ? 'border-t-white' : color === 'premium' ? 'border-t-orange-500' : ''}
        `} />
      </motion.div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'white', 'premium']),
  variant: PropTypes.oneOf(['default', 'gradient', 'dots'])
};

export default LoadingSpinner;