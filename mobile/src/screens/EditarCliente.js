import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function EditarCliente({ navigation, route }) {
  const { cliente } = route.params;
  const [nome, setNome] = useState(cliente.nome);
  const [telefone, setTelefone] = useState(cliente.telefone);
  const [empresa, setEmpresa] = useState(cliente.empresa || '');
  const [endereco, setEndereco] = useState(cliente.endereco || '');

  async function salvar() {
    if (!nome || !telefone || !endereco) {
      Alert.alert('Erro', 'Nome, telefone e endereço são obrigatórios');
      return;
    }

    const clienteAtualizado = {
      ...cliente,
      nome,
      telefone,
      empresa: empresa || null,
      endereco,
    };

    await api.put(`/clientes/${cliente.id}`, clienteAtualizado);

    Alert.alert('Sucesso', 'Cliente atualizado!');
    navigation.goBack();
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

      <Button title="Salvar Alterações" onPress={salvar} />
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