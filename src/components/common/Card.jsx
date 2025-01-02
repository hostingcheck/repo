import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  gradient = false,
  hoverable = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl overflow-hidden
        ${gradient 
          ? 'bg-gradient-to-br from-primary/20 to-secondary/20' 
          : 'bg-white/10'
        }
        backdrop-blur-md
        border border-white/20
        ${hoverable ? 'transition-transform duration-300 hover:scale-[1.02] cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gradient: PropTypes.bool,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func
};

Card.defaultProps = {
  className: '',
  gradient: false,
  hoverable: false,
  onClick: undefined
};

export default Card;