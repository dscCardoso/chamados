import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ChamadoItem from '../components/ChamadoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getChamados, deletarChamado } from '../services/chamadoService';
import { getClientes } from '../services/clienteService';
import { COLORS } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Função de logout
const logout = async (navigation) => {
  await AsyncStorage.removeItem('token');
  navigation.replace('Auth');
};

// Função para ordenar chamados por data limite
function ordenarPorPrazo(chamados) {
  return chamados.sort((a, b) => {
    const dataA = a.dataLimite ? new Date(a.dataLimite).getTime() : Infinity;
    const dataB = b.dataLimite ? new Date(b.dataLimite).getTime() : Infinity;
    return dataA - dataB;
  });
}

export default function Home({ navigation }) {
  const [chamados, setChamados] = useState([]);
  const [clientes, setClientes] = useState([]);



  // Carrega dados da API
  async function carregarDados() {
  try {
    const chamadosData = await getChamados();
    const clientesData = await getClientes();

    console.log("CHAMADOS:", chamadosData);

    const chamadosOrdenados = ordenarPorPrazo(chamadosData);

    setChamados(chamadosOrdenados);
    setClientes(clientesData);
  } catch (error) {
    console.log('Erro ao buscar dados:', error);
  }
}

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarDados();
    });
    return unsubscribe;
  }, [navigation]);

  // Funções auxiliares para pegar dados do cliente
  function getClienteNome(clienteId) {
  const cliente = clientes.find(c => c.id === clienteId);
  return cliente ? cliente.nome : 'Sem cliente';
}

  function getClienteEndereco(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.endereco : null;
  }

  // Deletar chamado
  async function handleDeleteChamado(id) {
     console.log("ID PARA DELETAR:", id);
    Alert.alert(
      'Confirmar',
      'Deseja deletar este chamado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', onPress: async () => {
          await deletarChamado(id);
            carregarDados(); // Recarrega a lista
          } 
        },
      ]
    );
  }

  return (
  <View style={styles.container}>
<View style={styles.header}>
      <Text style={styles.titulo}>
        DeskControl
      </Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => logout(navigation)}
      >
        <View style={styles.logoutContent}>
  <Icon name="logout" size={18} color="#fff" />

  <Text style={styles.logoutText}>
    Sair
  </Text>
</View>
      </TouchableOpacity>
    </View>
    <FlatList
      data={chamados}
      keyExtractor={(item) => (item.id || item._id).toString()}
      renderItem={({ item }) => {
        console.log('ITEM:', item);
        return (
          <ChamadoItem
            titulo={item.descricao}
            status={item.status}
            clienteNome={getClienteNome(item.cliente_id)}
            clienteEndereco={getClienteEndereco(item.cliente_id)}
            prioridade={item.prioridade}
            dataLimite={item.dataLimite}
            onEdit={() =>
              navigation.navigate('EditarChamado', { chamado: item })
            }
            onDelete={() => handleDeleteChamado(item.id)}
          />
        );
      }}
    />
    <TouchableOpacity
      style={styles.botao}
      onPress={() => navigation.navigate('NovoChamado')}
    >
      <View style={styles.buttonContent}>
  <Icon name="add-circle-outline" size={20} color="#fff" />

  <Text style={styles.botaoTexto}>
    Novo Chamado
  </Text>
</View>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.botao}
      onPress={() => navigation.navigate('Clientes')}
    >
      <View style={styles.buttonContent}>
  <Icon name="groups" size={20} color="#fff" />

  <Text style={styles.botaoTexto}>
    Clientes
  </Text>
</View>
    </TouchableOpacity>

  </View>
);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.background,  },
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  botao: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

logoutContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},
});