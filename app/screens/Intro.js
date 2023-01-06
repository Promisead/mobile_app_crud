import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions } from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';

const Intro = ({ onFinish }) => {
  const [name, setName] = useState('');
  const handleOnChangeText = (text) => {
    setName(text);
  };
  console.log(name);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Enter Your Name to Proceed</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Name"
          style={styles.textInput}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn anticonName={'arrowright'} onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.Primary,
    color: colors.PRIMARY,
    width,
    height: 50,
    boederRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 25,
  },
  inputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 0.5,
  },
});

export default Intro;
