import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { criarCliente } from '../services/clienteService';

export default function NovoCliente({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [endereco, setEndereco] = useState('');

  async function salvar() {
  if (!nome.trim() || !telefone.trim() || !endereco.trim()) {
    Alert.alert('Erro', 'Nome, telefone e endereço são obrigatórios');
    return;
  }

  const novoCliente = {
    nome: nome.trim(),
    telefone: telefone.trim(),
    empresa: empresa?.trim() || null,
    endereco: endereco.trim(),
  };

  try {
    const response = await criarCliente(novoCliente);

    console.log('Cliente salvo:', response);

    Alert.alert('Sucesso', 'Cliente cadastrado!');
    navigation.goBack();

  } catch (error) {
    console.log('ERRO AO SALVAR:', error.response?.data || error.message);
    Alert.alert('Erro', 'Falha ao salvar cliente');
  }
}

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do cliente"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Empresa (opcional)"
        value={empresa}
        onChangeText={setEmpresa}
        style={styles.input}
      />

      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />

      <Button title="Salvar Cliente" onPress={salvar} />
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
});