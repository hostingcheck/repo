import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { cardVariants, containerVariants } from '../utils/transitions';
import AnimatedBackground from '../components/animations/AnimatedBackground';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ name: username });
      navigate('/idea');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedBackground intensity={0.4}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <img
                src="/assets/logos/ideaforge-logo.png"
                alt="IdeaForge"
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

          {/* Login Form */}
          <motion.div variants={cardVariants}>
            <Card gradient className="relative overflow-hidden">
              {/* Decorative Corner Gradients */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl transform translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-xl transform -translate-x-16 translate-y-16" />

              <form onSubmit={handleLogin} className="relative z-10 p-8 space-y-6">
                <div className="text-center mb-8">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent"
                  >
                    Welcome back
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    className="text-white/60"
                  >
                    Enter your credentials to continue
                  </motion.p>
                </div>

                <motion.div variants={containerVariants} className="space-y-4">
                  <Input
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                  />

                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="primary"
                    className="mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <LoadingSpinner size="sm" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => navigate('/idea')}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Continue as Guest
                    </button>
                  </div>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default LoginPage;