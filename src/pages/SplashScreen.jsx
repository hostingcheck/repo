import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/animations/AnimatedBackground';
import { textRevealVariants, loadingVariants } from '../utils/transitions';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);
  const fullText = '> Hello I am IdeaForge';

  useEffect(() => {
    if (isTyping) {
      if (currentText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 1) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setShowSecondText(true);
      }
    }
  }, [currentText, isTyping]);

  useEffect(() => {
    if (showSecondText) {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showSecondText, navigate]);

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5
      }
    }
  };

  return (
    <AnimatedBackground intensity={0.3}>
      <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated Logo */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <div className="relative">
            <img 
              src="/assets/logos/ideaforge-logo.png" 
              alt="IdeaForge" 
              className="w-32 h-32 relative z-10"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl"
              variants={loadingVariants}
              animate="start"
            />
          </div>
        </motion.div>

        {/* Typing Text Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-20 flex items-center justify-center relative"
        >
          <AnimatePresence mode="wait">
            {!showSecondText ? (
              <motion.div
                key="typing"
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="font-mono text-3xl text-white relative"
              >
                {currentText}
                <motion.span
                  className="inline-block w-[2px] h-6 bg-white ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.h1
                  className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Turn your ideas into reality
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
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

        {/* Additional Background Elements */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            initial={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 2,
            }}
          />
        ))}
      </div>
    </AnimatedBackground>
  );
};

export default SplashScreen;