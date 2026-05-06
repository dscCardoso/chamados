import api from './api';

export const getChamados = async () => {
  const response = await api.get('/chamados');
  return response.data;
};

export const criarChamado = async (dados) => {
  const response = await api.post('/chamados', dados);
  return response.data;
};