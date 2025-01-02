import { innoventApi } from '../utils/api';

export const websiteService = {
  generateWebsite: async (description) => {
    const response = await innoventApi.post('/generate', {
      description
    });
    
    return response.data;
  },

  downloadWebsite: async () => {
    const response = await innoventApi.get('/download-zip', {
      responseType: 'blob'
    });
    
    return response.data;
  }
};