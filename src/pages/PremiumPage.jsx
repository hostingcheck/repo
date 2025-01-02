import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import GradientText from '../components/animations/GradientText';
import { useApp } from '../context/AppContext';
import { containerVariants, cardVariants } from '../utils/transitions';
import AnimatedBackground from '../components/animations/AnimatedBackground';

const Feature = ({ title, description, icon, index }) => (
  <motion.div
    variants={cardVariants}
    custom={index}
    whileHover={{ scale: 1.05 }}
    className="w-full"
  >
    <Card gradient className="h-full p-6">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </Card>
  </motion.div>
);

const PremiumPage = () => {
  const navigate = useNavigate();
  const { setIsPremium } = useApp();

  const features = [
    {
      title: 'Website Generation',
      description: 'Generate complete, responsive websites from your ideas',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Source Code Access',
      description: 'Get complete source code for all generated websites',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Collaboration Tools',
      description: 'Connect with other idea enthusiasts in your area',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const handlePremiumPurchase = () => {
    setIsPremium(true);
    navigate('/success');
  };

  return (
    <AnimatedBackground intensity={0.4}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <GradientText
              text="Unlock Premium Features"
              className="text-4xl font-bold mb-4"
            />
            <p className="text-white/60 text-lg">
              Enhance your experience with exclusive premium features
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <Feature key={index} {...feature} index={index} />
            ))}
          </motion.div>

          {/* Subscription Card */}
          <motion.div variants={cardVariants}>
            <Card className="text-center p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  <GradientText text="Premium Subscription" />
                </h2>
                
                <div className="mb-8 relative">
                  <p className="text-4xl font-bold">
                    $9.99
                    <span className="text-lg text-white/60">/month</span>
                  </p>
                  <p className="text-white/60 mt-2">Cancel anytime</p>
                </div>

                <Button
                  onClick={handlePremiumPurchase}
                  variant="premium"
                  fullWidth
                  className="mb-4"
                >
                  Get Premium Now
                </Button>

                <button
                  onClick={() => navigate(-1)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Maybe later
                </button>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Background Elements */}
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(106, 17, 203, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(37, 117, 252, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(106, 17, 203, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </AnimatedBackground>
  );
};

export default PremiumPage;