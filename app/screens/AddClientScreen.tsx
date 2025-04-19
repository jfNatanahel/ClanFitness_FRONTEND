import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AddClientScreen({ navigation }: { navigation: any }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoPlan, setTipoPlan] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');

  const handleAddClient = () => {
    const newClient = {
      nombre,
      telefono,
      tipo_plan: tipoPlan,
      fecha_inicio: fechaInicio,
    };

    axios
      .post('http://localhost:5000/clientes', newClient)
      .then(response => {
        alert('Cliente agregado exitosamente');
        navigation.goBack(); // Regresar a la pantalla de clientes
      })
      .catch(error => {
        console.error('Error al agregar cliente:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de plan"
        value={tipoPlan}
        onChangeText={setTipoPlan}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio (YYYY-MM-DD)"
        value={fechaInicio}
        onChangeText={setFechaInicio}
      />
      <Button title="Agregar Cliente" onPress={handleAddClient} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
