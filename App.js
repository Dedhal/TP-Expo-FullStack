import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Scanner from './components/Scanner'
import Liste from './components/Liste'
import MainMenu from './components/MainMenu';
import RendezVous from './components/RendezVous';

export default function App() {
    const Stack = createNativeStackNavigator();
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Menu' component={MainMenu} />
                <Stack.Screen name='Scanner' component={Scanner} />
                <Stack.Screen name='Liste' component={Liste} />
                <Stack.Screen name='RendezVous' component={RendezVous} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
