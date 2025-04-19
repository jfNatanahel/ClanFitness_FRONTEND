import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Asistencia {
  id: number;
  fecha_asistencia: string;
}

export default function AsistenciasScreen({ route }: { route: any }) {
  const { clienteId } = route.params;
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);

  useEffect(() => {
    axios.get(`https://flaskrestapi-testing.onrender.com/asistencias/${clienteId}`)
      .then(response => {
        setAsistencias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener asistencias:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Asistencias del Cliente {clienteId}</Text>
      <FlatList
        data={asistencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
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
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: '#ccc',
  },
});
