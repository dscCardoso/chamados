import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ClienteItem({ nome, telefone, empresa, endereco, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.telefone}>{telefone}</Text>
      {empresa && <Text style={styles.empresa}>{empresa}</Text>}
      {endereco && <Text style={styles.endereco}>{endereco}</Text>}

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
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  telefone: {
    marginTop: 5,
    color: 'gray',
  },
  empresa: {
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