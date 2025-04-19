import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Asistencia {
  id: number;
  cliente_id: number;
  fecha_asistencia: string;
}

export default function AsistenciasScreen() {
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/asistencias')
      .then(response => {
        setAsistencias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener asistencias:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Lista de asistencias</Text>
      <FlatList
        data={asistencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>ID Asistencia: {item.id}</Text>
            <Text>🧍 Cliente ID: {item.cliente_id}</Text>
            <Text>🗓️ Fecha: {item.fecha_asistencia}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
