import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { websiteService } from '../services/websiteService';
import AnimatedBackground from '../components/animations/AnimatedBackground';
import GradientText from '../components/animations/GradientText';

const GeneratingAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
  >
    <div className="text-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-24 h-24 mx-auto mb-8 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-xl" />
        <LoadingSpinner size="lg" />
      </motion.div>
      
      <h3 className="text-2xl font-bold mb-4">
        <GradientText text="Generating Your Website" />
      </h3>
      <p className="text-white/60 mb-4">
        Creating a stunning website based on your description
      </p>
      
      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const WebsiteGenerationPage = () => {
  const navigate = useNavigate();
  const { ideaDescription, selectedDomain, currentIdeaId } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!currentIdeaId) {
      navigate('/idea');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      await websiteService.generateWebsite(ideaDescription);
      navigate('/explore');
    } catch (err) {
      setError('Failed to generate website. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleExplore = () => {
    navigate('/explore');
  };

  return (
    <AnimatedBackground intensity={0.4}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <img 
                src="/assets/logos/ideaforge-logo-premium.png"
                alt="IdeaForge Premium"
                className="w-24 h-24 relative z-10"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <GradientText
              text="What do you want to do?"
              className="text-3xl font-bold"
            />
          </motion.div>

          {/* Options */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Generate Website Option */}
            <motion.div
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 }
              }}
            >
              <Card 
                gradient
                className="transform transition-transform hover:scale-105 cursor-pointer"
                onClick={handleGenerate}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Generate full website and code</span>
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Explore Option */}
            <motion.div
              variants={{
                hidden: { x: 50, opacity: 0 },
                show: { x: 0, opacity: 1 }
              }}
            >
              <Card 
                className="transform transition-transform hover:scale-105 cursor-pointer"
                onClick={handleExplore}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Connect with Idea Enthusiasts</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center mt-4"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        <AnimatePresence>
          {isGenerating && <GeneratingAnimation />}
        </AnimatePresence>
      </div>
    </AnimatedBackground>
  );
};

export default WebsiteGenerationPage;