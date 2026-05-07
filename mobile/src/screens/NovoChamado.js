import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import { criarChamado } from '../services/chamadoService';
import { Picker } from '@react-native-picker/picker';
import { getClientes } from '../services/clienteService';

export default function NovoChamado({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [buscaCliente, setBuscaCliente] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [prioridade, setPrioridade] = useState('media');

  useEffect(() => {
  async function carregarClientes() {
    try {
      const dados = await getClientes();
      setClientes(dados);
    } catch (error) {
      console.log('Erro ao carregar clientes:', error);
    }
  }

  carregarClientes();
}, []);

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

  async function salvar() {
    if (!descricao.trim()) {
  Alert.alert('Erro', 'Digite uma descrição');
  return;
}

if (!clienteSelecionado) {
  Alert.alert('Erro', 'Selecione um cliente');
  return;
}

    try {
      

     const novoChamado = {
  descricao: descricao.trim(),
  status: 'Aberto',
  cliente_id: clienteSelecionado?.id,
  prioridade,
};

     await criarChamado(novoChamado);
      
      Alert.alert('Sucesso', 'Chamado criado!');
      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Falha ao salvar chamado');
    }
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

      <Text style={{ marginBottom: 5 }}>Prioridade</Text>

      <Picker
        selectedValue={prioridade}
        onValueChange={(itemValue) => setPrioridade(itemValue)}
        style={{ marginBottom: 10 }}
      >
        <Picker.Item label="Baixa" value="baixa" />
        <Picker.Item label="Média" value="media" />
        <Picker.Item label="Alta" value="alta" />
        <Picker.Item label="Crítica" value="critica" />
      </Picker>

      {clienteSelecionado && (
        <Text style={styles.selecionado}>
          Cliente selecionado: {clienteSelecionado.nome}
        </Text>
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

      <Button title="Salvar Chamado" onPress={salvar} />
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
});