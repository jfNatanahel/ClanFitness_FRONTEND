import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientesScreen from './app/screens/ClientesScreen';
import AddClientScreen from './app/screens/AddClientScreen';
import EditClientScreen from './app/screens/EditClientScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Clientes">
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="AddClient" component={AddClientScreen} />
        <Stack.Screen name="EditClient" component={EditClientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
