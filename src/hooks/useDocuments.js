import { useState, useCallback } from 'react';
import { documentService } from '../services/documentService';
import { useApp } from '../context/AppContext';

const useDocuments = () => {
  const { currentIdeaId, setDocuments } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    if (!currentIdeaId) {
      throw new Error('No idea ID found');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all three documents simultaneously
      const [reqResponse, techResponse, lifecycleResponse] = await Promise.all([
        documentService.fetchDocument('requirements', currentIdeaId),
        documentService.fetchDocument('technical', currentIdeaId),
        documentService.fetchDocument('lifecycle', currentIdeaId)
      ]);

      const newDocuments = {
        userRequirements: reqResponse.document || '',
        technicalAspects: techResponse.document || '',
        lifeCycle: lifecycleResponse.document || ''
      };

      setDocuments(newDocuments);
      return newDocuments;
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch documents';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentIdeaId, setDocuments]);

  const reviseDocument = useCallback(async (type, revisionPrompt) => {
    if (!currentIdeaId) {
      throw new Error('No idea ID found');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await documentService.reviseDocument(type, currentIdeaId, revisionPrompt);
      
      setDocuments(prev => ({
        ...prev,
        [type]: response.document
      }));

      return response.document;
    } catch (err) {
      const errorMessage = err.message || 'Failed to revise document';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentIdeaId, setDocuments]);

  return {
    isLoading,
    error,
    fetchDocuments,
    reviseDocument
  };
};

export default useDocuments;