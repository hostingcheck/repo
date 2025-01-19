import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Dropdown from '../components/common/Dropdown';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { documentService } from '../services/documentService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { DOMAINS } from '../utils/constants';

const IdeaInputPage = () => {
  const navigate = useNavigate();
  const { setIdeaDescription, setSelectedDomain, setCurrentIdeaId } = useApp();
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !domain) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setIdeaDescription(description);
      setSelectedDomain(domain);

      const response = await documentService.generateDocuments(description, domain);
      setCurrentIdeaId(response.id);
      navigate('/documentation');
    } catch (err) {
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900/40 backdrop-blur-md border border-white/10">
            <form onSubmit={handleSubmit} className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">
                  Describe your{' '}
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Product
                  </span>
                </h1>
                <p className="text-white/60">
                  We'll help you generate comprehensive documentation
                </p>
              </div>

              <div className="space-y-6">
                <Input
                  label="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Give a detailed description of your product idea..."
                  multiline
                  rows={6}
                  error={error && !description ? 'Description is required' : ''}
                />

                <div className="relative">
                  <Dropdown
                    label="Domain"
                    value={domain}
                    onChange={setDomain}
                    options={DOMAINS}
                    placeholder="Select your product domain"
                    error={error && !domain ? 'Domain is required' : ''}
                  />
                </div>

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
                  className="mt-8 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Processing</span>
                    </div>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Background Lines Animation */}
      <div className="fixed inset-0 -z-10">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6A11CB" />
              <stop offset="100%" stopColor="#2575FC" />
            </linearGradient>
          </defs>
          <g stroke="url(#gradient)" strokeWidth="0.5">
            {Array(20).fill().map((_, i) => (
              <path
                key={i}
                d={`M0 ${50 * i} Q500 ${50 * (i + Math.sin(i) * 2)} 1000 ${50 * i}`}
                fill="none"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default IdeaInputPage;