import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2ea2ef',
    paddingVertical: 10,
    paddingHorizontal: 45,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonLoading: {
    backgroundColor: '#2ea2ef80',
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
  },
});

export const Button = ({
  text, onPress, disabled = false, style = {},
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, disabled && styles.buttonLoading, style]}
    disabled={disabled}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);
