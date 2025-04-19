import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function EditClientScreen({ route, navigation }: { route: any, navigation: any }) {
  const { clientId } = route.params; // Obtener el id del cliente desde los parámetros
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    tipo_plan: '',
    fecha_inicio: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clientes/${clientId}`)
      .then(response => {
        setCliente(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el cliente:', error);
      });
  }, [clientId]);

  const handleEditClient = () => {
    axios
      .put(`http://localhost:5000/clientes/${clientId}`, cliente)
      .then(response => {
        alert('Cliente actualizado exitosamente');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error al actualizar cliente:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>
      <TextInput
        style={styles.input}
        value={cliente.nombre}
        onChangeText={text => setCliente({ ...cliente, nombre: text })}
      />
      <TextInput
        style={styles.input}
        value={cliente.telefono}
        onChangeText={text => setCliente({ ...cliente, telefono: text })}
      />
      <TextInput
        style={styles.input}
        value={cliente.tipo_plan}
        onChangeText={text => setCliente({ ...cliente, tipo_plan: text })}
      />
      <TextInput
        style={styles.input}
        value={cliente.fecha_inicio}
        onChangeText={text => setCliente({ ...cliente, fecha_inicio: text })}
      />
      <Button title="Actualizar Cliente" onPress={handleEditClient} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
