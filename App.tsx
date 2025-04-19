import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientesScreen from './app/screens/ClientesScreen';
import AddClientScreen from './app/screens/AddClientScreen';
import EditClientScreen from './app/screens/EditClientScreen';
import AsistenciasScreen from './app/screens/AsistenciasScreen';
import AddAsistenciaScreen from './app/screens/AddAsistenciaScreen';
import HomeScreen from './app/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Clientes">
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="AddClient" component={AddClientScreen} />
        <Stack.Screen name="EditClient" component={EditClientScreen} />
        <Stack.Screen name="Asistencias" component={AsistenciasScreen} />
        <Stack.Screen name="AddAsistencia" component={AddAsistenciaScreen} />
        
        <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
