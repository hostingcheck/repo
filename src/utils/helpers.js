// File download helper
export const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  
  // Format duration string
  export const formatDuration = (duration) => {
    if (!duration) return '';
    return duration.toLowerCase().includes('day') 
      ? duration 
      : `${duration} days`;
  };
  
  // Format file size
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Validate email
  export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Parse domain-specific image path
  export const getDomainImagePath = (domain) => {
    const cleanDomain = domain.toLowerCase().replace(/\s+/g, '-');
    return `/assets/images/${cleanDomain}.png`;
  };