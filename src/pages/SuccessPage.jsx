import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import GradientText from '../components/animations/GradientText';
import AnimatedBackground from '../components/animations/AnimatedBackground';
import { loadingVariants } from '../utils/transitions';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <AnimatedBackground intensity={0.3}>
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-2xl relative z-10"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="mb-12 relative"
          >
            <img 
              src="/assets/logos/ideaforge-logo-premium.png" 
              alt="IdeaForge Premium" 
              className="w-32 h-32 mx-auto relative z-10"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-xl"
              variants={loadingVariants}
              animate="start"
            />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <GradientText
              text="Congratulations!"
              className="text-4xl font-bold mb-4"
            />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-semibold text-teal-400 mb-8"
            >
              Welcome to IdeaForge Premium
            </motion.h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 text-lg mb-12 leading-relaxed"
          >
            You can now generate your product website, and we will provide 
            the code files for the website with them! Feel free to collaborate 
            with other people.
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={() => navigate('/website-generation')}
              variant="premium"
              className="px-12 py-4 text-lg"
            >
              <span className="mr-2">Get Started</span>
              <motion.svg
                className="w-6 h-6 inline-block"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </Button>
          </motion.div>

          {/* Animated Background Elements */}
          <motion.div
            className="fixed inset-0 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(106, 17, 203, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(37, 117, 252, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(106, 17, 203, 0.2) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Success Effect */}
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 0] }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-primary/20 via-teal-500/20 to-secondary/20 blur-3xl" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default SuccessPage;