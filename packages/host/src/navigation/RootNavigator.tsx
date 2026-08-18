import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingState } from 'ui-kit';
import type { TRootStackParamList } from './types';

const ClientCardScreen = React.lazy(() =>
  // @ts-expect-error — Module Federation remote, no generated types (dts: false in rspack.config.mjs)
  import('microFront/ClientCardScreen').then((m) => ({ default: m.ClientCardScreen })),
);
const EmployeeProfileScreen = React.lazy(() =>
  // @ts-expect-error — Module Federation remote, no generated types (dts: false in rspack.config.mjs)
  import('microFront/EmployeeProfileScreen').then((m) => ({
    default: m.EmployeeProfileScreen,
  })),
);

const Stack = createNativeStackNavigator<TRootStackParamList>();

const withRemoteSuspense = <P extends object>(Component: React.ComponentType<P>) => {
  const SuspendedRemoteScreen = (props: P) => {
    return (
      <React.Suspense fallback={<LoadingState label="Загружаем экран..." />}>
        <Component {...props} />
      </React.Suspense>
    );
  };

  return SuspendedRemoteScreen;
};

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientCard"
      screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}
    >
      <Stack.Screen
        name="ClientCard"
        component={withRemoteSuspense(ClientCardScreen)}
        options={{ title: 'Клиент' }}
      />
      <Stack.Screen
        name="EmployeeProfile"
        component={withRemoteSuspense(EmployeeProfileScreen)}
        options={{ title: 'Профиль сотрудника' }}
      />
    </Stack.Navigator>
  );
};
