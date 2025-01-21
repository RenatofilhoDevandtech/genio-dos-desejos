import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite
export default defineConfig(({ mode }) => {
  // Carregar variáveis de ambiente com base no modo atual
  const env = loadEnv(mode, process.cwd());

  // Verificar se a chave da API do Cohere está definida
  if (!env.VITE_COHERE_API_KEY) {
    console.error('A chave da API do Cohere não está definida. Verifique o arquivo .env.');
    throw new Error('A chave da API do Cohere não está definida. Verifique o arquivo .env.');
  }

  return {
    // Plugins do Vite
    plugins: [react()],
  };
});