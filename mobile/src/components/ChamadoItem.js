import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

const corPrioridade = {
  baixa: COLORS.success,
  media: COLORS.warning,
  alta: COLORS.danger,
  critica: '#7c3aed',
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
    <View
  style={[
    styles.card,
    {
      borderLeftColor: corPrioridade[prioridade] || COLORS.primary,
    },
  ]}
>
      <Text style={styles.titulo}>{titulo || 'Sem descrição'}</Text>

      <View style={styles.statusContainer}>
  <Text style={styles.status}>
    {status ? status.toUpperCase() : 'SEM STATUS'}
  </Text>
</View>

      {prioridade && (
        <Text
  style={{
    color: corPrioridade[prioridade] || COLORS.text,
    fontWeight: 'bold',
    marginTop: 5,
  }}
>
  Prioridade: {prioridade?.toUpperCase()}
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
    backgroundColor: COLORS.card,
    padding: 16,
    marginBottom: 14,
    borderRadius: 14,

    borderLeftWidth: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  statusContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },

  status: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },

  cliente: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  endereco: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  buttonEdit: {
    backgroundColor: COLORS.success,
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },

  buttonDelete: {
    backgroundColor: COLORS.danger,
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});