import PropTypes from 'prop-types';

const Toggle = ({ enabled, onChange, label }) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 
          cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out 
          ${enabled ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-white/20'}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full 
            bg-white shadow transition duration-200 ease-in-out
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <span className="ml-3 text-white/80">{label}</span>
      )}
    </div>
  );
};

Toggle.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default Toggle;