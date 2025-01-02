export const authService = {
  login: async (username, password) => {
    // Hardcoded credentials check
    if (username === 'lakshya' && password === 'qwerty') {
      return Promise.resolve({
        user: {
          name: username,
          id: '123',
          isLoggedIn: true
        }
      });
    } else {
      return Promise.reject(new Error('Invalid credentials'));
    }
  },

  logout: async () => {
    return Promise.resolve();
  }
};