// Validações de autenticação
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Mínimo 6 caracteres
  return password.length >= 6;
};

// Simulação de API de login
export const simulateLogin = (email: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Usuários válidos para teste
      const validUsers = [
        { email: 'user@example.com', password: '123456' },
        { email: 'admin@teste.com', password: 'senha123' },
        { email: 'teste@teste.com', password: 'teste123' }
      ];
      
      const user = validUsers.find(u => u.email === email && u.password === password);
      resolve(!!user);
    }, 1500);
  });
};