const mockAuthService = {
  login: async ({ email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-token-123',
          user: {
            id: 1,
            name: 'Test Kullanıcı',
            email: email
          }
        });
      }, 1000);
    });
  },
  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: userData
        });
      }, 1000);
    });
  }
};

export default mockAuthService;