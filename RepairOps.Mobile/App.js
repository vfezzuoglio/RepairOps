import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import RepairQueueScreen from './src/screens/repairs/RepairQueueScreen';
import RepairDetailScreen from './src/screens/repairs/RepairDetailScreen';
import NewIntakeScreen from './src/screens/repairs/NewIntakeScreen';
import NewDeviceScreen from './src/screens/repairs/NewDeviceScreen';
import NewTicketScreen from './src/screens/repairs/NewTicketScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RepairQueue" component={RepairQueueScreen} />
          <Stack.Screen name="RepairDetail" component={RepairDetailScreen} />
          <Stack.Screen name="NewIntake" component={NewIntakeScreen} />
          <Stack.Screen name="NewDevice" component={NewDeviceScreen} />
          <Stack.Screen name="NewTicket" component={NewTicketScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}