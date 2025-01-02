import PropTypes from 'prop-types';

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 4,
  icon,
  error,
  className = ''
}) => {
  const baseStyles = `
    w-full bg-white/10 backdrop-blur-md
    border border-white/20 rounded-2xl
    px-4 py-3 text-white placeholder-white/50
    focus:outline-none focus:ring-2 focus:ring-primary/50
    transition-all duration-300
  `;

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-white/80 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        <InputComponent
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={multiline ? rows : undefined}
          className={`
            ${baseStyles}
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-red-500' : ''}
          `}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  icon: PropTypes.node,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Input;