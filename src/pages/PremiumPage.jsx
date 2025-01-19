import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import GradientText from '../components/animations/GradientText';
import AnimatedBackground from '../components/animations/AnimatedBackground';

const PremiumPage = () => {
  const navigate = useNavigate();

  return (
    <AnimatedBackground intensity={0.4}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <GradientText
              text="Choose Your Next Step"
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
            {/* Website Generation Option */}
            <motion.div
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 }
              }}
            >
              <Card 
                gradient
                className="transform transition-transform hover:scale-105 cursor-pointer"
                onClick={() => navigate('/website-generation')}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Generate Website</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Lead Generation Form Option */}
            <motion.div
              variants={{
                hidden: { x: 50, opacity: 0 },
                show: { x: 0, opacity: 1 }
              }}
            >
              <Card 
                gradient
                className="transform transition-transform hover:scale-105 cursor-pointer"
                onClick={() => navigate('/lead-generation')}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Lead Generation Form</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default PremiumPage;