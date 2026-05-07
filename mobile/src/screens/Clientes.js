import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ClienteItem from '../components/ClienteItem';
import { getClientes } from '../services/clienteService';
import { deletarCliente } from '../services/clienteService';

export default function Clientes({ navigation }) {
  const [clientes, setClientes] = useState([]);

  async function carregarClientes() {
const dados = await getClientes();
setClientes(dados);
}

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarClientes();
    });

    return unsubscribe;
  }, [navigation]);

  async function handleDelete(id) {
    Alert.alert(
      'Confirmar',
      'Deseja deletar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
  text: 'Deletar',
  onPress: async () => {

    try {

      await deletarCliente(id);

      Alert.alert(
        'Sucesso',
        'Cliente deletado com sucesso'
      );

      carregarClientes();

    } catch (error) {

      Alert.alert(
        'Erro',
        error.response?.data?.error ||
        'Erro ao deletar cliente'
      );

    }

  }
},
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Clientes</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClienteItem
            nome={item.nome}
            telefone={item.telefone}
            empresa={item.empresa}
            endereco={item.endereco}
            onEdit={() => navigation.navigate('EditarCliente', { cliente: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('NovoCliente')}
      >
        <Text style={styles.botaoTexto}>+ Novo Cliente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f2f2f2',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  botaoEditar: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  botaoDeletar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  botaoTextoPequeno: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});