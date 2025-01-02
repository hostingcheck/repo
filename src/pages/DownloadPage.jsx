import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { documentService } from '../services/documentService';
import { imageService } from '../services/imageService';
import AnimatedBackground from '../components/animations/AnimatedBackground';

const DownloadItem = ({ title, description, onClick, isLoading, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="w-full"
  >
    <Card
      className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-white/60">{description}</p>
          )}
        </div>
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-primary"
          >
            {icon || (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  </motion.div>
);

DownloadItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  icon: PropTypes.node
};

const DownloadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { documents, currentIdeaId } = useApp();
  const [downloadStatus, setDownloadStatus] = useState({});
  const imageUrls = location.state?.imageUrls || [];

  const handleDocumentDownload = async (type, title) => {
    setDownloadStatus(prev => ({ ...prev, [type]: true }));

    try {
      const content = documents[type];
      const response = await fetch('https://texttopdf-r8d3.onrender.com/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: content,
          filename: title
        })
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadStatus(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleImageDownload = async (url, index) => {
    const key = `image${index}`;
    setDownloadStatus(prev => ({ ...prev, [key]: true }));

    try {
      await imageService.downloadImage(url, `generated_image_${index + 1}.png`);
    } catch (error) {
      console.error('Image download failed:', error);
    } finally {
      setDownloadStatus(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleRFPDownload = async () => {
    setDownloadStatus(prev => ({ ...prev, rfp: true }));

    try {
      const response = await documentService.generateRfp(currentIdeaId);
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'RFP.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('RFP download failed:', error);
    } finally {
      setDownloadStatus(prev => ({ ...prev, rfp: false }));
    }
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Download</span> Generated Content
            </h1>
            <p className="text-white/60">
              Download your generated content and documentation
            </p>
          </motion.div>

          {/* Generated Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Generated Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imageUrls.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img 
                      src={url} 
                      alt={`Generated design ${index + 1}`}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button
                      onClick={() => handleImageDownload(url, index)}
                      variant="glass"
                      className="absolute bottom-4 left-4 right-4"
                      disabled={downloadStatus[`image${index}`]}
                    >
                      {downloadStatus[`image${index}`] ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        'Download'
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Documentation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Documentation</h2>
            <div className="space-y-4">
              {Object.entries(documents).map(([type, _], index) => (
                <DownloadItem
                  key={type}
                  title={type.replace(/([A-Z])/g, ' $1').trim()}
                  onClick={() => handleDocumentDownload(type, type)}
                  isLoading={downloadStatus[type]}
                />
              ))}
            </div>
          </motion.div>

          {/* RFP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Request for Proposal</h2>
            <DownloadItem
              title="Download RFP"
              description="Get a comprehensive Request for Proposal document"
              onClick={handleRFPDownload}
              isLoading={downloadStatus.rfp}
            />
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => navigate('/premium')}
              variant="premium"
              className="px-12"
            >
              Continue to Premium
            </Button>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default DownloadPage;