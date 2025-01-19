import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AnimatedBackground from '../components/animations/AnimatedBackground';
import GradientText from '../components/animations/GradientText';

const LeadGenerationPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading file:', file);
      
      const response = await axios.post('https://dynamicdeploy-ep5m.onrender.com/postExcel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Upload response:', response.data);

      if (response.data === 'File saved successfully') {
        setFileUploaded(true);
        setError('');
        console.log('File upload successful, enabling generate button');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload file. Please try again.');
      setFileUploaded(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateForm = async () => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post('https://dynamicdeploy-ep5m.onrender.com/generate');
      console.log('Generate response:', response.data);

      if (response.data) {
        setShowSuccessMessage(true);
        setError('');
        console.log('Form generation successful');
      }
    } catch (err) {
      console.error('Generate error:', err);
      setError(err.message || 'Failed to generate form. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatedBackground intensity={0.4}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <GradientText
              text="Lead Generation Form"
              className="text-3xl font-bold mb-4"
            />
            <p className="text-white/60">Upload your Excel file to generate a lead form</p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                        selectedFile.type === 'application/vnd.ms-excel') {
                      setFile(selectedFile);
                      setError('');
                    } else {
                      setError('Please select an Excel file (.xlsx or .xls)');
                      setFile(null);
                    }
                  }
                }}
                accept=".xlsx,.xls"
                className="hidden"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="glass"
                disabled={isUploading || fileUploaded}
                className="flex items-center space-x-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                  />
                </svg>
                <span>{file ? file.name : 'Select Excel File'}</span>
              </Button>
              
              {file && (
                <div className="text-sm text-white/60">
                  Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </div>
              )}
            </div>

            {file && !fileUploaded && (
              <Button
                onClick={handleFileUpload}
                fullWidth
                disabled={isUploading}
                variant="primary"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  'Upload File'
                )}
              </Button>
            )}

            {fileUploaded && (
              <Button
                onClick={handleGenerateForm}
                variant="premium"
                fullWidth
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  'Generate Form'
                )}
              </Button>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center"
              >
                {error}
              </motion.p>
            )}

            {showSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <p className="text-green-500 font-semibold mb-2">
                  Your lead generation form is ready!
                </p>
                <a
                  href="https://dynamicdeploy-ep5m.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Click here to view your form
                </a>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </AnimatedBackground>
  );
};

export default LeadGenerationPage;