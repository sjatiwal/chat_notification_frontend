import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// importing screen for navigation
import AllUser from '../screens/AllUser';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllUser"
        component={AllUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;
