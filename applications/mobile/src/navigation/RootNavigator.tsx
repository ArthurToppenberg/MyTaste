import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './AuthNavigatior';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

import { useAuthContext } from '@mytaste/auth-provider';

const RootNavigator: React.FC = () => {
  const { Authed, setAuthed, isAuthed } = useAuthContext();

  useEffect(() => {
    isAuthed().then((authed: boolean) => {
      setAuthed(authed);
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {Authed ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
