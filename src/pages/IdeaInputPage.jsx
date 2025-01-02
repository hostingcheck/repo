import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
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
  const { 
    setIdeaDescription, 
    setSelectedDomain, 
    setCurrentIdeaId 
  } = useApp();

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
      // Save to global state
      setIdeaDescription(description);
      setSelectedDomain(domain);

      // Make API call
      const response = await documentService.generateDocuments(description, domain);
      
      // Save the idea ID
      setCurrentIdeaId(response.id);

      // Navigate to documentation page
      navigate('/documentation');
    } catch (err) {
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card gradient className="relative overflow-hidden">
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary"
          />

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-2"
              >
                Describe your{' '}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Product
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className="text-white/60"
              >
                We&apos;ll help you generate comprehensive documentation
              </motion.p>
            </div>

            <Input
              label="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give a detailed description of your product idea..."
              multiline
              rows={6}
              error={error && !description ? 'Description is required' : ''}
              className="bg-white/5 backdrop-blur-lg"
            />

            <Dropdown
              label="Domain"
              value={domain}
              onChange={setDomain}
              options={DOMAINS}
              placeholder="Select your product domain"
              error={error && !domain ? 'Domain is required' : ''}
              className="bg-white/5 backdrop-blur-lg"
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
              className="mt-8"
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
          </form>

          {/* Background Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-xl" />
        </Card>
      </motion.div>
    </div>
  );
};

IdeaInputPage.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.shape({
    description: PropTypes.string,
    domain: PropTypes.string,
  }),
};

export default IdeaInputPage;