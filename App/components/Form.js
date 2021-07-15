import React from 'react';
import {
  Text, View, TextInput, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    marginBottom: 11,
  },
  label: {
    color: '#4A4A4A',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
  },
  textfield: {
    fontSize: 18,
    fontWeight: '400',
    color: '#828282',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 20,
  },
});

export const TextField = ({ label, ...restProps }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.textfield}
      placeholderTextColor="#828282"
      autoCapitalize="none"
      accessibilityLabel={label}
      {...restProps}
    />
  </View>
);

export const ErrorText = ({ text = '', ...restProps }) => (
  <Text style={styles.errorText} {...restProps}>
    {text}
  </Text>
);