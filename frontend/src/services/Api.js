import axios from 'axios';

// Cria uma instância do axios configurada com a URL base da sua API
const api = axios.create({
  // Supondo que você tenha um arquivo .env.local com esta variável
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
});

export default api;