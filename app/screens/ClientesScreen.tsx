import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ClientesScreen({ navigation }: { navigation: any }) {
  interface Cliente {
    id: number;
    nombre: string;
    telefono: string;
    fecha_inicio: string;
    tipo_plan: string;
  }

  const [clientes, setClientes] = React.useState<Cliente[]>([]);

  React.useEffect(() => {
    axios.get('http://localhost:5000/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener clientes:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lista de clientes</Text>
      <Button
        title="Agregar Cliente"
        onPress={() => navigation.navigate('AddClient')}
      />
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text>📞 {item.telefono}</Text>
            <Text>📅 {item.fecha_inicio}</Text>
            <Text>📦 Plan: {item.tipo_plan}</Text>
            <Button
              title="Editar"
              onPress={() => navigation.navigate('EditClient', { clientId: item.id })}
            />
            <Button
              title="Eliminar"
              onPress={() => handleDeleteClient(item.id)}
            />
          </View>
        )}
      />
    </View>
  );

  function handleDeleteClient(id: number) {
    axios
      .delete(`http://localhost:5000/clientes/${id}`)
      .then(() => {
        alert('Cliente eliminado');
        setClientes(clientes.filter(client => client.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar cliente:', error);
      });
  }
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
