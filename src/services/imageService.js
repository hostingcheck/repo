import { innoventApi } from '../utils/api';

export const imageService = {
  generateImages: async (description, domain) => {
    try {
      // Add domain to the description for better context
      const enhancedDescription = `${domain} project: ${description}`;
      
      const response = await innoventApi.post('/imagen', {
        description: enhancedDescription,
        domain: domain,
        n_samples: 2 // Generate 2 images for better variety
      });

      // Ensure we have valid image URLs
      if (!response.data || !response.data.images || !response.data.images.length) {
        throw new Error('No images received from the server');
      }

      return {
        images: response.data.images,
        message: response.data.message || 'Images generated successfully'
      };
    } catch (error) {
      console.error('Image generation error:', error);
      throw new Error(error.response?.data?.message || 'Failed to generate images');
    }
  },

  // Helper function to validate image URLs
  validateImageUrl: async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Helper function to download image
  downloadImage: async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const urlObject = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlObject;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      throw new Error('Failed to download image');
    }
  }
};