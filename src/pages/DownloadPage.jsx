import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { documentService } from '../services/documentService';
import AnimatedBackground from '../components/animations/AnimatedBackground';

const DownloadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { documents, currentIdeaId } = useApp();
  const [downloadStatus, setDownloadStatus] = useState({});
  const imageUrls = location.state?.imageUrls || [];

  const handleDocumentDownload = async (type, title) => {
    if (!documents[type]) {
      console.error('Document content not found');
      return;
    }

    setDownloadStatus(prev => ({ ...prev, [type]: true }));

    try {
      const response = await fetch('https://texttopdf-r8d3.onrender.com/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: documents[type],
          filename: title
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
    setDownloadStatus(prev => ({ ...prev, [`image${index}`]: true }));

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Image download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `generated_image_${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Image download failed:', error);
    } finally {
      setDownloadStatus(prev => ({ ...prev, [`image${index}`]: false }));
    }
  };

  const handleRFPDownload = async () => {
    if (!currentIdeaId) {
      console.error('No idea ID available');
      return;
    }

    setDownloadStatus(prev => ({ ...prev, rfp: true }));

    try {
      const blob = await documentService.generateRfp(currentIdeaId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RFP_${currentIdeaId}.pdf`;
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
          {imageUrls.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold mb-6">Generated Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {imageUrls.map((url, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video relative group">
                      <img 
                        src={url} 
                        alt={`Generated design ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          onClick={() => handleImageDownload(url, index)}
                          variant="glass"
                          disabled={downloadStatus[`image${index}`]}
                        >
                          {downloadStatus[`image${index}`] ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            'Download'
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Documentation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Documentation</h2>
            <div className="space-y-4">
              {Object.entries(documents).map(([type, _]) => (
                <Card
                  key={type}
                  className="p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <Button
                      onClick={() => handleDocumentDownload(type, type)}
                      variant="primary"
                      disabled={downloadStatus[type]}
                    >
                      {downloadStatus[type] ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        'Download PDF'
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* RFP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Request for Proposal</h2>
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Download RFP</h3>
                  <p className="text-white/60 mt-1">
                    Get a comprehensive Request for Proposal document
                  </p>
                </div>
                <Button
                  onClick={handleRFPDownload}
                  variant="primary"
                  disabled={downloadStatus.rfp}
                >
                  {downloadStatus.rfp ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Download RFP'
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => navigate('/premium')}
              variant="premium"
              className="px-12 py-4"
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