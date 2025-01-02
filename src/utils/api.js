import axios from 'axios';

const BASE_URLS = {
  productVision: 'https://product-vision-api.onrender.com/api',
  geofencing: 'https://geofencingendpts.onrender.com',
  innovent: 'https://innovent-endpts.onrender.com'
};

// Create axios instances for different APIs
export const productVisionApi = axios.create({
  baseURL: BASE_URLS.productVision,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const geofencingApi = axios.create({
  baseURL: BASE_URLS.geofencing,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const innoventApi = axios.create({
  baseURL: BASE_URLS.innovent,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Common API endpoints
export const ENDPOINTS = {
  userInput: '/user-input',
  generateDocument: '/generate-document',
  ideasNearby: '/ideas-nearby',
  imagen: '/imagen',
  // RFP specific endpoint
  generateRfp: '/generate-rfp',
  downloadRfp: '/api/generate-rfp' // Full endpoint for RFP download
};