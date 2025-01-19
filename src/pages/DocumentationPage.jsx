import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Toggle from '../components/common/Toggle';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useApp } from '../context/AppContext';
import useDocuments from '../hooks/useDocuments';

const DocumentViewer = ({ content, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl max-h-[80vh] bg-gray-900/90 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Document Viewer</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
            <div className="prose prose-invert max-w-none">
              {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const DocumentationPage = () => {
  const navigate = useNavigate();
  const { currentIdeaId, documents } = useApp();
  const { isLoading: isDocLoading, fetchDocuments, reviseDocument } = useDocuments();
  
  const [selectedDocs, setSelectedDocs] = useState({
    requirements: false,
    technical: false,
    lifecycle: false
  });
  const [revisionText, setRevisionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewerContent, setViewerContent] = useState('');
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDocuments = async () => {
      if (!currentIdeaId) {
        navigate('/idea');
        return;
      }

      try {
        await fetchDocuments();
      } catch (err) {
        setError('Failed to load documents. Please try again.');
      }
    };

    loadDocuments();
  }, [currentIdeaId, fetchDocuments, navigate]);

  const handleRevision = async () => {
    if (!revisionText || !Object.values(selectedDocs).some(Boolean)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const revisionPromises = Object.entries(selectedDocs)
        .filter(([_, isSelected]) => isSelected)
        .map(([docType]) => reviseDocument(docType, revisionText));

      await Promise.all(revisionPromises);
      setRevisionText('');
      setSelectedDocs({
        requirements: false,
        technical: false,
        lifecycle: false
      });
    } catch (err) {
      setError('Failed to revise documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openDocument = (content) => {
    setViewerContent(content);
    setIsViewerOpen(true);
  };

  if (isDocLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-white/60">
            Review and revise your generated documentation
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center text-red-500"
          >
            {error}
          </motion.div>
        )}

        {/* Document Cards */}
        <div className="grid gap-6">
          {Object.entries(documents).map(([type, content], index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                hoverable
                className="overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
                onClick={() => openDocument(content)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-white/60 line-clamp-3">{content}</p>
                  <Button
                    variant="glass"
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDocument(content);
                    }}
                  >
                    View Full Content
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Revision Section */}
        <Card className="mt-8">
          <div className="p-6 space-y-6">
            <h3 className="text-xl font-semibold">Need changes?</h3>
            <div className="space-y-4">
              {Object.entries(selectedDocs).map(([type, isSelected]) => (
                <Toggle
                  key={type}
                  label={`Revise ${type.replace(/([A-Z])/g, ' $1').trim()}`}
                  enabled={isSelected}
                  onChange={(value) => setSelectedDocs(prev => ({
                    ...prev,
                    [type]: value
                  }))}
                />
              ))}
              
              <Input
                value={revisionText}
                onChange={(e) => setRevisionText(e.target.value)}
                placeholder="Describe your desired changes..."
                multiline
                rows={3}
              />
              
              <Button
                onClick={handleRevision}
                fullWidth
                disabled={isLoading || !revisionText || !Object.values(selectedDocs).some(Boolean)}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  'Regenerate'
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate('/generate-images')}
            variant="premium"
            className="px-12 py-4"
          >
            Continue
          </Button>
        </motion.div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewer
        content={viewerContent}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />

      {/* Background Effects */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50" />
      </motion.div>
    </div>
  );
};

export default DocumentationPage;