import api from './api';

export const getChamados = async () => {
  const response = await api.get('/chamados');
  return response.data;
};

export const criarChamado = async (dados) => {
  const response = await api.post('/chamados', dados);
  return response.data;
};

export const atualizarChamado = async (id, dados) => {
  const response = await api.put(`/chamados/${id}`, dados);
  return response.data;
};

export const deletarChamado = async (id) => {
  const response = await api.delete(`/chamados/${id}`);
  return response.data;
};