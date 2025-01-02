import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({});

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ideaDescription, setIdeaDescription] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [currentIdeaId, setCurrentIdeaId] = useState(null); // Added for ID tracking
  const [documents, setDocuments] = useState({
    userRequirements: '',
    technicalAspects: '',
    lifeCycle: ''
  });
  const [isPremium, setIsPremium] = useState(false);

  const value = {
    user,
    setUser,
    ideaDescription,
    setIdeaDescription,
    selectedDomain,
    setSelectedDomain,
    documents,
    setDocuments,
    isPremium,
    setIsPremium,
    currentIdeaId,
    setCurrentIdeaId // This will be used to track the ID across components
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Export a custom hook for background management
export const useBackground = () => {
  // Dynamic background styles
  const backgroundStyle = {
    background: `
      linear-gradient(
        45deg,
        rgba(106, 17, 203, 0.2) 0%,
        rgba(37, 117, 252, 0.2) 100%
      )
    `,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    background: `
      radial-gradient(
        circle at 50% 50%,
        rgba(106, 17, 203, 0.1) 0%,
        rgba(37, 117, 252, 0.1) 100%
      )
    `,
    opacity: 0.8,
    mixBlendMode: 'overlay',
  };

  return { backgroundStyle, overlayStyle };
};