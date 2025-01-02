import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Dropdown from '../components/common/Dropdown';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { geofencingApi } from '../utils/api';
import { DOMAINS } from '../utils/constants';
import AnimatedBackground from '../components/animations/AnimatedBackground';

// Default coordinates for Bangalore
const LATITUDE = '12.9716';
const LONGITUDE = '77.5946';

const IdeaCard = ({ idea, domainImage }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Card gradient className="h-full overflow-hidden">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={domainImage}
            alt={idea.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-white">
            {idea.title}
          </h3>
          
          <p className="text-white/70 line-clamp-3">
            {idea.description}
          </p>

          {/* Requirements */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white/90">Requirements:</h4>
            <div className="flex flex-wrap gap-2">
              {idea.requirements.split(',').map((req, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {req.trim()}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center space-x-2 text-white/70">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{idea.duration}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const NoIdeasFound = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12"
  >
    <svg 
      className="w-16 h-16 mx-auto mb-4 text-white/30"
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 className="text-xl font-semibold text-white mb-2">
      No ideas found
    </h3>
    <p className="text-white/60">
      Try selecting a different domain or check back later
    </p>
  </motion.div>
);

const ExploreIdeasPage = () => {
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdeas();
  }, [selectedDomain]);

  const fetchIdeas = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await geofencingApi.get(
        `/ideas-nearby?latitude=${LATITUDE}&longitude=${LONGITUDE}&domain=${selectedDomain}`
      );
      setIdeas(response.data);
    } catch (err) {
      setError('Failed to fetch ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AnimatedBackground intensity={0.4}>
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              Ideas Near You
            </h1>
            <p className="text-white/60 text-lg">
              Discover innovative ideas in your area
            </p>
          </motion.div>

          {/* Domain Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-12"
          >
            <Dropdown
              value={selectedDomain}
              onChange={setSelectedDomain}
              options={DOMAINS}
              placeholder="Select Domain"
            />
          </motion.div>

          {/* Ideas Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner 
                size="lg" 
                variant="gradient" 
                color="primary" 
              />
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                onClick={fetchIdeas}
                variant="glass"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {ideas.length > 0 ? (
                  ideas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      domainImage={`/assets/images/${selectedDomain.toLowerCase().replace(/\s+/g, '-')}.png`}
                    />
                  ))
                ) : (
                  <NoIdeasFound />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default ExploreIdeasPage;