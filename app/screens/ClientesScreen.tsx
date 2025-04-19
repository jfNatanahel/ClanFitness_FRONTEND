import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function ClientesScreen({ navigation }: { navigation: any }) {
  interface Cliente {
    id: number;
    nombre: string;
    telefono: string;
    fecha_inicio: string;
    tipo_plan: string;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      axios.get('https://flaskrestapi-testing.onrender.com/clientes')
        .then(response => {
          setClientes(response.data);
        })
        .catch(error => {
          console.error('Error al obtener clientes:', error);
        });
    }, [])
  );

  function handleDeleteClient(id: number) {
    axios
      .delete(`https://flaskrestapi-testing.onrender.com/clientes/${id}`)
      .then(() => {
        alert('Cliente eliminado');
        setClientes(clientes.filter(client => client.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar cliente:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      <Button
        title={mostrarLista ? "Ocultar clientes" : "Ver clientes"}
        onPress={() => setMostrarLista(!mostrarLista)}
      />

      <View style={styles.spacing} />

      <Button
        title="Agregar Cliente"
        onPress={() => navigation.navigate('AddClient')}
        color="#28a745"
      />

      {mostrarLista && (
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text>📞 {item.telefono}</Text>
              <Text>📅 {item.fecha_inicio}</Text>
              <Text>📦 Plan: {item.tipo_plan}</Text>

              <View style={styles.buttonGroup}>
                <Button
                  title="Editar"
                  onPress={() => navigation.navigate('EditClient', { clientId: item.id })}
                  color="#007bff"
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteClient(item.id)}
                  color="#dc3545"
                />
              </View>

              <View style={styles.buttonGroup}>
                <Button
                  title="Ver Asistencias"
                  onPress={() => navigation.navigate('Asistencias', { clienteId: item.id })}
                  color="#17a2b8"
                />
                <Button
                  title="Agregar Asistencia"
                  onPress={() => navigation.navigate('AddAsistencia', { clienteId: item.id })}
                  color="#6f42c1"
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  spacing: {
    marginVertical: 10,
  },
  item: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
