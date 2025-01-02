import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const GradientText = ({ 
  text, 
  className = '', 
  gradient = 'from-orange-500 via-purple-500 to-blue-500',
  animationDuration = 8 
}) => {
  const textVariants = {
    animate: {
      backgroundPosition: ['0% center', '200% center'],
      transition: {
        duration: animationDuration,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.span
      variants={textVariants}
      animate="animate"
      className={`
        bg-clip-text text-transparent
        bg-gradient-to-r ${gradient}
        bg-[length:200%_auto]
        ${className}
      `}
    >
      {text}
    </motion.span>
  );
};

GradientText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  gradient: PropTypes.string,
  animationDuration: PropTypes.number
};

GradientText.defaultProps = {
  className: '',
  gradient: 'from-orange-500 via-purple-500 to-blue-500',
  animationDuration: 8
};

export default GradientText;