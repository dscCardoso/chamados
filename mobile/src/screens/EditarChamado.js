import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function EditarChamado({ navigation, route }) {
  const { chamado } = route.params;
  const [descricao, setDescricao] = useState(chamado.descricao);
  const [status, setStatus] = useState(chamado.status);
  const [buscaCliente, setBuscaCliente] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  useEffect(() => {
    async function carregarClientes() {
      const response = await api.get('/clientes');
  setClientes(response.data);
      // Set initial cliente if exists
      if (chamado.clienteId) {
        const cliente = response.data.find(c => c.id === chamado.clienteId);
        if (cliente) {
          setClienteSelecionado(cliente);
          setBuscaCliente(cliente.nome);
        }
      }
    }
    carregarClientes();
  }, [chamado]);

  useEffect(() => {
    if (buscaCliente) {
      const filtrados = clientes.filter(c =>
        c.nome.toLowerCase().includes(buscaCliente.toLowerCase()) ||
        c.telefone.includes(buscaCliente)
      );
      setClientesFiltrados(filtrados);
    } else {
      setClientesFiltrados([]);
    }
  }, [buscaCliente, clientes]);

  function selecionarCliente(cliente) {
    setClienteSelecionado(cliente);
    setBuscaCliente(cliente.nome);
    setClientesFiltrados([]);
  }

  function alternarStatus() {
    setStatus(status === 'Aberto' ? 'Finalizado' : 'Aberto');
  }

  async function salvar() {
    if (!descricao.trim()) {
      Alert.alert('Erro', 'Digite uma descrição');
      return;
    }

    const chamadoAtualizado = {
      ...chamado,
      descricao: descricao.trim(),
      status,
      clienteId: clienteSelecionado ? clienteSelecionado.id : null,
    };

    await api.put(`/chamados/${chamado.id}`, chamadoAtualizado);

    Alert.alert('Sucesso', 'Chamado atualizado!');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Descreva o problema"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <TextInput
        placeholder="Buscar cliente (nome ou telefone)"
        value={buscaCliente}
        onChangeText={setBuscaCliente}
        style={styles.input}
      />

      {clienteSelecionado && (
        <Text style={styles.selecionado}>Cliente selecionado: {clienteSelecionado.nome}</Text>
      )}

      <FlatList
        data={clientesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selecionarCliente(item)} style={styles.clienteItem}>
            <Text>{item.nome} - {item.telefone}</Text>
          </TouchableOpacity>
        )}
        style={styles.flatList}
      />

      <TouchableOpacity onPress={alternarStatus} style={[styles.statusButton, status === 'Aberto' ? styles.statusAberto : styles.statusFinalizado]}>
        <Text style={styles.statusText}>Status: {status}</Text>
      </TouchableOpacity>

      <Button title="Atualizar Chamado" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  selecionado: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  flatList: {
    maxHeight: 150,
    marginBottom: 10,
  },
  clienteItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 5,
    borderRadius: 5,
  },
  statusButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  statusAberto: {
    backgroundColor: '#ffc107',
  },
  statusFinalizado: {
    backgroundColor: '#28a745',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});