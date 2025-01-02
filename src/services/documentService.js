import { productVisionApi, ENDPOINTS } from '../utils/api';

export const documentService = {
  generateDocuments: async (idea, domain) => {
    const response = await productVisionApi.post(ENDPOINTS.userInput, {
      idea,
      domain
    });
    return response.data;
  },

  fetchDocument: async (type, userId) => {
    const response = await productVisionApi.get(
      `${ENDPOINTS.generateDocument}/${type}/${userId}`
    );
    return response.data;
  },

  reviseDocument: async (type, userId, revisionPrompt) => {
    const response = await productVisionApi.post(
      `${ENDPOINTS.reviseDocument}/${type}/${userId}`,
      { revisionPrompt }
    );
    return response.data;
  },

  // Enhanced RFP generation and download
  generateRfp: async (id) => {
    try {
      // First, trigger RFP generation
      const response = await productVisionApi.get(`${ENDPOINTS.generateRfp}/${id}`);
      
      // Then download the generated RFP
      const downloadResponse = await productVisionApi.get(
        `${ENDPOINTS.downloadRfp}/${id}`,
        {
          responseType: 'blob', // Important for file download
          headers: {
            'Accept': 'application/pdf'
          }
        }
      );

      return downloadResponse.data;
    } catch (error) {
      console.error('RFP Generation/Download Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to generate/download RFP');
    }
  },

  // Helper method to handle RFP download directly
  downloadRfp: async (id) => {
    try {
      const response = await productVisionApi.get(
        `${ENDPOINTS.downloadRfp}/${id}`,
        {
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf'
          }
        }
      );
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `RFP-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('RFP Download Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to download RFP');
    }
  }
};