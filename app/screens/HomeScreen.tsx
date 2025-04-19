// app/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Button
        title="Ver Clientes"
        onPress={() => navigation.navigate('Clientes')}
      />
      <Button
        title="Agregar Cliente"
        onPress={() => navigation.navigate('AddClient')}
      />
      <Button
        title="Ver Asistencias"
        onPress={() => navigation.navigate('Asistencias')}
      />
      <Button
        title="Agregar Asistencia"
        onPress={() => navigation.navigate('AddAsistencia')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
