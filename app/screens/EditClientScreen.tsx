import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function EditClientScreen({ route, navigation }: { route: any; navigation: any }) {
  const { clientId } = route.params; // Obtener el ID del cliente
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    fecha_inicio: '',
    tipo_plan: ''
  });

  useEffect(() => {
    // Obtener la información del cliente
    axios.get(`http://localhost:5000/clientes/${clientId}`)
      .then(response => {
        setCliente(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el cliente:', error);
      });
  }, [clientId]);

  const handleUpdateClient = () => {
    // Realizar la actualización
    axios.put(`http://localhost:5000/clientes/${clientId}`, cliente)
      .then(() => {
        alert('Cliente actualizado');
        navigation.goBack(); // Volver a la pantalla de clientes
      })
      .catch(error => {
        console.error('Error al actualizar el cliente:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={cliente.nombre}
        onChangeText={(text) => setCliente({ ...cliente, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={cliente.telefono}
        onChangeText={(text) => setCliente({ ...cliente, telefono: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Inicio (yyyy-mm-dd)"
        value={cliente.fecha_inicio}
        onChangeText={(text) => setCliente({ ...cliente, fecha_inicio: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de Plan"
        value={cliente.tipo_plan}
        onChangeText={(text) => setCliente({ ...cliente, tipo_plan: text })}
      />
      <Button title="Actualizar Cliente" onPress={handleUpdateClient} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
