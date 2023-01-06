import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../misc/colors';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search Note Title..."
        style={styles.SearchBar}
      />
      {value ? (
        <AntDesign
          name="close"
          onPress={onClear}
          size={20}
          color={colors.PRIMARY}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  SearchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default SearchBar;
