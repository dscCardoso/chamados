import api from './api';

export const getClientes = async () => {
  const response = await api.get('/clientes');
  return response.data;
};

export const criarCliente = async (dados) => {
  const response = await api.post('/clientes', dados);
  return response.data;
};

export const atualizarCliente = async (id, dados) => {
  const response = await api.put(`/clientes/${id}`, dados);
  return response.data;
};

export const deletarCliente = async (id) => {
  const response = await api.delete(`/clientes/${id}`);
  return response.data;
};