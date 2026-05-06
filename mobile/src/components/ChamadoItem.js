import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const corPrioridade = {
  baixa: 'green',
  media: 'orange',
  alta: 'red',
  critica: 'purple'
};

export default function ChamadoItem({
  titulo,
  status,
  clienteNome,
  clienteEndereco,
  prioridade,
  dataLimite,
  onEdit,
  onDelete
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo || 'Sem descrição'}</Text>

      <Text style={styles.status}>
        {status ? status.toUpperCase() : 'SEM STATUS'}
      </Text>

      {prioridade && (
        <Text style={{ color: corPrioridade[prioridade] || 'black' }}>
          Prioridade: {prioridade}
        </Text>
      )}

      {dataLimite && (
        <Text>
          SLA: {new Date(dataLimite).toLocaleString()}
        </Text>
      )}

      {clienteNome && (
        <Text style={styles.cliente}>Cliente: {clienteNome}</Text>
      )}

      {clienteEndereco && (
        <Text style={styles.endereco}>Endereço: {clienteEndereco}</Text>
      )}

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.buttonEdit} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDelete} onPress={onDelete}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 5,
    color: 'gray',
  },
  cliente: {
    marginTop: 5,
    color: 'blue',
  },
  endereco: {
    marginTop: 5,
    color: 'green',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonEdit: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});