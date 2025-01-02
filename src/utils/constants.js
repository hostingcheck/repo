export const DOMAINS = [
    "Software Technology",
    "Healthcare and Biotech",
    "Renewable Energy",
    "Financial Services",
    "Advanced Manufacturing",
    "Artificial Intelligence and Robotics"
  ];
  
  export const LOCATION = {
    BANGALORE: {
      latitude: '12.9716',
      longitude: '77.5946'
    }
  };
  
  export const DOCUMENT_TYPES = {
    USER_REQUIREMENTS: 'userRequirements',
    TECHNICAL_ASPECTS: 'technicalAspects',
    LIFE_CYCLE: 'lifeCycle'
  };
  
  export const ANIMATION_VARIANTS = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    scale: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      exit: { scale: 0 }
    }
  };
  
  export const GRADIENT_COLORS = {
    primary: {
      from: '#6A11CB',
      to: '#2575FC'
    },
    premium: {
      from: '#FF512F',
      to: '#DD2476'
    }
  };