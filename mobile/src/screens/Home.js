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

  // Funcao para contar chamados
const totalChamados = chamados.length;

const chamadosAbertos = chamados.filter(
  c => c.status?.toLowerCase() === 'aberto'
).length;

const chamadosFinalizados = chamados.filter(
  c => c.status?.toLowerCase() === 'finalizado'
).length;

const chamadosCriticos = chamados.filter(
  c => c.prioridade?.toLowerCase() === 'critica'
).length;

  return (
  <View style={styles.container}>

    {/* HEADER */}
    <View style={styles.header}>
      <Text style={styles.titulo}>
        DeskControl
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => logout(navigation)}
      >
        <View style={styles.logoutContent}>
          <Icon name="logout" size={20} color="#fff" />

          <Text style={styles.logoutText}>
            Sair
          </Text>
        </View>
      </TouchableOpacity>
    </View>

    {/* DASHBOARD */}
    <View style={styles.dashboard}>

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardNumber}>
          {totalChamados}
        </Text>

        <Text style={styles.dashboardLabel}>
          Total
        </Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardNumber}>
          {chamadosAbertos}
        </Text>

        <Text style={styles.dashboardLabel}>
          Abertos
        </Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardNumber}>
          {chamadosFinalizados}
        </Text>

        <Text style={styles.dashboardLabel}>
          Finalizados
        </Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardNumber}>
          {chamadosCriticos}
        </Text>

        <Text style={styles.dashboardLabel}>
          Críticos
        </Text>
      </View>

    </View>

    {/* LISTA */}
    <FlatList
      data={chamados}
      keyExtractor={(item) => (item.id || item._id).toString()}
      renderItem={({ item }) => (
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
      )}
    />

    {/* BOTÕES FLUTUANTES */}
    <View style={styles.fabContainer}>

      <TouchableOpacity
        style={styles.secondaryFab}
        onPress={() => navigation.navigate('Clientes')}
      >
        <Icon name="groups" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NovoChamado')}
      >
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>

    </View>

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
fabContainer: {
  position: 'absolute',
  right: 20,
  bottom: 20,
  alignItems: 'center',
},

fab: {
  width: 64,
  height: 64,
  borderRadius: 32,

  backgroundColor: COLORS.primary,

  justifyContent: 'center',
  alignItems: 'center',

  elevation: 6,
},

secondaryFab: {
  width: 52,
  height: 52,
  borderRadius: 26,

  backgroundColor: COLORS.primaryDark,

  justifyContent: 'center',
  alignItems: 'center',

  marginBottom: 14,

  elevation: 5,
},

dashboard: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 20,
},

dashboardCard: {
  width: '48%',
  backgroundColor: COLORS.card,

  padding: 18,
  borderRadius: 16,

  marginBottom: 12,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.06,
  shadowRadius: 4,

  elevation: 3,
},

dashboardNumber: {
  fontSize: 28,
  fontWeight: 'bold',
  color: COLORS.primary,
},

dashboardLabel: {
  marginTop: 6,
  color: COLORS.textSecondary,
  fontSize: 14,
},

});