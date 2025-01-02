import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-white/80 font-medium mb-2">
          {label}
        </label>
      )}

      <motion.div
        whileTap={{ scale: 0.98 }}
        className={`
          bg-white/10 backdrop-blur-md
          border border-white/20 rounded-2xl
          cursor-pointer
          transition-all duration-300
          ${isOpen ? 'ring-2 ring-primary/50' : ''}
          ${error ? 'border-red-500' : ''}
        `}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-3 flex items-center justify-between"
        >
          <span className={value ? 'text-white' : 'text-white/50'}>
            {value || placeholder}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 left-0 right-0 mt-2"
            >
              <div className="
                max-h-60 overflow-y-auto
                bg-gray-900/95 backdrop-blur-lg
                border border-white/20 rounded-xl
                shadow-xl
                scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
              ">
                {options.map((option, index) => (
                  <motion.div
                    key={option}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(option)}
                    className={`
                      px-4 py-3 cursor-pointer
                      transition-colors duration-200
                      hover:bg-white/10
                      ${value === option ? 'bg-white/20' : ''}
                      ${index !== options.length - 1 ? 'border-b border-white/10' : ''}
                    `}
                  >
                    {option}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Dropdown;