import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClientCardScreen } from './src/screens/ClientCardScreen';
import { EmployeeProfileScreen } from './src/screens/EmployeeProfileScreen';

type TStandaloneParamList = {
  ClientCard: undefined;
  EmployeeProfile: { employeeId?: string } | undefined;
};

const Stack = createNativeStackNavigator<TStandaloneParamList>();

export const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ClientCard"
          screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}
        >
          <Stack.Screen
            name="ClientCard"
            component={ClientCardScreen}
            options={{ title: 'Клиент' }}
          />
          <Stack.Screen
            name="EmployeeProfile"
            component={EmployeeProfileScreen}
            options={{ title: 'Профиль сотрудника' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
