import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAMADOS_KEY = '@chamados';
const CLIENTES_KEY = '@clientes';

export async function salvarChamado(novoChamado) {
  try {
    const dados = await AsyncStorage.getItem(CHAMADOS_KEY);
    const chamados = dados ? JSON.parse(dados) : [];

    chamados.push(novoChamado);

    await AsyncStorage.setItem(CHAMADOS_KEY, JSON.stringify(chamados));
  } catch (error) {
    console.log('Erro ao salvar:', error);
    
  }
}

export async function listarChamados() {
  try {
    const dados = await AsyncStorage.getItem(CHAMADOS_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.log('Erro ao listar:', error);
    return [];
  }
}

export async function salvarCliente(novoCliente) {
  try {
    const dados = await AsyncStorage.getItem(CLIENTES_KEY);
    const clientes = dados ? JSON.parse(dados) : [];

    clientes.push(novoCliente);

    await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
  } catch (error) {
    console.log('Erro ao salvar cliente:', error);
  }
}

export async function listarClientes() {
  try {
    const dados = await AsyncStorage.getItem(CLIENTES_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.log('Erro ao listar clientes:', error);
    return [];
  }
}

export async function atualizarCliente(clienteAtualizado) {
  try {
    const dados = await AsyncStorage.getItem(CLIENTES_KEY);
    const clientes = dados ? JSON.parse(dados) : [];

    const index = clientes.findIndex(c => c.id === clienteAtualizado.id);
    if (index !== -1) {
      clientes[index] = clienteAtualizado;
      await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
    }
  } catch (error) {
    console.log('Erro ao atualizar cliente:', error);
  }
}

export async function deletarChamado(id) {
  try {
    const dados = await AsyncStorage.getItem(CHAMADOS_KEY);
    const chamados = dados ? JSON.parse(dados) : [];

    const novosChamados = chamados.filter(c => c.id !== id);
    await AsyncStorage.setItem(CHAMADOS_KEY, JSON.stringify(novosChamados));
  } catch (error) {
    console.log('Erro ao deletar chamado:', error);
  }
}

export async function atualizarChamado(chamadoAtualizado) {
  try {
    const dados = await AsyncStorage.getItem(CHAMADOS_KEY);
    const chamados = dados ? JSON.parse(dados) : [];

    const index = chamados.findIndex(c => c.id === chamadoAtualizado.id);
    if (index !== -1) {
      chamados[index] = chamadoAtualizado;
      await AsyncStorage.setItem(CHAMADOS_KEY, JSON.stringify(chamados));
    }
  } catch (error) {
    console.log('Erro ao atualizar chamado:', error);
  }
}

export async function deletarCliente(id) {
  try {
    const dados = await AsyncStorage.getItem(CLIENTES_KEY);
    const clientes = dados ? JSON.parse(dados) : [];

    const novosClientes = clientes.filter(c => c.id !== id);
    await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(novosClientes));
  } catch (error) {
    console.log('Erro ao deletar cliente:', error);
  }
}

export const SLA_PADRAO = {
  baixa: 72,
  media: 48,
  alta: 24,
  critica: 4
};

export function calcularDataLimite(prioridade) {
  const horas = SLA_PADRAO[prioridade] || 24;

  const data = new Date();
  data.setHours(data.getHours() + horas);

  return data.toISOString();
}

export function isSlaVencido(dataLimite) {
  if (!dataLimite) return false;

  const agora = new Date();
  const limite = new Date(dataLimite);

  return agora > limite;
}

export function getStatusSla(dataLimite) {
  if (!dataLimite) return { texto: 'Sem SLA', cor: 'gray' };

  const agora = new Date();
  const limite = new Date(dataLimite);

  const diffMs = limite - agora;
  const diffHoras = diffMs / (1000 * 60 * 60);

  if (diffHoras < 0) {
    return { texto: 'Vencido', cor: 'red' };
  }

  if (diffHoras <= 6) {
    return { texto: 'Crítico', cor: 'orange' };
  }

  return { texto: 'No prazo', cor: 'green' };
}