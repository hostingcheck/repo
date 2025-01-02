import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { imageService } from '../services/imageService';
import AnimatedBackground from '../components/animations/AnimatedBackground';

const GeneratingAnimation = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <LoadingSpinner size="lg" className="mb-6" />
      <h3 className="text-2xl font-bold mb-2 gradient-text">
        Generating Your Designs
      </h3>
      <p className="text-white/60">
        Creating stunning visuals based on your description
      </p>
      
      {/* Animated dots for progress indication */}
      <div className="flex justify-center mt-4 space-x-2">
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
    </motion.div>
  </div>
);

const GenerateImagesPage = () => {
  const navigate = useNavigate();
  const { ideaDescription, selectedDomain, currentIdeaId } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!currentIdeaId) {
      navigate('/idea');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await imageService.generateImages(ideaDescription, selectedDomain);
      navigate('/download', { 
        state: { 
          imageUrls: result.images,
          userId: currentIdeaId
        }
      });
    } catch (err) {
      setError('Failed to generate images. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <AnimatedBackground intensity={0.5}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <Card gradient className="text-center relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
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
            
            <div className="relative z-10 p-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-6"
              >
                {selectedDomain.toLowerCase() === "software technology" 
                  ? (
                    <>
                      Generate <span className="gradient-text">UI Images</span>
                    </>
                  ) : (
                    <>
                      Generate <span className="gradient-text">Relevant Viewables</span>
                    </>
                  )
                }
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 mb-8 leading-relaxed max-w-xl mx-auto"
              >
                We bring you expertly customized and meticulously tailored 
                {selectedDomain.toLowerCase() === "software technology" ? ' UI ' : ' viewable '}
                designs, crafted to perfectly match your unique style and preferences.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/60 mb-12"
              >
                Explore a vast range of design options, each created to deliver 
                a personalized, seamless, and visually stunning experience.
              </motion.p>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 text-red-500"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={handleGenerate}
                  variant="primary"
                  className="px-16 py-6 text-xl"
                  disabled={isLoading}
                >
                  Generate
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <AnimatePresence>
          {isLoading && <GeneratingAnimation />}
        </AnimatePresence>
      </div>
    </AnimatedBackground>
  );
};

GenerateImagesPage.propTypes = {
  onGenerateComplete: PropTypes.func
};

export default GenerateImagesPage;