// app/screens/AddAsistenciaScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddAsistenciaScreen({ navigation }: { navigation: any }) {
  const [clienteId, setClienteId] = useState('');
  const [fechaAsistencia, setFechaAsistencia] = useState('');

  const handleAddAsistencia = () => {
    axios.post('http://localhost:5000/asistencias', {
      cliente_id: Number(clienteId),
      fecha_asistencia: fechaAsistencia
    })
    .then(() => {
      Alert.alert('✅ Asistencia agregada correctamente');
      navigation.goBack();
    })
    .catch((error) => {
      console.error('❌ Error al agregar asistencia:', error);
      Alert.alert('Error', 'No se pudo agregar la asistencia');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Agregar Asistencia</Text>
      <TextInput
        placeholder="ID del Cliente"
        value={clienteId}
        onChangeText={setClienteId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={fechaAsistencia}
        onChangeText={setFechaAsistencia}
        style={styles.input}
      />
      <Button title="Agregar" onPress={handleAddAsistencia} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  }
});
