import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Intro from './app/screens/Intro';
import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';
//import NoteProvider from './app/context/NoteProvider';
import NoteProvider from './app/contexts/NoteProvider';

const Stack = createNativeStackNavigator();

//const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [firstTimeLoading, setIsFirstTimeLoading] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsFirstTimeLoading(true);
    setUser(JSON.parse(result));
    setIsFirstTimeLoading(false);
  };
  useEffect(() => {
    findUser();
  }, []);
  const renderNoteScreen = (props) => <NoteScreen {...props} user={user} />;
  if (firstTimeLoading) return <Intro onFinish={findUser} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen name="NoteScreen">{renderNoteScreen}</Stack.Screen>
          <Stack.Screen component={NoteDetail} name="NoteDetail" />
        </Stack.Navigator>
      </NoteProvider>
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
