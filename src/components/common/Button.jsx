import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  fullWidth = false,
  icon,
  className = '',
  disabled = false
}) => {
  const baseStyles = 'flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:from-primary/90 hover:to-secondary/90',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
    premium: 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg hover:from-orange-600 hover:to-purple-600'
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'glass', 'premium']),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  onClick: () => {},
  variant: 'primary',
  fullWidth: false,
  icon: null,
  className: '',
  disabled: false
};

export default Button;