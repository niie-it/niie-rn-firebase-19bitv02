import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { useState } from 'react';
import { Navigator } from './constants';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name={Navigator.home} component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name={Navigator.register} component={RegisterScreen} />
            <Stack.Screen name={Navigator.login} component={LoginScreen} />

          </>
        )}
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
